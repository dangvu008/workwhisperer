
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkShiftFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workShift: any) => void;
  editingShift?: any;
}

export const WorkShiftForm = ({ isOpen, onClose, onSave, editingShift }: WorkShiftFormProps) => {
  const [name, setName] = useState(editingShift?.name || "");
  const [startTime, setStartTime] = useState(editingShift?.startTime || "");
  const [endTime, setEndTime] = useState(editingShift?.endTime || "");
  const [reminderBefore, setReminderBefore] = useState("15");
  const [reminderAfter, setReminderAfter] = useState("15");
  const [showCheckInButton, setShowCheckInButton] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      startTime,
      endTime,
      reminderBefore,
      reminderAfter,
      showCheckInButton,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C] border-[#2A2F3C] text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {editingShift ? "Sửa ca làm việc" : "Thêm ca làm việc mới"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Tên ca làm việc</Label>
            <Input
              placeholder="Nhập tên ca làm việc"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#2A2F3C] border-[#3A3F4C] text-white"
            />
          </div>

          <div className="space-y-2">
            <Label>Thời gian xuất phát</Label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-[#2A2F3C] border-[#3A3F4C] text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Giờ bắt đầu</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-[#2A2F3C] border-[#3A3F4C] text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Giờ kết thúc</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-[#2A2F3C] border-[#3A3F4C] text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Nhắc nhở trước giờ vào làm</Label>
            <Select value={reminderBefore} onValueChange={setReminderBefore}>
              <SelectTrigger className="bg-[#2A2F3C] border-[#3A3F4C] text-white">
                <SelectValue placeholder="15 phút" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 phút</SelectItem>
                <SelectItem value="30">30 phút</SelectItem>
                <SelectItem value="45">45 phút</SelectItem>
                <SelectItem value="60">60 phút</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Nhắc nhở sau giờ làm</Label>
            <Select value={reminderAfter} onValueChange={setReminderAfter}>
              <SelectTrigger className="bg-[#2A2F3C] border-[#3A3F4C] text-white">
                <SelectValue placeholder="15 phút" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 phút</SelectItem>
                <SelectItem value="30">30 phút</SelectItem>
                <SelectItem value="45">45 phút</SelectItem>
                <SelectItem value="60">60 phút</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>Hiển thị nút Ký công</Label>
            <Switch
              checked={showCheckInButton}
              onCheckedChange={setShowCheckInButton}
              className="data-[state=checked]:bg-[#9b87f5]"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="bg-transparent border-[#3A3F4C] text-white hover:bg-[#2A2F3C]"
            >
              Đặt lại
            </Button>
            <Button
              type="submit"
              className="bg-[#9b87f5] text-white hover:bg-[#8b77e5]"
            >
              Lưu ca làm việc
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

