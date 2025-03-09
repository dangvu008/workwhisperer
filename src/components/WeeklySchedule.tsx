
import { format, startOfWeek, addDays } from "date-fns";
import { Card } from "./ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AttendanceStatus, DayStatus } from "@/types/attendance";
import { StatusDetailDialog } from "./WeeklySchedule/StatusDetailDialog";
import { DayStatusCell } from "./WeeklySchedule/DayStatusCell";
import { getStatusText, statusEmojis } from "@/utils/attendanceUtils";
import { useLanguage } from "../contexts/LanguageContext";

export const WeeklySchedule = () => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DayStatus | null>(null);
  const { currentLanguage, t } = useLanguage();

  // Mock data with more realistic scenarios
  const [statuses, setStatuses] = useState<Record<string, DayStatus>>({
    "2024-03-18": { status: "complete", checkIn: "08:00", checkOut: "17:30" },
    "2024-03-19": { status: "warning", checkIn: "08:30" },
    "2024-03-20": { status: "leave", reason: currentLanguage === "vi" ? "Nghỉ phép năm" : "Annual Leave" },
    "2024-03-21": { status: "sick", reason: currentLanguage === "vi" ? "Nghỉ ốm có đơn" : "Sick Leave" },
    "2024-03-22": { status: "late", checkIn: "09:15", checkOut: "17:30", reason: currentLanguage === "vi" ? "Kẹt xe" : "Traffic" },
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
          ? (currentLanguage === "vi" ? "Nghỉ phép" : "Annual Leave")
          : (currentLanguage === "vi" ? "Nghỉ ốm" : "Sick Leave");
      }
      
      return {
        ...prev,
        [dateStr]: updatedStatus
      };
    });

    // Show toast notification - Fixed the translation key issue
    toast({
      title: currentLanguage === "vi" ? "Cập nhật trạng thái" : "Status Updated",
      description: currentLanguage === "vi" 
        ? `Trạng thái đã đổi thành ${statusEmojis[newStatus].vi}`
        : `Day status changed to ${statusEmojis[newStatus].en}`,
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
        {currentLanguage === "vi" ? "Trạng thái tuần này" : "This Week's Status"}
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
      />
    </Card>
  );
};
