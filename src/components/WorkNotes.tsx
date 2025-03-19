
import React, { useState } from 'react';
import { WorkNote } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface WorkNotesProps {
  notes: WorkNote[];
  onAddNote: (note: Omit<WorkNote, 'id'>) => void;
  onEditNote: (note: WorkNote) => void;
  onDeleteNote: (id: string) => void;
}

// Schema for form validation
const noteSchema = z.object({
  title: z.string()
    .min(1, { message: "Tiêu đề không được để trống" })
    .max(100, { message: "Tiêu đề không được quá 100 ký tự" }),
  content: z.string()
    .min(1, { message: "Nội dung không được để trống" })
    .max(300, { message: "Nội dung không được quá 300 ký tự" }),
  reminderTime: z.string().min(1, { message: "Thời gian nhắc nhở không được để trống" }),
  weekDays: z.array(z.number()).optional(),
  important: z.boolean().default(false),
});

type NoteFormValues = z.infer<typeof noteSchema>;

export const WorkNotes: React.FC<WorkNotesProps> = ({
  notes,
  onAddNote,
  onEditNote,
  onDeleteNote,
}) => {
  const { currentLanguage, t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<WorkNote | null>(null);
  
  // Initialize form with react-hook-form
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
      reminderTime: "",
      weekDays: [],
      important: false,
    },
  });
  
  // Weekday options
  const weekDays = currentLanguage === 'vi' 
    ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] 
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const handleOpenDialog = (note?: WorkNote) => {
    if (note) {
      setEditingNote(note);
      form.reset({
        title: note.title,
        content: note.content,
        reminderTime: note.reminderTime instanceof Date 
          ? note.reminderTime.toISOString().slice(0, 16) 
          : typeof note.reminderTime === 'string' ? note.reminderTime : '',
        weekDays: note.weekDays || [],
        important: note.important,
      });
    } else {
      setEditingNote(null);
      form.reset({
        title: "",
        content: "",
        reminderTime: "",
        weekDays: [],
        important: false,
      });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = (data: NoteFormValues) => {
    if (editingNote) {
      onEditNote({
        ...editingNote,
        ...data,
        reminderTime: new Date(data.reminderTime),
      });
      toast.success(currentLanguage === 'vi' ? "Đã cập nhật ghi chú" : "Note updated");
    } else {
      onAddNote({
        ...data,
        reminderTime: new Date(data.reminderTime),
        date: new Date(),
      });
      toast.success(currentLanguage === 'vi' ? "Đã thêm ghi chú mới" : "New note added");
    }
    setIsDialogOpen(false);
  };

  // Sort notes by reminder time, most recent first
  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = a.reminderTime instanceof Date ? a.reminderTime : new Date(a.reminderTime);
    const dateB = b.reminderTime instanceof Date ? b.reminderTime : new Date(b.reminderTime);
    return dateA.getTime() - dateB.getTime();
  }).slice(0, 3); // Show only the 3 most recent notes

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {currentLanguage === 'vi' ? 'Ghi Chú Công Việc' : 'Work Notes'}
        </h2>
        <Button 
          onClick={() => handleOpenDialog()}
          className="flex items-center gap-2"
        >
          <span>+</span>
          <span className="text-sm">
            {currentLanguage === 'vi' ? 'Thêm Ghi Chú' : 'Add Note'}
          </span>
        </Button>
      </div>

      {sortedNotes.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {currentLanguage === 'vi' ? 'Chưa có ghi chú nào' : 'No notes yet'}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedNotes.map((note) => (
            <Card key={note.id} className="p-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <h3 className="font-medium truncate pr-4">{note.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {note.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentLanguage === 'vi' ? 'Nhắc nhở: ' : 'Reminder: '}
                    {note.reminderTime instanceof Date 
                      ? note.reminderTime.toLocaleString()
                      : new Date(note.reminderTime).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleOpenDialog(note)}
                  >
                    <Pen className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {currentLanguage === 'vi' ? 'Xác nhận xóa' : 'Confirm Deletion'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {currentLanguage === 'vi' 
                            ? 'Bạn có chắc chắn muốn xóa ghi chú này? Hành động này không thể hoàn tác.'
                            : 'Are you sure you want to delete this note? This action cannot be undone.'}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          {currentLanguage === 'vi' ? 'Hủy' : 'Cancel'}
                        </AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => {
                            onDeleteNote(note.id);
                            toast.success(currentLanguage === 'vi' ? "Đã xóa ghi chú" : "Note deleted");
                          }}
                        >
                          {currentLanguage === 'vi' ? 'Xác nhận' : 'Confirm'}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingNote 
                ? currentLanguage === 'vi' ? 'Sửa Ghi Chú' : 'Edit Note'
                : currentLanguage === 'vi' ? 'Thêm Ghi Chú Mới' : 'Add New Note'
              }
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {currentLanguage === 'vi' ? 'Tiêu đề' : 'Title'} 
                      <span className="text-xs ml-2 text-muted-foreground">
                        ({field.value.length}/100)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={currentLanguage === 'vi' ? 'Nhập tiêu đề...' : 'Enter title...'}
                        maxLength={100}
                        {...field}
                      />
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
                    <FormLabel>
                      {currentLanguage === 'vi' ? 'Nội dung' : 'Content'}
                      <span className="text-xs ml-2 text-muted-foreground">
                        ({field.value.length}/300)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={currentLanguage === 'vi' ? 'Nhập nội dung...' : 'Enter content...'}
                        className="min-h-[100px]"
                        maxLength={300}
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
                    <FormLabel>
                      {currentLanguage === 'vi' ? 'Thời gian nhắc nhở' : 'Reminder Time'}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <Label>
                  {currentLanguage === 'vi' ? 'Ngày trong tuần' : 'Weekdays'}
                </Label>
                <div className="flex flex-wrap gap-3">
                  {weekDays.map((day, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <Checkbox 
                        id={`weekday-${index}`}
                        checked={(form.watch('weekDays') || []).includes(index + 1)}
                        onCheckedChange={(checked) => {
                          const currentWeekDays = form.watch('weekDays') || [];
                          if (checked) {
                            form.setValue('weekDays', [...currentWeekDays, index + 1]);
                          } else {
                            form.setValue('weekDays', currentWeekDays.filter(d => d !== index + 1));
                          }
                        }}
                      />
                      <label 
                        htmlFor={`weekday-${index}`}
                        className="text-sm cursor-pointer"
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="important"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      {currentLanguage === 'vi' ? 'Đánh dấu là quan trọng' : 'Mark as important'}
                    </FormLabel>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  {currentLanguage === 'vi' ? 'Hủy' : 'Cancel'}
                </Button>
                <Button type="submit">
                  {editingNote 
                    ? currentLanguage === 'vi' ? 'Lưu' : 'Save'
                    : currentLanguage === 'vi' ? 'Thêm' : 'Add'
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
