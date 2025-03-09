
import React, { useState, useEffect } from 'react';
import { WeeklyStatusGrid } from './WeeklyStatusGrid';
import { WorkNotes } from './WorkNotes';
import { AttendanceStatus } from '@/types/attendance';
import { DayDetails, WorkNote } from '@/types/index';
import { attendanceService } from '../services/attendanceService';

export const Dashboard: React.FC = () => {
  const [weekData, setWeekData] = useState<DayDetails[]>([]);
  const [notes, setNotes] = useState<WorkNote[]>([]);

  useEffect(() => {
    // Load data when component mounts
    const storedData = attendanceService.getWeekData();
    if (storedData.length > 0) {
      setWeekData(storedData);
    } else {
      const initialData = attendanceService.initializeWeekData();
      setWeekData(initialData);
    }
  }, []);

  const handleStatusUpdate = (date: Date, status: AttendanceStatus) => {
    const updatedData = attendanceService.updateDayStatus(date, status);
    setWeekData(updatedData);
  };

  const handleAddNote = (note: Omit<WorkNote, 'id'>) => {
    const newNote: WorkNote = {
      ...note,
      id: crypto.randomUUID(),
    };
    setNotes([...notes, newNote]);
  };

  const handleEditNote = (updatedNote: WorkNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Attendance Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyStatusGrid 
            week={weekData} 
            onStatusUpdate={handleStatusUpdate} 
          />
        </div>
        <div>
          <WorkNotes 
            notes={notes}
            onAddNote={handleAddNote}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
