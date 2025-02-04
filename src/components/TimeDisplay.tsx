import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const TimeDisplay = () => {
  const now = new Date();
  
  return (
    <div className="text-left mb-8 animate-fade-in">
      <h1 className="text-6xl font-bold text-white mb-2">
        {format(now, "HH:mm")}
      </h1>
      <p className="text-muted-foreground capitalize">
        {format(now, "EEEE, dd/MM", { locale: vi })}
      </p>
    </div>
  );
};