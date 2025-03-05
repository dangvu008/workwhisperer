import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CalendarDays, LogIn, LogOut, CheckCircle2, RotateCcw, RefreshCw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type ButtonState = "idle" | "go_work" | "check_in" | "check_out";
type HistoryEntry = {
  action: string;
  time: string;
  icon: JSX.Element;
};

interface ShiftStatusProps {
  language?: string;
}

export const ShiftStatus = ({ language = "vi" }: ShiftStatusProps) => {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const [workStartTime, setWorkStartTime] = useState<string | null>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const getText = (en: string, vi: string) => language === "vi" ? vi : en;

  const addToHistory = (action: string, icon: JSX.Element) => {
    const time = new Date().toLocaleTimeString();
    setHistory(prev => [...prev, { action, time, icon }]);
  };

  const resetState = () => {
    setButtonState("idle");
    setWorkStartTime(null);
    setCheckInTime(null);
    setCheckOutTime(null);
    addToHistory(getText("Reset status", "Đặt lại trạng thái"), <RefreshCw className="w-4 h-4 text-gray-400" />);
    toast.success(getText("Status reset successfully", "Đã đặt lại trạng thái"));
  };

  const getButtonConfig = (state: ButtonState) => {
    switch (state) {
      case "idle":
        return {
          text: getText("Go to work", "Đi làm"),
          icon: <LogIn className="w-6 h-6" />,
          color: "bg-emerald-500 hover:bg-emerald-600",
          confirmMessage: getText(
            "Are you sure you want to start your work shift?",
            "Bạn có chắc chắn muốn bắt đầu ca làm việc?"
          ),
          action: () => {
            const time = new Date().toLocaleTimeString();
            setWorkStartTime(time);
            setButtonState("go_work");
            addToHistory(getText("Started work", "Đi làm"), <LogIn className="w-4 h-4 text-emerald-500" />);
            toast.success(getText("Work shift started", "Đã bắt đầu ca làm việc"));
          }
        };
      case "go_work":
        return {
          text: getText("Clock in", "Chấm công vào"),
          icon: <CheckCircle2 className="w-6 h-6" />,
          color: "bg-blue-500 hover:bg-blue-600",
          confirmMessage: getText(
            "Confirm clock in?",
            "Xác nhận chấm công vào?"
          ),
          action: () => {
            const time = new Date().toLocaleTimeString();
            setCheckInTime(time);
            setButtonState("check_in");
            addToHistory(getText("Clocked in", "Chấm công vào"), <CheckCircle2 className="w-4 h-4 text-blue-500" />);
            toast.success(getText("Clocked in successfully", "Đã chấm công vào"));
          }
        };
      case "check_in":
        return {
          text: getText("Clock out", "Tan làm"),
          icon: <LogOut className="w-6 h-6" />,
          color: "bg-violet-500 hover:bg-violet-600",
          confirmMessage: getText(
            "Confirm end of work shift?",
            "Xác nhận kết thúc ca làm việc?"
          ),
          action: () => {
            const time = new Date().toLocaleTimeString();
            setCheckOutTime(time);
            setButtonState("check_out");
            addToHistory(getText("Clocked out", "Tan làm"), <LogOut className="w-4 h-4 text-violet-500" />);
            toast.success(getText("Clocked out successfully", "Đã chấm công ra"));
          }
        };
      case "check_out":
        return {
          text: getText("Sign off", "Ký công"),
          icon: <RotateCcw className="w-6 h-6" />,
          color: "bg-gray-500 hover:bg-gray-600",
          confirmMessage: getText(
            "Confirm sign off and end work shift?",
            "Xác nhận ký công và kết thúc ca làm việc?"
          ),
          action: () => {
            addToHistory(getText("Signed off", "Ký công"), <RotateCcw className="w-4 h-4 text-gray-500" />);
            resetState();
            toast.success(getText("Work shift completed", "Đã hoàn thành ca làm việc"));
          }
        };
    }
  };

  const currentConfig = getButtonConfig(buttonState);

  return (
    <div className="mb-6">
      <Card className="bg-[#1A1F2C]/50 border-[#2A2F3C] p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-medium text-blue-400">
              {getText("Day Shift", "Ca Ngày")}
            </h2>
          </div>
          <div className="text-muted-foreground text-sm">
            08:00 → 20:00
          </div>
        </div>
        <div className="flex justify-center relative max-w-[200px] mx-auto">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className={`w-32 h-32 rounded-full ${currentConfig.color} text-white flex flex-col items-center justify-center gap-2 transition-colors duration-200`}
              >
                {currentConfig.icon}
                <span className="text-lg font-medium">{currentConfig.text}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {getText("Confirm Action", "Xác nhận thao tác")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {currentConfig.confirmMessage}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {getText("Cancel", "Hủy")}
                </AlertDialogCancel>
                <AlertDialogAction onClick={currentConfig.action}>
                  {getText("Confirm", "Xác nhận")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          {buttonState !== "idle" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -right-2 top-0 rounded-full w-8 h-8"
                >
                  <RefreshCw className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors duration-200" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {getText("Confirm Reset", "Xác nhận đặt lại")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {getText(
                      "Are you sure you want to reset the status? This action cannot be undone.",
                      "Bạn có chắc chắn muốn đặt lại trạng thái? Hành động này không thể hoàn tác."
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {getText("Cancel", "Hủy")}
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={resetState}>
                    {getText("Confirm", "Xác nhận")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <div className="mt-4 space-y-2">
          {workStartTime && (
            <div className="text-center text-muted-foreground text-sm">
              {getText("Started work at ", "Đã đi làm ")} {workStartTime}
            </div>
          )}
          {checkInTime && (
            <div className="text-center text-blue-400 text-sm">
              {getText("Clocked in at ", "Chấm công vào ")} {checkInTime}
            </div>
          )}
          {checkOutTime && (
            <div className="text-center text-violet-400 text-sm">
              {getText("Clocked out at ", "Chấm công ra ")} {checkOutTime}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
