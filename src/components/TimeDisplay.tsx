
import { format } from "date-fns";
import { vi as viLocale, enUS } from "date-fns/locale";
import { useLanguage } from "../contexts/LanguageContext";

export const TimeDisplay = () => {
  const { currentLanguage } = useLanguage();
  const now = new Date();
  const locale = currentLanguage === "vi" ? viLocale : enUS;
  
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
