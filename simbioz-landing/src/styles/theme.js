import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  background: '#0a0a23',
  card: '#181836',
  text: '#f5f6fa',
  accent: '#1e2a78',
  accent2: '#2e3a8c',
  border: '#23234a',
  button: '#1e2a78',
  buttonText: '#fff',
  techBg: 'rgba(200,210,255,0.10)',
  techText: 'rgba(180, 192, 247, 0.55)',
};
export const lightTheme = {
  background: '#f5f6fa',
  card: '#fff',
  text: '#181836',
  accent: '#2e3a8c',
  accent2: '#1e2a78',
  border: '#e0e0e0',
  button: '#2e3a8c',
  buttonText: '#fff',
  techBg: 'rgba(30,42,120,0.07)',
  techText: 'rgba(30,42,120,0.45)',
};

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
    transition: background 0.4s cubic-bezier(.4,0,.2,1), color 0s;
  }
  *, *::before, *::after {
    transition: background 0.4s cubic-bezier(.4,0,.2,1), color 0s, border-color 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1);
  }
`;

export default GlobalStyle; 