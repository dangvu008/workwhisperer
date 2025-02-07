
import { useState, useEffect } from "react";
import { Bell, Moon, Sun, User, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

interface WorkShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const [name, setName] = useState("Nguyễn Văn A");
  const [language, setLanguage] = useState("vi");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [workShifts, setWorkShifts] = useState<WorkShift[]>([
    {
      id: "1",
      name: "Ca sáng",
      startTime: "08:00",
      endTime: "17:00",
      isActive: true,
    },
    {
      id: "2",
      name: "Ca chiều",
      startTime: "13:00",
      endTime: "22:00",
      isActive: false,
    },
  ]);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === "true");
      document.documentElement.classList.toggle("dark", savedDarkMode === "true");
    } else {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemDarkMode);
      document.documentElement.classList.toggle("dark", systemDarkMode);
    }
  }, []);

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleUpdatePersonalInfo = () => {
    localStorage.setItem("language", language);
    toast({
      title: language === "vi" ? "Thành công" : "Success",
      description: language === "vi" 
        ? "Thông tin cá nhân đã được cập nhật" 
        : "Personal information has been updated",
    });
  };

  const handleToggleShift = (shiftId: string) => {
    setWorkShifts(shifts =>
      shifts.map(shift => ({
        ...shift,
        isActive: shift.id === shiftId,
      }))
    );
    toast({
      title: language === "vi" ? "Thành công" : "Success",
      description: language === "vi" 
        ? "Đã cập nhật ca làm việc"
        : "Work shift has been updated",
    });
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setIsDarkMode(enabled);
    localStorage.setItem("darkMode", enabled.toString());
    document.documentElement.classList.toggle("dark", enabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1C] to-[#1A1F2C] text-foreground p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          {language === "vi" ? "Cài đặt" : "Settings"}
        </h1>

        {/* Work Shifts Section */}
        <div className="bg-black/20 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5" />
            <h2 className="text-xl font-semibold">
              {language === "vi" ? "Quản lý ca làm việc" : "Work Shift Management"}
            </h2>
          </div>
          <div className="space-y-4">
            {workShifts.map((shift) => (
              <div
                key={shift.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  shift.isActive
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-black/20"
                }`}
              >
                <div>
                  <h3 className="font-medium">{shift.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {shift.startTime} - {shift.endTime}
                  </p>
                </div>
                <Button
                  variant={shift.isActive ? "default" : "secondary"}
                  onClick={() => handleToggleShift(shift.id)}
                >
                  {shift.isActive 
                    ? (language === "vi" ? "Đang áp dụng" : "Applied")
                    : (language === "vi" ? "Áp dụng" : "Apply")}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-black/20 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5" />
            <h2 className="text-xl font-semibold">
              {language === "vi" ? "Thông tin cá nhân" : "Personal Information"}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {language === "vi" ? "Họ và tên" : "Full Name"}
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">
                {language === "vi" ? "Ngôn ngữ" : "Language"}
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleUpdatePersonalInfo}>
              {language === "vi" ? "Cập nhật" : "Update"}
            </Button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-black/20 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5" />
            <h2 className="text-xl font-semibold">
              {language === "vi" ? "Thông báo" : "Notifications"}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound">
                {language === "vi" ? "Âm thanh" : "Sound"}
              </Label>
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="vibration">
                {language === "vi" ? "Rung" : "Vibration"}
              </Label>
              <Switch
                id="vibration"
                checked={vibrationEnabled}
                onCheckedChange={setVibrationEnabled}
              />
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-black/20 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            {isDarkMode ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <h2 className="text-xl font-semibold">
              {language === "vi" ? "Giao diện" : "Theme"}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">
              {language === "vi" ? "Chế độ tối" : "Dark Mode"}
            </Label>
            <Switch
              id="theme"
              checked={isDarkMode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
