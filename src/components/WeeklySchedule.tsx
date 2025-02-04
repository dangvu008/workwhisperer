import { format, startOfWeek, addDays } from "date-fns";

export const WeeklySchedule = () => {
  const startDate = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="bg-card rounded-lg p-4 animate-slide-in">
      <h2 className="text-lg font-semibold mb-4">Trạng thái tuần này</h2>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, i) => (
          <div key={i} className="text-center">
            <div className="text-sm text-muted-foreground mb-1">
              {format(date, "EE")}
            </div>
            <div className="text-sm">{format(date, "dd")}</div>
            <div className="mt-2 w-8 h-8 mx-auto rounded-full border-2 border-muted-foreground flex items-center justify-center">
              {i === 1 && <div className="w-4 h-4 rounded-full bg-primary" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};