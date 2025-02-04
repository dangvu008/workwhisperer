import { TimeDisplay } from "@/components/TimeDisplay";
import { ShiftStatus } from "@/components/ShiftStatus";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { Button } from "@/components/ui/button";
import { Settings, BarChart2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-foreground p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Time Manager</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <BarChart2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <TimeDisplay />
        <ShiftStatus />
        <WeeklySchedule />
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Ghi chú</h2>
          <Button className="bg-blue-500 hover:bg-blue-600">
            + Thêm ghi chú
          </Button>
        </div>
        <div className="text-center text-muted-foreground py-8">
          Chưa có ghi chú nào
        </div>
      </div>
    </div>
  );
};

export default Index;