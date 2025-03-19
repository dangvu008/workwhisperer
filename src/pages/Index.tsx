
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, BarChart2 } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';
import styled from 'styled-components';
import { Container, Card, Title, Text, FlexContainer, Label } from '../components/common/CommonComponents';
import { TimeDisplay } from '../components/TimeDisplay';
import { ShiftStatus } from '../components/ShiftStatus';
import { WeeklySchedule } from '../components/WeeklySchedule';
import { WorkNotes } from '../components/WorkNotes';
import { useState } from 'react';
import { WorkNote } from '../types';

// Styled Components for additional elements
const StyledTimeDisplay = styled(Text)`
  font-family: monospace;
  font-size: 1.1em;
  color: ${({ theme }) => theme.textSecondary};
`;

const UserInfo = styled(Card)`
  background-color: ${({ theme }) => theme.cardBackground};
  margin-top: 20px;
`;

const StatsContainer = styled(FlexContainer)`
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const StatCard = styled(Card)`
  flex: 1;
  min-width: 200px;
  text-align: center;
  background-color: ${({ theme }) => theme.cardBackground};
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  margin: 10px 0;
`;

const StatLabel = styled(Label)`
  font-size: 14px;
  margin-bottom: 5px;
`;

const NavigationLink = styled.a`
  padding: 10px 15px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.primary};
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
    text-decoration: none;
  }
`;

const HomeContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const AppTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  background: linear-gradient(to right, #8B5CF6, #6366F1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const HeaderButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 0.5rem;
  border-radius: 0.375rem;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useSettings();
  const { t, currentLanguage } = useLanguage();
  
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
          <AppTitle>{currentLanguage === "vi" ? "Time Manager" : "Time Manager"}</AppTitle>
          <HeaderControls>
            <HeaderButton onClick={() => navigate('/settings')}>
              <SettingsIcon className="w-5 h-5" />
            </HeaderButton>
            <HeaderButton>
              <BarChart2 className="w-5 h-5" />
            </HeaderButton>
          </HeaderControls>
        </AppHeader>

        <TimeDisplay />
        
        <ShiftStatus />
        
        <WeeklySchedule />
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">
              {currentLanguage === "vi" ? "Ghi chú" : "Notes"}
            </h2>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              onClick={() => {
                // Handle add note button click
              }}
            >
              <span className="text-sm">
                {currentLanguage === "vi" ? "Thêm ghi chú" : "Add Note"}
              </span>
            </button>
          </div>
          
          {notes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {currentLanguage === "vi" ? "Chưa có ghi chú nào" : "No notes yet"}
            </div>
          ) : (
            <WorkNotes
              notes={notes}
              onAddNote={handleAddNote}
              onEditNote={handleEditNote}
              onDeleteNote={handleDeleteNote}
            />
          )}
        </div>
      </HomeContainer>
    </div>
  );
};

export default Index;
