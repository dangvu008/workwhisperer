
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
  const getText = (en: string, vi: string) => language === "vi" ? vi : en;

  return (
    <div className="bg-[#1A1F2C] rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            {getText("Work Shifts", "Ca làm việc")}
          </h2>
          <p className="text-sm text-gray-400">
            {getText("Manage work shifts", "Quản lý ca làm việc")}
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
          <span>{getText("Shift change reminder", "Nhắc nhở thay đổi ca")}</span>
          <Select defaultValue="none">
            <SelectTrigger className="w-[180px] bg-[#2A2F3C] border-[#3A3F4C]">
              <SelectValue placeholder={getText("No reminder", "Không nhắc nhở")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">
                {getText("No reminder", "Không nhắc nhở")}
              </SelectItem>
              <SelectItem value="15">
                {getText("15 minutes before", "15 phút trước")}
              </SelectItem>
              <SelectItem value="30">
                {getText("30 minutes before", "30 phút trước")}
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
                  {getText("Applied for this week", "Đang áp dụng cho tuần này")}
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
                    title: getText("Work shift deleted", "Đã xóa ca làm việc"),
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
