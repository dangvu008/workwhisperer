
import * as React from "react";
import { Plus, Pencil, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface WorkShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  reminderBefore?: string;
  reminderAfter?: string;
  showCheckInButton?: boolean;
}

interface WorkShiftListProps {
  workShifts: WorkShift[];
  language: string;
  onAddShift: () => void;
  onEditShift: (shift: WorkShift) => void;
  onDeleteShift: (shiftId: string) => void;
  onSetActiveShift: (shiftId: string) => void;
}

export const WorkShiftList = ({
  workShifts,
  language,
  onAddShift,
  onEditShift,
  onDeleteShift,
  onSetActiveShift,
}: WorkShiftListProps) => {
  const { toast } = useToast();

  return (
    <div className="bg-[#1A1F2C] rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            {language === "vi" ? "Ca làm việc" : "Work Shifts"}
          </h2>
          <p className="text-sm text-gray-400">
            {language === "vi" ? "Quản lý ca làm việc" : "Manage work shifts"}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-[#2A2F3C] border-[#3A3F4C] hover:bg-[#3A3F4C]"
          onClick={onAddShift}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{language === "vi" ? "Nhắc nhở thay đổi ca" : "Shift change reminder"}</span>
          <Select defaultValue="none">
            <SelectTrigger className="w-[180px] bg-[#2A2F3C] border-[#3A3F4C]">
              <SelectValue placeholder={language === "vi" ? "Không nhắc nhở" : "No reminder"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">
                {language === "vi" ? "Không nhắc nhở" : "No reminder"}
              </SelectItem>
              <SelectItem value="15">
                {language === "vi" ? "15 phút trước" : "15 minutes before"}
              </SelectItem>
              <SelectItem value="30">
                {language === "vi" ? "30 phút trước" : "30 minutes before"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {workShifts.map((shift) => (
          <div
            key={shift.id}
            className="flex items-center justify-between p-4 bg-[#111827] rounded-lg"
          >
            <div>
              <h3 className="font-medium">{shift.name}</h3>
              <p className="text-sm text-blue-400">
                {shift.startTime} - {shift.endTime}
              </p>
              {shift.isActive && (
                <p className="text-xs text-gray-400 mt-1">
                  {language === "vi" ? "Đang áp dụng cho tuần này" : "Applied for this week"}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                onClick={() => onSetActiveShift(shift.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-400/10"
                onClick={() => onEditShift(shift)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                onClick={() => {
                  onDeleteShift(shift.id);
                  toast({
                    title: "Đã xóa ca làm việc",
                    duration: 2000,
                  });
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
