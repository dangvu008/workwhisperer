import { format, startOfWeek, addDays, isBefore, isToday } from "date-fns";
import { vi } from "date-fns/locale";
import { Card } from "./ui/card";
import { 
  AlertCircle, 
  CheckCircle, 
  MinusCircle,
  FileText,
  Bed,
  Flag,
  XCircle,
  QuestionMarkCircle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AttendanceStatus = 
  | "warning" // Đi làm nhưng thiếu chấm công
  | "complete" // Đủ công
  | "pending" // Chưa cập nhật
  | "leave" // Nghỉ phép
  | "sick" // Nghỉ bệnh
  | "holiday" // Nghỉ lễ
  | "absent"; // Vắng không lý do

interface DayStatus {
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  reason?: string;
}

export const WeeklySchedule = () => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  // Mock data - replace with real data in production
  const mockStatuses: Record<string, DayStatus> = {
    "2024-03-18": { status: "complete", checkIn: "08:00", checkOut: "17:00" },
    "2024-03-19": { status: "warning", checkIn: "08:30", checkOut: "--:--" },
    "2024-03-20": { status: "leave", reason: "Nghỉ phép năm" },
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    const iconProps = {
      className: "w-5 h-5",
      strokeWidth: 1.5
    };

    switch (status) {
      case "warning":
        return <AlertCircle {...iconProps} className="text-yellow-500" />;
      case "complete":
        return <CheckCircle {...iconProps} className="text-green-500" />;
      case "pending":
        return <MinusCircle {...iconProps} className="text-gray-400" />;
      case "leave":
        return <FileText {...iconProps} className="text-blue-500" />;
      case "sick":
        return <Bed {...iconProps} className="text-purple-500" />;
      case "holiday":
        return <Flag {...iconProps} className="text-red-500" />;
      case "absent":
        return <XCircle {...iconProps} className="text-red-500" />;
      default:
        return <QuestionMarkCircle {...iconProps} className="text-gray-400" />;
    }
  };

  const getStatusDetails = (date: Date, status?: DayStatus) => {
    if (!status) return "Chưa có dữ liệu";
    
    let details = "";
    if (status.checkIn && status.checkOut) {
      details += `${status.checkIn} - ${status.checkOut}`;
    }
    if (status.reason) {
      details += details ? `\n${status.reason}` : status.reason;
    }
    return details || "Không có thông tin chi tiết";
  };

  return (
    <Card className="bg-[#1A1F2C]/50 border-[#2A2F3C] p-4 mb-6">
      <h2 className="text-lg font-medium mb-4">Trạng thái tuần này</h2>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, i) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const dayStatus = mockStatuses[dateStr];
          const isPastOrToday = isBefore(date, new Date()) || isToday(date);
          const status = isPastOrToday ? (dayStatus?.status || "pending") : "pending";

          return (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center cursor-pointer">
                    <div className="text-sm text-muted-foreground mb-1 uppercase">
                      {format(date, "EEE", { locale: vi })}
                    </div>
                    <div className="text-sm">{format(date, "dd")}</div>
                    <div className="mt-2 flex justify-center">
                      {getStatusIcon(status)}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="whitespace-pre-line">
                    {getStatusDetails(date, dayStatus)}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </Card>
  );
};