
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, BarChart2 } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { TimeDisplay } from '../components/TimeDisplay';
import { ShiftStatus } from '../components/ShiftStatus';
import { WeeklySchedule } from '../components/WeeklySchedule';
import { WorkNotes } from '../components/WorkNotes';
import { WorkNote } from '../types';
import { Card } from '@/components/ui/card';

const HomeContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div
    ref={ref}
    className="max-w-600 mx-auto p-6" 
    {...props}
  />
));

HomeContainer.displayName = "HomeContainer";

const AppHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <header className="flex justify-between items-center mb-6">
    {children}
  </header>
);

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useSettings();
  const { currentLanguage } = useLanguage();
  
  // State for work notes
  const [notes, setNotes] = useState<WorkNote[]>([]);

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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-b from-[#0A0F1C] to-[#1A1F2C] text-white'
          : 'bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] text-gray-800'
      }`}
    >
      <HomeContainer>
        <AppHeader>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            {currentLanguage === "vi" ? "Time Manager" : "Time Manager"}
          </h1>
          <div className="flex gap-3">
            <button
              className={`transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => navigate('/settings')}
            >
              <SettingsIcon className="w-5 h-5" />
            </button>
            <button
              className={`transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
            </button>
          </div>
        </AppHeader>

        <TimeDisplay />
        
        <ShiftStatus />
        
        <WeeklySchedule />
        
        <Card className="mt-6 p-4 bg-card/30 border-muted">
          <WorkNotes
            notes={notes}
            onAddNote={handleAddNote}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
          />
        </Card>
      </HomeContainer>
    </div>
  );
};

export default Index;
