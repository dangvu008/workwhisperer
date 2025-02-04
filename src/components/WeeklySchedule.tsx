import { format, startOfWeek, addDays } from "date-fns";
import { vi } from "date-fns/locale";
import { Card } from "./ui/card";

export const WeeklySchedule = () => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <Card className="bg-[#1A1F2C]/50 border-[#2A2F3C] p-4 mb-6">
      <h2 className="text-lg font-medium mb-4">Trạng thái tuần này</h2>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, i) => (
          <div key={i} className="text-center">
            <div className="text-sm text-muted-foreground mb-1 uppercase">
              {format(date, "EEE", { locale: vi })}
            </div>
            <div className="text-sm">{format(date, "dd")}</div>
            <div className={`mt-2 w-8 h-8 mx-auto rounded-full border-2 
              ${i === 1 ? 'border-primary bg-primary/20' : 'border-muted-foreground'} 
              flex items-center justify-center`}>
              {i === 1 && <div className="w-4 h-4 rounded-full bg-primary" />}
            </div>
            {i <= 1 && (
              <div className="mt-2 text-xs text-muted-foreground">
                08:00
                <br />-<br />
                20:00
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};