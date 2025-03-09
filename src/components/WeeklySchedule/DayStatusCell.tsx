import { format, isToday, isBefore } from "date-fns";
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
import { AttendanceStatus, DayStatus } from "@/types/attendance";
import { 
  getStatusDetails, 
  getStatusBackgroundColor,
  getStatusText,
  vietnameseWeekdays,
  statusEmojis
} from "@/utils/attendanceUtils";
import { getStatusIcon } from "@/components/WeeklySchedule/StatusIcons";

interface DayStatusCellProps {
  date: Date;
  dayStatus?: DayStatus;
  language: string;
  onStatusChange: (dateStr: string, status: AttendanceStatus) => void;
  onCellClick: (date: Date, status: DayStatus) => void;
}

export const DayStatusCell = ({
  date,
  dayStatus,
  language,
  onStatusChange,
  onCellClick
}: DayStatusCellProps) => {
  const dateStr = format(date, "yyyy-MM-dd");
  const isPastOrToday = isBefore(date, new Date()) || isToday(date);
  const status = isPastOrToday ? (dayStatus?.status || "pending") : "pending";
  const weekdayEn = format(date, "EEE");
  const weekdayVi = vietnameseWeekdays[weekdayEn];
  const statusBg = getStatusBackgroundColor(status);

  return (
    <TooltipProvider>
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
                    onCellClick(date, dayStatus);
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
                  onClick={() => onStatusChange(dateStr, key as AttendanceStatus)}
                  className="flex items-center gap-2"
                >
                  {getStatusIcon(key as AttendanceStatus)}
                  <span>{getStatusText(key as AttendanceStatus, language)}</span>
                </ContextMenuItem>
              ))}
            </ContextMenuContent>
          )}
        </ContextMenu>
        <TooltipContent>
          <p className="whitespace-pre-line">
            {getStatusDetails(date, dayStatus, language)}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
