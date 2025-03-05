
import { TimeDisplay } from "@/components/TimeDisplay";
import { ShiftStatus } from "@/components/ShiftStatus";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { NoteSection } from "@/components/NoteSection";
import { Button } from "@/components/ui/button";
import { Settings, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "@/contexts/SettingsContext";

const Index = () => {
  const navigate = useNavigate();
  const { language, isDarkMode } = useSettings();

  const getText = (en: string, vi: string) => language === "vi" ? vi : en;
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-b from-[#0A0F1C] to-[#1A1F2C] text-white' : 'bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] text-gray-800'}`}>
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {getText("Time Manager", "Quản lý thời gian")}
          </h1>
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-primary'}`}
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-primary'}`}
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
