import { DayDetails, DayStatus } from '../types';

const STORAGE_KEY = 'attendance_data';

export const attendanceService = {
  // Lấy dữ liệu từ localStorage
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

  // Lưu dữ liệu vào localStorage
  saveWeekData(data: DayDetails[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Khởi tạo dữ liệu cho tuần hiện tại
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
          status: '❓' as DayStatus,
        };
      });

    this.saveWeekData(week);
    return week;
  },

  // Cập nhật trạng thái cho một ngày
  updateDayStatus(date: Date, status: DayStatus): DayDetails[] {
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