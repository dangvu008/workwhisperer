
import React, { useState } from 'react';
import { DayDetails } from '../types';
import { AttendanceStatus } from '@/types/attendance';
import { dateUtils } from '../utils/dateUtils';

interface WeeklyStatusGridProps {
  week: DayDetails[];
  onStatusUpdate: (date: Date, status: AttendanceStatus) => void;
}

const statusOptions: { status: AttendanceStatus; label: string; color: string }[] = [
  { status: 'warning', label: 'Thiếu chấm công', color: '#ff9800' },
  { status: 'complete', label: 'Đủ công', color: '#4caf50' },
  { status: 'pending', label: 'Chưa cập nhật', color: '#9e9e9e' },
  { status: 'leave', label: 'Nghỉ phép', color: '#2196f3' },
  { status: 'sick', label: 'Nghỉ bệnh', color: '#f44336' },
  { status: 'holiday', label: 'Nghỉ lễ', color: '#9c27b0' },
  { status: 'absent', label: 'Vắng không lý do', color: '#d32f2f' },
  { status: 'late', label: 'Vào muộn/ra sớm', color: '#ff5722' },
];

const weekDayShort = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const WeeklyStatusGrid: React.FC<WeeklyStatusGridProps> = ({ week, onStatusUpdate }) => {
  const [selectedDay, setSelectedDay] = useState<DayDetails | null>(null);

  const handleDayClick = (day: DayDetails) => {
    setSelectedDay(day);
  };

  const handleStatusChange = (day: DayDetails, newStatus: AttendanceStatus) => {
    onStatusUpdate(day.date, newStatus);
    setSelectedDay(null);
  };

  return (
    <div className="weekly-status-grid">
      <div className="grid grid-cols-7 gap-2">
        {weekDayShort.map((day, index) => (
          <div key={day} className="text-center font-bold p-2">
            {day}
          </div>
        ))}
        
        {week.map((day, index) => {
          const isToday = dateUtils.isSameDay(new Date(), day.date);
          const isFuture = day.date > new Date();
          
          return (
            <div
              key={index}
              className={`relative p-4 border rounded cursor-pointer hover:bg-gray-100
                ${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}
                ${dateUtils.isDateInCurrentWeek(day.date) ? 'bg-gray-50' : ''}
              `}
              onClick={() => !isFuture && handleDayClick(day)}
            >
              <div className="text-sm">{day.date.getDate()}</div>
              <div className="text-xl">
                {isFuture ? 'pending' : day.status}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">
              {selectedDay.date.toLocaleDateString()}
            </h3>
            
            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.status}
                  className="p-2 border rounded hover:bg-gray-100"
                  style={{ color: option.color }}
                  onClick={() => handleStatusChange(selectedDay, option.status)}
                >
                  <span className="text-xl">{option.status}</span>
                  <span className="text-sm block">{option.label}</span>
                </button>
              ))}
            </div>

            {selectedDay.checkIn && (
              <div className="mt-4">
                <p>Check-in: {selectedDay.checkIn}</p>
                <p>Check-out: {selectedDay.checkOut}</p>
                {selectedDay.reason && <p>Lý do: {selectedDay.reason}</p>}
              </div>
            )}

            <button
              className="mt-4 w-full bg-gray-200 p-2 rounded"
              onClick={() => setSelectedDay(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
