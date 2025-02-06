
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Edit2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Note {
  id: string;
  title: string;
  content: string;
  reminderTime: string;
}

const noteSchema = z.object({
  title: z.string()
    .min(1, "Tiêu đề không được để trống")
    .max(100, "Tiêu đề không được quá 100 ký tự"),
  content: z.string()
    .min(1, "Nội dung không được để trống")
    .max(300, "Nội dung không được quá 300 ký tự"),
  reminderTime: z.string().min(1, "Thời gian nhắc nhở không được để trống"),
});

type NoteFormData = z.infer<typeof noteSchema>;

export const NoteSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const form = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
      reminderTime: "",
    },
  });

  const onSubmit = (data: NoteFormData) => {
    if (editingNote) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, ...data }
          : note
      ));
      toast.success("Đã cập nhật ghi chú");
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: data.title,
        content: data.content,
        reminderTime: data.reminderTime,
      };
      setNotes([newNote, ...notes].slice(0, 3));
      toast.success("Đã thêm ghi chú mới");
    }
    setIsDialogOpen(false);
    form.reset();
    setEditingNote(null);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    form.reset({
      title: note.title,
      content: note.content,
      reminderTime: note.reminderTime,
    });
    setIsDialogOpen(true);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success("Đã xóa ghi chú");
  };

  return (
    <Card className="bg-[#1A1F2C]/50 border-[#2A2F3C] p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Ghi chú</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 transition-colors duration-200">
              + Thêm ghi chú
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingNote ? "Chỉnh sửa ghi chú" : "Thêm ghi chú mới"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tiêu đề..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Nhập nội dung..." 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reminderTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian nhắc nhở</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsDialogOpen(false);
                      form.reset();
                      setEditingNote(null);
                    }}
                  >
                    Hủy
                  </Button>
                  <Button type="submit">
                    {editingNote ? "Cập nhật" : "Thêm"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          Chưa có ghi chú nào
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id} className="p-3 bg-card/50">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <h3 className="font-medium truncate pr-4">{note.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {note.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Nhắc nhở: {note.reminderTime}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEdit(note)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn có chắc chắn muốn xóa ghi chú này? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteNote(note.id)}>
                          Xác nhận
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};
