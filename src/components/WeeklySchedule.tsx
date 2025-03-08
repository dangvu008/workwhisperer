
import { format, startOfWeek, addDays } from "date-fns";
import { Card } from "./ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AttendanceStatus, DayStatus } from "@/types/attendance";
import { StatusDetailDialog } from "./WeeklySchedule/StatusDetailDialog";
import { DayStatusCell } from "./WeeklySchedule/DayStatusCell";
import { getStatusText, statusEmojis } from "@/utils/attendanceUtils";

interface WeeklyScheduleProps {
  language?: string;
}

export const WeeklySchedule = ({ language = "vi" }: WeeklyScheduleProps) => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DayStatus | null>(null);

  const getText = (en: string, vi: string) => language === "vi" ? vi : en;

  // Mock data with more realistic scenarios
  const [statuses, setStatuses] = useState<Record<string, DayStatus>>({
    "2024-03-18": { status: "complete", checkIn: "08:00", checkOut: "17:30" },
    "2024-03-19": { status: "warning", checkIn: "08:30" },
    "2024-03-20": { status: "leave", reason: getText("Annual Leave", "Nghỉ phép năm") },
    "2024-03-21": { status: "sick", reason: getText("Sick Leave", "Nghỉ ốm có đơn") },
    "2024-03-22": { status: "late", checkIn: "09:15", checkOut: "17:30", reason: getText("Traffic", "Kẹt xe") },
  });

  const handleStatusChange = (dateStr: string, newStatus: AttendanceStatus) => {
    setStatuses(prev => {
      const currentStatus = prev[dateStr] || {};
      
      // Prepare updated status object
      const updatedStatus: DayStatus = { 
        ...currentStatus,
        status: newStatus
      };
      
      // For leave and sick statuses, add a default reason if none exists
      if ((newStatus === "leave" || newStatus === "sick") && !updatedStatus.reason) {
        updatedStatus.reason = newStatus === "leave" 
          ? getText("Annual Leave", "Nghỉ phép")
          : getText("Sick Leave", "Nghỉ ốm");
      }
      
      return {
        ...prev,
        [dateStr]: updatedStatus
      };
    });

    // Show toast notification
    toast({
      title: getText("Status Updated", "Đã cập nhật trạng thái"),
      description: getText(
        `Day status changed to ${statusEmojis[newStatus].en}`,
        `Trạng thái đã đổi thành ${statusEmojis[newStatus].vi}`
      ),
    });
  };

  const openDetailDialog = (date: Date, status: DayStatus) => {
    setSelectedDay(date);
    setSelectedStatus(status);
  };

  const closeDetailDialog = () => {
    setSelectedDay(null);
    setSelectedStatus(null);
  };
  
  return (
    <Card className="bg-[#1A1F2C]/50 border-[#2A2F3C] p-4 mb-6">
      <h2 className="text-lg font-medium mb-4">
        {getText("This Week's Status", "Trạng thái tuần này")}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, i) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const dayStatus = statuses[dateStr];
          
          return (
            <DayStatusCell
              key={i}
              date={date}
              dayStatus={dayStatus}
              language={language}
              onStatusChange={handleStatusChange}
              onCellClick={openDetailDialog}
            />
          );
        })}
      </div>

      <StatusDetailDialog
        selectedDay={selectedDay}
        selectedStatus={selectedStatus}
        onClose={closeDetailDialog}
        language={language}
      />
    </Card>
  );
};
