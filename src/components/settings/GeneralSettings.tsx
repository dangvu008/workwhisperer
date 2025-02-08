
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneralSettingsProps {
  language: string;
  isDarkMode: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  onLanguageChange: (value: string) => void;
  onDarkModeChange: (enabled: boolean) => void;
  onSoundChange: (enabled: boolean) => void;
  onVibrationChange: (enabled: boolean) => void;
}

export const GeneralSettings = ({
  language,
  isDarkMode,
  soundEnabled,
  vibrationEnabled,
  onLanguageChange,
  onDarkModeChange,
  onSoundChange,
  onVibrationChange,
}: GeneralSettingsProps) => {
  const getText = (en: string, vi: string) => language === "vi" ? vi : en;

  return (
    <div className="bg-[#1A1F2C] rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">
        {getText("General Settings", "Cài đặt chung")}
      </h2>
      
      <div className="space-y-6">
        {/* Dark Mode */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">
                {getText("Dark Mode", "Chế độ tối")}
              </Label>
              <p className="text-sm text-gray-400">
                {getText(
                  "Enable dark mode for a better viewing experience in low light conditions",
                  "Bật chế độ tối để có trải nghiệm xem tốt hơn trong điều kiện ánh sáng yếu"
                )}
              </p>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={onDarkModeChange}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label className="text-base font-medium">
            {getText("Language", "Ngôn ngữ")}
          </Label>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full bg-[#2A2F3C] border-[#3A3F4C]">
              <SelectValue placeholder={getText("Select language", "Chọn ngôn ngữ")} />
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
              {getText("Notification Sound", "Âm thanh thông báo")}
            </Label>
            <p className="text-sm text-gray-400">
              {getText(
                "Play sound when notifications arrive",
                "Phát âm thanh khi có thông báo"
              )}
            </p>
          </div>
          <Switch
            checked={soundEnabled}
            onCheckedChange={onSoundChange}
            className="data-[state=checked]:bg-blue-500"
          />
        </div>

        {/* Vibration */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">
              {getText("Notification Vibration", "Rung thông báo")}
            </Label>
            <p className="text-sm text-gray-400">
              {getText(
                "Vibrate when notifications arrive",
                "Rung khi có thông báo"
              )}
            </p>
          </div>
          <Switch
            checked={vibrationEnabled}
            onCheckedChange={onVibrationChange}
            className="data-[state=checked]:bg-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
