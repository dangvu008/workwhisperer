import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CalendarDays } from "lucide-react";

export const ShiftStatus = () => {
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
            className="w-32 h-32 rounded-full bg-primary hover:bg-primary/90 text-white text-lg font-medium"
          >
            Đi làm
          </Button>
        </div>
        <div className="mt-4 text-center text-muted-foreground text-sm">
          Chưa bắt đầu
        </div>
        <div className="text-center text-blue-400 text-sm">
          Đã đi làm 04:57
        </div>
      </Card>
    </div>
  );
};