
import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { WorkShiftForm } from "@/components/WorkShiftForm";
import { WorkShiftList } from "@/components/settings/WorkShiftList";
import { GeneralSettings } from "@/components/settings/GeneralSettings";

interface WorkShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  reminderBefore?: string;
  reminderAfter?: string;
  showCheckInButton?: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const [language, setLanguage] = React.useState("vi");
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [vibrationEnabled, setVibrationEnabled] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [showWorkShiftForm, setShowWorkShiftForm] = React.useState(false);
  const [editingShift, setEditingShift] = React.useState<WorkShift | null>(null);
  const [workShifts, setWorkShifts] = React.useState<WorkShift[]>([
    {
      id: "1",
      name: "Ca Ngay",
      startTime: "08:00",
      endTime: "20:00",
      isActive: true,
    }
  ]);

  React.useEffect(() => {
    // Load saved settings on component mount
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      const isDark = savedDarkMode === "true";
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const savedSound = localStorage.getItem("soundEnabled");
    if (savedSound !== null) {
      setSoundEnabled(savedSound === "true");
    }

    const savedVibration = localStorage.getItem("vibrationEnabled");
    if (savedVibration !== null) {
      setVibrationEnabled(savedVibration === "true");
    }
  }, []);

  const handleDarkModeToggle = (enabled: boolean) => {
    setIsDarkMode(enabled);
    localStorage.setItem("darkMode", enabled.toString());
    document.documentElement.classList.toggle("dark", enabled);
    
    toast({
      title: enabled ? "Đã bật chế độ tối" : "Đã tắt chế độ tối",
      duration: 2000,
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("language", value);
    
    toast({
      title: value === "vi" ? "Đã chuyển sang Tiếng Việt" : "Switched to English",
      duration: 2000,
    });
  };

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem("soundEnabled", enabled.toString());
  };

  const handleVibrationToggle = (enabled: boolean) => {
    setVibrationEnabled(enabled);
    localStorage.setItem("vibrationEnabled", enabled.toString());
  };

  const handleSaveWorkShift = (workShiftData: Omit<WorkShift, 'id' | 'isActive'>) => {
    if (editingShift) {
      // Update existing shift
      setWorkShifts(workShifts.map(shift => 
        shift.id === editingShift.id ? { ...workShiftData, id: shift.id, isActive: shift.isActive } : shift
      ));
      toast({
        title: "Cập nhật ca làm việc thành công",
        duration: 2000,
      });
    } else {
      // Add new shift
      setWorkShifts([...workShifts, { 
        ...workShiftData, 
        id: Date.now().toString(), 
        isActive: false 
      }]);
      toast({
        title: "Thêm ca làm việc mới thành công",
        duration: 2000,
      });
    }
    setShowWorkShiftForm(false);
    setEditingShift(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{language === "vi" ? "Cài đặt" : "Settings"}</h1>
          <Link to="/" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>

        {/* Work Shifts Section */}
        <WorkShiftList
          workShifts={workShifts}
          language={language}
          onAddShift={() => setShowWorkShiftForm(true)}
          onEditShift={(shift) => {
            setEditingShift(shift);
            setShowWorkShiftForm(true);
          }}
          onDeleteShift={(shiftId) => {
            setWorkShifts(workShifts.filter(s => s.id !== shiftId));
          }}
          onSetActiveShift={(shiftId) => {
            setWorkShifts(workShifts.map(s => ({
              ...s,
              isActive: s.id === shiftId
            })));
          }}
        />

        {/* General Settings Section */}
        <GeneralSettings
          language={language}
          isDarkMode={isDarkMode}
          soundEnabled={soundEnabled}
          vibrationEnabled={vibrationEnabled}
          onLanguageChange={handleLanguageChange}
          onDarkModeChange={handleDarkModeToggle}
          onSoundChange={handleSoundToggle}
          onVibrationChange={handleVibrationToggle}
        />
      </div>

      <WorkShiftForm
        isOpen={showWorkShiftForm}
        onClose={() => {
          setShowWorkShiftForm(false);
          setEditingShift(null);
        }}
        onSave={handleSaveWorkShift}
        editingShift={editingShift}
      />
    </div>
  );
};

Settings.displayName = "Settings";
export default Settings;
