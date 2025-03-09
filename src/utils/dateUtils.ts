export const dateUtils = {
    isSameDay(date1: Date, date2: Date): boolean {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    },
  
    getStartOfWeek(date: Date): Date {
      const monday = new Date(date);
      monday.setDate(date.getDate() - date.getDay() + 1);
      monday.setHours(0, 0, 0, 0);
      return monday;
    },
  
    isDateInCurrentWeek(date: Date): boolean {
      const today = new Date();
      const startOfCurrentWeek = this.getStartOfWeek(today);
      const startOfDateWeek = this.getStartOfWeek(date);
      return this.isSameDay(startOfCurrentWeek, startOfDateWeek);
    }
  };