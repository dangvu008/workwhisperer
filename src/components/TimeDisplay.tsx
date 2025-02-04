import { format } from "date-fns";

export const TimeDisplay = () => {
  const now = new Date();
  
  return (
    <div className="text-center mb-8 animate-fade-in">
      <h1 className="text-5xl font-bold text-white mb-2">
        {format(now, "HH:mm")}
      </h1>
      <p className="text-muted-foreground">
        {format(now, "EEEE, dd/MM")}
      </p>
    </div>
  );
};