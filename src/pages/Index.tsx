
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, BarChart2 } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';
import styled from 'styled-components';
import {
  Container,
  Card,
  Title,
  Text,
  FlexContainer,
  Label,
} from '../components/common/CommonComponents';

// Styled Components
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

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useSettings();
  const { t } = useLanguage();

  const formatDateTime = (date: Date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

  const currentDate = new Date();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-b from-[#0A0F1C] to-[#1A1F2C] text-white'
          : 'bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] text-gray-800'
      }`}
    >
      <Container className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <Title className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('dashboard_title')}
          </Title>
          <div className="flex gap-3">
            <button
              className={`transition-colors duration-200 ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              className={`transition-colors duration-200 ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Card>
          <Label>System Information</Label>
          <StyledTimeDisplay>
            Current UTC Time: {formatDateTime(currentDate)}
          </StyledTimeDisplay>
          <Text>User: dangvu008</Text>
        </Card>

        <StatsContainer>
          <StatCard>
            <StatLabel>Active Sessions</StatLabel>
            <StatValue>1</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Theme Mode</StatLabel>
            <StatValue>{isDarkMode ? 'Dark' : 'Light'}</StatValue>
          </StatCard>
        </StatsContainer>

        <UserInfo>
          <Label>Quick Actions</Label>
          <FlexContainer>
            <NavigationLink href="/settings">Settings</NavigationLink>
          </FlexContainer>
        </UserInfo>
      </Container>
    </div>
  );
};

export default Index;
