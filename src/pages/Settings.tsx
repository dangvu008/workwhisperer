import { useState, useEffect } from "react";
import { Bell, Moon, Sun, User, Clock, ChevronDown, Plus, ArrowLeft, Pencil, Trash2, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface WorkShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState("vi");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [workShifts, setWorkShifts] = useState<WorkShift[]>([
    {
      id: "1",
      name: "Ca Ngay",
      startTime: "08:00",
      endTime: "20:00",
      isActive: true,
    }
  ]);

  // Load saved settings on component mount
  useEffect(() => {
    // Load dark mode setting
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      const isDark = savedDarkMode === "true";
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }

    // Load language setting
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Load notification settings
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
        <div className="bg-[#1A1F2C] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                {language === "vi" ? "Ca làm việc" : "Work Shifts"}
              </h2>
              <p className="text-sm text-gray-400">
                {language === "vi" ? "Quản lý ca làm việc" : "Manage work shifts"}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-[#2A2F3C] border-[#3A3F4C] hover:bg-[#3A3F4C]"
              onClick={() => setShowWorkShiftForm(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{language === "vi" ? "Nhắc nhở thay đổi ca" : "Shift change reminder"}</span>
              <Select defaultValue="none">
                <SelectTrigger className="w-[180px] bg-[#2A2F3C] border-[#3A3F4C]">
                  <SelectValue placeholder={language === "vi" ? "Không nhắc nhở" : "No reminder"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">
                    {language === "vi" ? "Không nhắc nhở" : "No reminder"}
                  </SelectItem>
                  <SelectItem value="15">
                    {language === "vi" ? "15 phút trước" : "15 minutes before"}
                  </SelectItem>
                  <SelectItem value="30">
                    {language === "vi" ? "30 phút trước" : "30 minutes before"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {workShifts.map((shift) => (
              <div
                key={shift.id}
                className="flex items-center justify-between p-4 bg-[#111827] rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{shift.name}</h3>
                  <p className="text-sm text-blue-400">
                    {shift.startTime} - {shift.endTime}
                  </p>
                  {shift.isActive && (
                    <p className="text-xs text-gray-400 mt-1">
                      {language === "vi" ? "Đang áp dụng cho tuần này" : "Applied for this week"}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-400 hover:text-gray-300 hover:bg-gray-400/10"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Settings Section */}
        <div className="bg-[#1A1F2C] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">
            {language === "vi" ? "Cài đặt chung" : "General Settings"}
          </h2>
          
          <div className="space-y-6">
            {/* Dark Mode */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">
                    {language === "vi" ? "Chế độ tối" : "Dark Mode"}
                  </Label>
                  <p className="text-sm text-gray-400">
                    {language === "vi" 
                      ? "Bật chế độ tối để có trải nghiệm xem tốt hơn trong điều kiện ánh sáng yếu"
                      : "Enable dark mode for a better viewing experience in low light conditions"}
                  </p>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={handleDarkModeToggle}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label className="text-base font-medium">
                {language === "vi" ? "Ngôn ngữ" : "Language"}
              </Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full bg-[#2A2F3C] border-[#3A3F4C]">
                  <SelectValue placeholder={language === "vi" ? "Chọn ngôn ngữ" : "Select language"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notification Sound */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">
                  {language === "vi" ? "Âm thanh thông báo" : "Notification Sound"}
                </Label>
                <p className="text-sm text-gray-400">
                  {language === "vi" 
                    ? "Phát âm thanh khi có thông báo"
                    : "Play sound when notifications arrive"}
                </p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={handleSoundToggle}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            {/* Vibration */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">
                  {language === "vi" ? "Rung thông báo" : "Notification Vibration"}
                </Label>
                <p className="text-sm text-gray-400">
                  {language === "vi"
                    ? "Rung khi có thông báo"
                    : "Vibrate when notifications arrive"}
                </p>
              </div>
              <Switch
                checked={vibrationEnabled}
                onCheckedChange={handleVibrationToggle}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { WorkShiftForm } from "@/components/WorkShiftForm";

// Add this to the existing state declarations
const [showWorkShiftForm, setShowWorkShiftForm] = useState(false);
const [editingShift, setEditingShift] = useState<WorkShift | null>(null);

// Add these functions before the return statement
const handleSaveWorkShift = (workShiftData: any) => {
  if (editingShift) {
    // Update existing shift
    setWorkShifts(workShifts.map(shift => 
      shift.id === editingShift.id ? { ...workShiftData, id: shift.id } : shift
    ));
  } else {
    // Add new shift
    setWorkShifts([...workShifts, { id: Date.now().toString(), ...workShiftData, isActive: false }]);
  }
  setShowWorkShiftForm(false);
  setEditingShift(null);
};

const handleEditShift = (shift: WorkShift) => {
  setEditingShift(shift);
  setShowWorkShiftForm(true);
};

// Add this before the closing return statement
Settings.displayName = "Settings";
export default Settings;
