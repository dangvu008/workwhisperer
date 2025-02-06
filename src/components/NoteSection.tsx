
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
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  content: string;
  reminderTime: string;
}

export const NoteSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success("Đã xóa ghi chú");
  };

  return (
    <Card className="bg-[#1A1F2C]/50 border-[#2A2F3C] p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Ghi chú</h2>
        <Button className="bg-primary hover:bg-primary/90 transition-colors duration-200">
          + Thêm ghi chú
        </Button>
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          Chưa có ghi chú nào
        </div>
      ) : (
        <div className="space-y-4">
          {notes.slice(0, 3).map((note) => (
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
                  <Button variant="ghost" size="icon">
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
