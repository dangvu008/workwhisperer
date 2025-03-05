
import { format, startOfWeek, addDays, isBefore, isToday } from "date-fns";
import { Card } from "./ui/card";
import { 
  AlertCircle, 
  CheckCircle, 
  HelpCircle,
  FileText,
  Bed,
  Flag,
  XCircle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";

type AttendanceStatus = 
  | "warning"  // ❗ Đi làm nhưng thiếu chấm công
  | "complete" // ✅ Đủ công
  | "pending"  // ❓ Chưa cập nhật
  | "leave"    // 📩 Nghỉ phép 
  | "sick"     // 🛌 Nghỉ bệnh
  | "holiday"  // 🎌 Nghỉ lễ
  | "absent";  // ❌ Vắng không lý do

interface DayStatus {
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  reason?: string;
}

interface WeeklyScheduleProps {
  language?: string;
}

const vietnameseWeekdays: Record<string, string> = {
  'Mon': 'T2',
  'Tue': 'T3',
  'Wed': 'T4',
  'Thu': 'T5',
  'Fri': 'T6',
  'Sat': 'T7',
  'Sun': 'CN'
};

export const WeeklySchedule = ({ language = "vi" }: WeeklyScheduleProps) => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const getText = (en: string, vi: string) => language === "vi" ? vi : en;

  // Mock data with more realistic scenarios
  const [statuses, setStatuses] = useState<Record<string, DayStatus>>({
    "2024-03-18": { status: "complete", checkIn: "08:00", checkOut: "17:30" },
    "2024-03-19": { status: "warning", checkIn: "08:30" },
    "2024-03-20": { status: "leave", reason: getText("Annual Leave", "Nghỉ phép năm") },
    "2024-03-21": { status: "sick", reason: getText("Sick Leave", "Nghỉ ốm có đơn") },
  });

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
        return <HelpCircle {...iconProps} className="text-gray-400" />;
      case "leave":
        return <FileText {...iconProps} className="text-blue-500" />;
      case "sick":
        return <Bed {...iconProps} className="text-purple-500" />;
      case "holiday":
        return <Flag {...iconProps} className="text-red-500" />;
      case "absent":
        return <XCircle {...iconProps} className="text-red-500" />;
      default:
        return <HelpCircle {...iconProps} className="text-gray-400" />;
    }
  };

  const statusEmojis: Record<AttendanceStatus, { en: string; vi: string }> = {
    warning: { en: "❗ Missing Time Card", vi: "❗ Thiếu chấm công" },
    complete: { en: "✅ Complete", vi: "✅ Đủ công" },
    pending: { en: "❓ Not Updated", vi: "❓ Chưa cập nhật" },
    leave: { en: "📩 On Leave", vi: "📩 Nghỉ phép" },
    sick: { en: "🛌 Sick Leave", vi: "🛌 Nghỉ bệnh" },
    holiday: { en: "🎌 Holiday", vi: "🎌 Nghỉ lễ" },
    absent: { en: "❌ Absent", vi: "❌ Vắng không lý do" }
  };

  const getStatusText = (status: AttendanceStatus): string => {
    return getText(statusEmojis[status].en, statusEmojis[status].vi);
  };

  const getStatusDetails = (date: Date, status?: DayStatus): string => {
    if (!status) return getText("No data available", "Chưa có dữ liệu");
    
    let details = getStatusText(status.status);
    
    if (status.checkIn || status.checkOut) {
      details += "\n";
      if (status.checkIn) details += `${getText("Check-in: ", "Giờ vào: ")}${status.checkIn}\n`;
      if (status.checkOut) details += `${getText("Check-out: ", "Giờ ra: ")}${status.checkOut}`;
    }
    if (status.reason) {
      details += `\n${getText("Reason: ", "Lý do: ")}${status.reason}`;
    }
    return details.trim();
  };

  const updateStatus = (dateStr: string, newStatus: AttendanceStatus) => {
    setStatuses(prev => {
      const currentStatus = prev[dateStr] || {};
      return {
        ...prev,
        [dateStr]: { 
          ...currentStatus,
          status: newStatus,
        }
      };
    });
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
          const isPastOrToday = isBefore(date, new Date()) || isToday(date);
          const status = isPastOrToday ? (dayStatus?.status || "pending") : "pending";
          const weekdayEn = format(date, "EEE");
          const weekdayVi = vietnameseWeekdays[weekdayEn];

          return (
            <TooltipProvider key={i}>
              <Tooltip>
                <ContextMenu>
                  <ContextMenuTrigger disabled={!isPastOrToday} asChild>
                    <TooltipTrigger asChild>
                      <div className={`text-center p-2 rounded-md transition-colors duration-200 ${isPastOrToday ? 'cursor-pointer hover:bg-[#2A2F3C]' : 'cursor-default'}`}>
                        <div className="text-sm text-muted-foreground mb-1">
                          {language === "vi" ? weekdayVi : weekdayEn}
                        </div>
                        <div className="text-sm font-medium">{format(date, "dd")}</div>
                        <div className="mt-2 flex justify-center">
                          {getStatusIcon(status)}
                        </div>
                      </div>
                    </TooltipTrigger>
                  </ContextMenuTrigger>
                  {isPastOrToday && (
                    <ContextMenuContent className="w-48">
                      {Object.keys(statusEmojis).map((key) => (
                        <ContextMenuItem
                          key={key}
                          onClick={() => updateStatus(dateStr, key as AttendanceStatus)}
                          className="flex items-center gap-2"
                        >
                          {getStatusIcon(key as AttendanceStatus)}
                          <span>{getStatusText(key as AttendanceStatus)}</span>
                        </ContextMenuItem>
                      ))}
                    </ContextMenuContent>
                  )}
                </ContextMenu>
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
