import { TimeDisplay } from "@/components/TimeDisplay";
import { ShiftStatus } from "@/components/ShiftStatus";
import { WeeklySchedule } from "@/components/WeeklySchedule";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-md mx-auto pt-8">
        <TimeDisplay />
        <ShiftStatus />
        <WeeklySchedule />
      </div>
    </div>
  );
};

export default Index;