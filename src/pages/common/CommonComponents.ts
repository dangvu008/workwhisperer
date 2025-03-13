
import styled from 'styled-components';
import { ThemeType } from '../../styles/theme';

export const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  min-height: 100vh;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const Input = styled.input`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  padding: 8px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.divider};
  margin: 20px 0;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.textSecondary};
  display: block;
  margin-bottom: 8px;
`;
