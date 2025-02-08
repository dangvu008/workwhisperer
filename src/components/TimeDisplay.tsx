
import { format } from "date-fns";
import { vi, enUS } from "date-fns/locale";

interface TimeDisplayProps {
  language?: string;
}

export const TimeDisplay = ({ language = "en" }: TimeDisplayProps) => {
  const now = new Date();
  const locale = language === "vi" ? vi : enUS;
  
  return (
    <div className="text-left mb-8 animate-fade-in">
      <h1 className="text-6xl font-bold text-white mb-2">
        {format(now, "HH:mm")}
      </h1>
      <p className="text-muted-foreground capitalize">
        {format(now, "EEEE, dd/MM", { locale })}
      </p>
    </div>
  );
};
