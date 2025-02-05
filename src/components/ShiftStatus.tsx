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

export const ShiftStatus = () => {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const [workStartTime, setWorkStartTime] = useState<string | null>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  const resetState = () => {
    setButtonState("idle");
    setWorkStartTime(null);
    setCheckInTime(null);
    setCheckOutTime(null);
    toast.success("Đã đặt lại trạng thái");
  };

  const getButtonConfig = (state: ButtonState) => {
    switch (state) {
      case "idle":
        return {
          text: "Đi làm",
          icon: <LogIn className="w-6 h-6" />,
          color: "bg-emerald-500 hover:bg-emerald-600",
          confirmMessage: "Bạn có chắc chắn muốn bắt đầu ca làm việc?",
          action: () => {
            setWorkStartTime(new Date().toLocaleTimeString());
            setButtonState("go_work");
            toast.success("Đã bắt đầu ca làm việc");
          }
        };
      case "go_work":
        return {
          text: "Chấm công vào",
          icon: <CheckCircle2 className="w-6 h-6" />,
          color: "bg-blue-500 hover:bg-blue-600",
          confirmMessage: "Xác nhận chấm công vào?",
          action: () => {
            setCheckInTime(new Date().toLocaleTimeString());
            setButtonState("check_in");
            toast.success("Đã chấm công vào");
          }
        };
      case "check_in":
        return {
          text: "Tan làm",
          icon: <LogOut className="w-6 h-6" />,
          color: "bg-violet-500 hover:bg-violet-600",
          confirmMessage: "Xác nhận kết thúc ca làm việc?",
          action: () => {
            setCheckOutTime(new Date().toLocaleTimeString());
            setButtonState("check_out");
            toast.success("Đã chấm công ra");
          }
        };
      case "check_out":
        return {
          text: "Ký công",
          icon: <RotateCcw className="w-6 h-6" />,
          color: "bg-gray-500 hover:bg-gray-600",
          confirmMessage: "Xác nhận ký công và kết thúc ca làm việc?",
          action: () => {
            resetState();
            toast.success("Đã hoàn thành ca làm việc");
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
            <h2 className="text-lg font-medium text-blue-400">Ca Ngày</h2>
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
                <AlertDialogTitle>Xác nhận thao tác</AlertDialogTitle>
                <AlertDialogDescription>
                  {currentConfig.confirmMessage}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={currentConfig.action}>
                  Xác nhận
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          {buttonState !== "idle" && (
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-2 top-0 rounded-full w-8 h-8"
              onClick={resetState}
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
          )}
        </div>
        <div className="mt-4 space-y-2">
          {workStartTime && (
            <div className="text-center text-muted-foreground text-sm">
              Đã đi làm {workStartTime}
            </div>
          )}
          {checkInTime && (
            <div className="text-center text-blue-400 text-sm">
              Chấm công vào {checkInTime}
            </div>
          )}
          {checkOutTime && (
            <div className="text-center text-violet-400 text-sm">
              Chấm công ra {checkOutTime}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};