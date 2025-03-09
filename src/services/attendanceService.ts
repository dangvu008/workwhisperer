
import { AttendanceStatus } from '@/types/attendance';
import { DayDetails, WorkNote } from '@/types/index';

const STORAGE_KEY = 'attendance_data';

export const attendanceService = {
  // Get data from localStorage
  getWeekData(): DayDetails[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Convert string dates back to Date objects
      return data.map((day: any) => ({
        ...day,
        date: new Date(day.date)
      }));
    }
    return [];
  },

  // Save data to localStorage
  saveWeekData(data: DayDetails[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Initialize data for current week
  initializeWeekData(): DayDetails[] {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    
    const week: DayDetails[] = Array(7)
      .fill(null)
      .map((_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);
        return {
          date,
          status: "pending" as AttendanceStatus,
        };
      });

    this.saveWeekData(week);
    return week;
  },

  // Update status for a day
  updateDayStatus(date: Date, status: AttendanceStatus): DayDetails[] {
    const weekData = this.getWeekData();
    const updatedData = weekData.map(day => 
      day.date.toDateString() === date.toDateString()
        ? { ...day, status }
        : day
    );
    this.saveWeekData(updatedData);
    return updatedData;
  }
};
