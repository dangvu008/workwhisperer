import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CalendarDays, LogIn, LogOut, CheckCircle2, RotateCcw } from "lucide-react";

type ButtonState = "idle" | "go_work" | "check_in" | "check_out";

export const ShiftStatus = () => {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const [workStartTime, setWorkStartTime] = useState<string | null>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  const getButtonConfig = (state: ButtonState) => {
    switch (state) {
      case "idle":
        return {
          text: "Đi làm",
          icon: <LogIn className="w-6 h-6" />,
          color: "bg-emerald-500 hover:bg-emerald-600",
          action: () => {
            setWorkStartTime(new Date().toLocaleTimeString());
            setButtonState("go_work");
          }
        };
      case "go_work":
        return {
          text: "Chấm công vào",
          icon: <CheckCircle2 className="w-6 h-6" />,
          color: "bg-blue-500 hover:bg-blue-600",
          action: () => {
            setCheckInTime(new Date().toLocaleTimeString());
            setButtonState("check_in");
          }
        };
      case "check_in":
        return {
          text: "Tan làm",
          icon: <LogOut className="w-6 h-6" />,
          color: "bg-violet-500 hover:bg-violet-600",
          action: () => {
            setCheckOutTime(new Date().toLocaleTimeString());
            setButtonState("check_out");
          }
        };
      case "check_out":
        return {
          text: "Ký công",
          icon: <RotateCcw className="w-6 h-6" />,
          color: "bg-gray-500 hover:bg-gray-600",
          action: () => {
            // Reset all states for the next day
            setButtonState("idle");
            setWorkStartTime(null);
            setCheckInTime(null);
            setCheckOutTime(null);
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
        <div className="flex justify-center">
          <Button
            className={`w-32 h-32 rounded-full ${currentConfig.color} text-white flex flex-col items-center justify-center gap-2 transition-colors duration-200`}
            onClick={currentConfig.action}
          >
            {currentConfig.icon}
            <span className="text-lg font-medium">{currentConfig.text}</span>
          </Button>
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