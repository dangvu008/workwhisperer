
import { AttendanceStatus } from './attendance';

export interface DayDetails {
  date: Date;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  reason?: string;
}

export interface WorkNote {
  id: string;
  date: Date;
  content: string;
  important: boolean;
  title: string;
  reminderTime: Date;
  weekDays: number[]; // 1-7 representing Monday-Sunday
}
