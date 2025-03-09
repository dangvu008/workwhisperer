export type DayStatus = '❗' | '✅' | '❓' | '📩' | '🛌' | '🎌' | '❌' | 'RV' | '--';

export interface DayDetails {
  date: Date;
  status: DayStatus;
  checkIn?: string;
  checkOut?: string;
  reason?: string;
}

export interface WorkNote {
  id: string;
  title: string;
  content: string;
  reminderTime: Date;
  weekDays: number[]; // 1-7 representing Monday-Sunday
}