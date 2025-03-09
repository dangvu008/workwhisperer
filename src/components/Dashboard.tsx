import React, { useState, useEffect } from 'react';
import { WeeklyStatusGrid } from './WeeklyStatusGrid';
import { WorkNotes } from './WorkNotes';
import { DayStatus, DayDetails, WorkNote } from '../types';
import { attendanceService } from '../services/attendanceService';

export const Dashboard: React.FC = () => {
  const [weekData, setWeekData] = useState<DayDetails[]>([]);
  const [notes, setNotes] = useState<WorkNote[]>([]);

  useEffect(() => {
    // Tải dữ liệu khi component được mount
    const storedData = attendanceService.getWeekData();
    if (storedData.length > 0) {
      setWeekData(storedData);
    } else {
      const initialData = attendanceService.initializeWeekData();
      setWeekData(initialData);
    }
  }, []);

  const handleStatusUpdate = (date: Date, status: DayStatus) => {
    const updatedData = attendanceService.updateDayStatus(date, status);
    setWeekData(updatedData);
  };

  // ... rest of the component code
};