
import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { WorkShiftForm } from "@/components/WorkShiftForm";
import { WorkShiftList } from "@/components/settings/WorkShiftList";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { useSettings } from "@/contexts/SettingsContext";

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
  const { 
    language, 
    isDarkMode, 
    soundEnabled, 
    vibrationEnabled,
    setLanguage,
    setDarkMode,
    setSoundEnabled,
    setVibrationEnabled
  } = useSettings();
  
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

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    
    toast({
      title: enabled ? "Đã bật chế độ tối" : "Đã tắt chế độ tối",
      duration: 2000,
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    toast({
      title: value === "vi" ? "Đã chuyển sang Tiếng Việt" : "Switched to English",
      duration: 2000,
    });
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
          onSoundChange={setSoundEnabled}
          onVibrationChange={setVibrationEnabled}
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
