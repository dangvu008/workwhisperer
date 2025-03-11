
import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    background-color: ${({ theme }) => theme.primary};
    color: #FFFFFF;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      opacity: 0.9;
    }
  }

  input, textarea, select {
    background-color: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    padding: 8px;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
    }
  }

  // Add any other global styles you need
`;
