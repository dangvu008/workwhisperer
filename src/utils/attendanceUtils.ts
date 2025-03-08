
import { AttendanceStatus, StatusEmojiMap } from "@/types/attendance";
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

export const vietnameseWeekdays: Record<string, string> = {
  'Mon': 'T2',
  'Tue': 'T3',
  'Wed': 'T4',
  'Thu': 'T5',
  'Fri': 'T6',
  'Sat': 'T7',
  'Sun': 'CN'
};

export const statusEmojis: StatusEmojiMap = {
  warning: { en: "❗ Missing Time Card", vi: "❗ Thiếu chấm công", abbr: "!" },
  complete: { en: "✅ Complete", vi: "✅ Đủ công", abbr: "✓" },
  pending: { en: "❓ Not Updated", vi: "❓ Chưa cập nhật", abbr: "--" },
  leave: { en: "📩 On Leave", vi: "📩 Nghỉ phép", abbr: "P" },
  sick: { en: "🛌 Sick Leave", vi: "🛌 Nghỉ bệnh", abbr: "B" },
  holiday: { en: "🎌 Holiday", vi: "🎌 Nghỉ lễ", abbr: "H" },
  absent: { en: "❌ Absent", vi: "❌ Vắng không lý do", abbr: "X" },
  late: { en: "🕒 Late or Early Leave", vi: "🕒 Vào muộn hoặc ra sớm", abbr: "RV" }
};

export const getStatusIcon = (status: AttendanceStatus) => {
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

export const getStatusText = (status: AttendanceStatus, language: string): string => {
  return language === "vi" ? statusEmojis[status].vi : statusEmojis[status].en;
};

export const getStatusDetails = (date: Date, status: any, language: string): string => {
  if (!status) return language === "vi" ? "Chưa có dữ liệu" : "No data available";
  
  let details = getStatusText(status.status, language);
  
  if (status.checkIn || status.checkOut) {
    details += "\n";
    if (status.checkIn) details += `${language === "vi" ? "Giờ vào: " : "Check-in: "}${status.checkIn}\n`;
    if (status.checkOut) details += `${language === "vi" ? "Giờ ra: " : "Check-out: "}${status.checkOut}`;
  }
  if (status.reason) {
    details += `\n${language === "vi" ? "Lý do: " : "Reason: "}${status.reason}`;
  }
  return details.trim();
};

export const getStatusBackgroundColor = (status: AttendanceStatus): string => {
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
