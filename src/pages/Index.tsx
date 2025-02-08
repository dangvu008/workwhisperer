
import { TimeDisplay } from "@/components/TimeDisplay";
import { ShiftStatus } from "@/components/ShiftStatus";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { NoteSection } from "@/components/NoteSection";
import { Button } from "@/components/ui/button";
import { Settings, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "vi");

  useEffect(() => {
    // Listen for language changes in localStorage
    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem("language") || "vi";
      setLanguage(newLanguage);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getText = (en: string, vi: string) => language === "vi" ? vi : en;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1C] to-[#1A1F2C] text-foreground p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {getText("Time Manager", "Quản lý thời gian")}
          </h1>
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <BarChart2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <TimeDisplay language={language} />
          <ShiftStatus language={language} />
          <WeeklySchedule language={language} />
          <NoteSection language={language} />
        </div>
      </div>
    </div>
  );
};

export default Index;

