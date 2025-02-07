
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

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === "true");
      document.documentElement.classList.toggle("dark", savedDarkMode === "true");
    }
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleDarkModeToggle = (enabled: boolean) => {
    setIsDarkMode(enabled);
    localStorage.setItem("darkMode", enabled.toString());
    document.documentElement.classList.toggle("dark", enabled);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Link to="/" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>

        {/* Work Shifts Section */}
        <div className="bg-[#1A1F2C] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Ca làm việc</h2>
              <p className="text-sm text-gray-400">Quản lý ca làm việc</p>
            </div>
            <Button variant="outline" size="icon" className="bg-[#2A2F3C] border-[#3A3F4C] hover:bg-[#3A3F4C]">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Nhắc nhở thay đổi ca</span>
              <Select defaultValue="none">
                <SelectTrigger className="w-[180px] bg-[#2A2F3C] border-[#3A3F4C]">
                  <SelectValue placeholder="Không nhắc nhở" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Không nhắc nhở</SelectItem>
                  <SelectItem value="15">15 phút trước</SelectItem>
                  <SelectItem value="30">30 phút trước</SelectItem>
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
                      Đang áp dụng cho tuần này
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
          <h2 className="text-xl font-semibold mb-6">Cài đặt chung</h2>
          
          <div className="space-y-6">
            {/* Dark Mode */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Chế độ tối</Label>
                  <p className="text-sm text-gray-400">
                    Bật chế độ tối để có trải nghiệm xem tốt hơn trong điều kiện ánh sáng yếu
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
              <Label className="text-base font-medium">Ngôn ngữ</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full bg-[#2A2F3C] border-[#3A3F4C]">
                  <SelectValue placeholder="Chọn ngôn ngữ" />
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
                <Label className="text-base font-medium">Âm thanh thông báo</Label>
                <p className="text-sm text-gray-400">
                  Phát âm thanh khi có thông báo
                </p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            {/* Vibration */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Rung thông báo</Label>
                <p className="text-sm text-gray-400">
                  Rung khi có thông báo
                </p>
              </div>
              <Switch
                checked={vibrationEnabled}
                onCheckedChange={setVibrationEnabled}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
