
import { format, startOfWeek, addDays, isBefore, isToday } from "date-fns";
import { Card } from "./ui/card";
import { 
  AlertCircle, 
  CheckCircle, 
  HelpCircle,
  FileText,
  Bed,
  Flag,
  XCircle,
  Clock
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type AttendanceStatus = 
  | "warning"  // ❗ Đi làm nhưng thiếu chấm công
  | "complete" // ✅ Đủ công
  | "pending"  // ❓ Chưa cập nhật
  | "leave"    // 📩 Nghỉ phép 
  | "sick"     // 🛌 Nghỉ bệnh
  | "holiday"  // 🎌 Nghỉ lễ
  | "absent"   // ❌ Vắng không lý do
  | "late";    // 🕒 RV vào muộn hoặc ra sớm

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
      case "late":
        return <Clock {...iconProps} className="text-orange-500" />;
      default:
        return <HelpCircle {...iconProps} className="text-gray-400" />;
    }
  };

  const statusEmojis: Record<AttendanceStatus, { en: string; vi: string, abbr: string }> = {
    warning: { en: "❗ Missing Time Card", vi: "❗ Thiếu chấm công", abbr: "!" },
    complete: { en: "✅ Complete", vi: "✅ Đủ công", abbr: "✓" },
    pending: { en: "❓ Not Updated", vi: "❓ Chưa cập nhật", abbr: "--" },
    leave: { en: "📩 On Leave", vi: "📩 Nghỉ phép", abbr: "P" },
    sick: { en: "🛌 Sick Leave", vi: "🛌 Nghỉ bệnh", abbr: "B" },
    holiday: { en: "🎌 Holiday", vi: "🎌 Nghỉ lễ", abbr: "H" },
    absent: { en: "❌ Absent", vi: "❌ Vắng không lý do", abbr: "X" },
    late: { en: "🕒 Late or Early Leave", vi: "🕒 Vào muộn hoặc ra sớm", abbr: "RV" }
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

  const getStatusBackgroundColor = (status: AttendanceStatus): string => {
    switch (status) {
      case "warning": return "bg-yellow-100 dark:bg-yellow-900/30";
      case "complete": return "bg-green-100 dark:bg-green-900/30";
      case "leave": return "bg-blue-100 dark:bg-blue-900/30";
      case "sick": return "bg-purple-100 dark:bg-purple-900/30";
      case "holiday": return "bg-red-100 dark:bg-red-900/30";
      case "absent": return "bg-red-100 dark:bg-red-900/30";
      case "late": return "bg-orange-100 dark:bg-orange-900/30";
      default: return "";
    }
  };

  const openDetailDialog = (date: Date, status: DayStatus) => {
    setSelectedDay(date);
    setSelectedStatus(status);
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
          const statusBg = getStatusBackgroundColor(status);

          return (
            <TooltipProvider key={i}>
              <Tooltip>
                <ContextMenu>
                  <ContextMenuTrigger disabled={!isPastOrToday} asChild>
                    <TooltipTrigger asChild>
                      <div 
                        className={`text-center p-2 rounded-md transition-colors duration-200 relative select-none
                        ${isPastOrToday ? 'cursor-pointer hover:bg-[#2A2F3C]' : 'cursor-default opacity-75'} 
                        ${statusBg}`}
                        onClick={() => {
                          if (isPastOrToday && dayStatus) {
                            openDetailDialog(date, dayStatus);
                          }
                        }}
                      >
                        <div className="text-sm text-muted-foreground mb-1">
                          {language === "vi" ? weekdayVi : weekdayEn}
                        </div>
                        <div className="text-sm font-medium">{format(date, "dd")}</div>
                        <div className="mt-2 flex flex-col items-center gap-1">
                          {getStatusIcon(status)}
                          <span className="text-xs font-medium">{statusEmojis[status].abbr}</span>
                        </div>
                      </div>
                    </TooltipTrigger>
                  </ContextMenuTrigger>
                  {isPastOrToday && (
                    <ContextMenuContent className="w-48">
                      {Object.keys(statusEmojis).map((key) => (
                        <ContextMenuItem
                          key={key}
                          onClick={() => handleStatusChange(dateStr, key as AttendanceStatus)}
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

      {/* Detail Dialog for Mobile */}
      <Dialog open={selectedDay !== null} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="w-[90%] max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {selectedDay && format(selectedDay, "dd/MM/yyyy")} {getText("Status", "Trạng thái")}
            </DialogTitle>
          </DialogHeader>
          
          {selectedDay && selectedStatus && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedStatus.status)}
                <span className="font-medium">{getStatusText(selectedStatus.status)}</span>
              </div>
              
              {(selectedStatus.checkIn || selectedStatus.checkOut) && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedStatus.checkIn && (
                    <div>
                      <Label className="text-muted-foreground">
                        {getText("Check-in", "Giờ vào")}
                      </Label>
                      <div className="font-medium">{selectedStatus.checkIn}</div>
                    </div>
                  )}
                  {selectedStatus.checkOut && (
                    <div>
                      <Label className="text-muted-foreground">
                        {getText("Check-out", "Giờ ra")}
                      </Label>
                      <div className="font-medium">{selectedStatus.checkOut}</div>
                    </div>
                  )}
                </div>
              )}
              
              {selectedStatus.reason && (
                <div>
                  <Label className="text-muted-foreground">
                    {getText("Reason", "Lý do")}
                  </Label>
                  <div className="font-medium">{selectedStatus.reason}</div>
                </div>
              )}
              
              <div className="pt-2">
                <Button variant="outline" onClick={() => setSelectedDay(null)} className="w-full">
                  {getText("Close", "Đóng")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};
