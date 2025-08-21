import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  background: '#0a0a0a',
  card: '#1a1a1a',
  text: '#ffffff',
  accent: '#00b4d8', // Бирюзовый
  accent2: '#e63946', // Красный
  border: '#333333',
  button: '#00b4d8',
  buttonText: '#fff',
  techBg: 'rgba(0, 180, 216, 0.1)',
  techText: 'rgba(0, 180, 216, 0.9)',
  gradient: 'linear-gradient(135deg, #00b4d8 0%, #e63946 100%)',
  gradientLight: 'linear-gradient(135deg, rgba(0, 180, 216, 0.1), rgba(230, 57, 70, 0.1))',
};

export const lightTheme = {
  background: '#ffffff',
  card: '#f8f9fa',
  text: '#1a1a1a',
  accent: '#00b4d8', // Бирюзовый
  accent2: '#e63946', // Красный
  border: '#e9ecef',
  button: '#00b4d8',
  buttonText: '#fff',
  techBg: 'rgba(0, 180, 216, 0.08)',
  techText: 'rgba(0, 180, 216, 0.9)',
  gradient: 'linear-gradient(135deg, #00b4d8 0%, #e63946 100%)',
  gradientLight: 'linear-gradient(135deg, rgba(0, 180, 216, 0.1), rgba(230, 57, 70, 0.1))',
};

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    max-width: 100vw;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    transition: background 0.2s ease, color 0.2s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    position: relative;
    overflow-x: hidden;
  }
  

  

  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
    line-height: 1.2;
  }
  
  p {
    margin: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  
  input, textarea, select {
    font-family: inherit;
    border: none;
    outline: none;
    background: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    visibility: hidden;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.accent};
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.accent2};
  }
  
  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.accent};
    color: white;
  }
  
  /* Focus styles */
  *:focus {
    outline: none;
  }
  
  /* Smooth transitions */
  .smooth-transition {
    transition: all 0.2s ease;
  }
  
  /* Glassmorphism */
  .glass {
    backdrop-filter: blur(8px);
    background: ${({ theme }) => 
      theme.background === '#ffffff' 
        ? 'rgba(255, 255, 255, 0.8)' 
        : 'rgba(26, 26, 26, 0.8)'
    };
  }
  
  /* Gradient text */
  .gradient-text {
    background: ${({ theme }) => theme.gradient};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  /* Gradient border */
  .gradient-border {
    border: 2px solid transparent;
    background: linear-gradient(${({ theme }) => theme.card}, ${({ theme }) => theme.card}) padding-box,
                ${({ theme }) => theme.gradient} border-box;
  }
`;

export default GlobalStyle; 