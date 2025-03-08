
export type AttendanceStatus = 
  | "warning"  // ❗ Đi làm nhưng thiếu chấm công
  | "complete" // ✅ Đủ công
  | "pending"  // ❓ Chưa cập nhật
  | "leave"    // 📩 Nghỉ phép 
  | "sick"     // 🛌 Nghỉ bệnh
  | "holiday"  // 🎌 Nghỉ lễ
  | "absent"   // ❌ Vắng không lý do
  | "late";    // 🕒 RV vào muộn hoặc ra sớm

export interface DayStatus {
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  reason?: string;
}

export interface StatusEmoji {
  en: string;
  vi: string;
  abbr: string;
}

export type StatusEmojiMap = Record<AttendanceStatus, StatusEmoji>;
