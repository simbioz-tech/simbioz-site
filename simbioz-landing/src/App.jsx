import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { darkTheme, lightTheme } from './styles/theme';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Prices from './components/Prices';
import Process from './components/Process';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState('dark');
  const handleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Helmet>
        <title>Симбиоз — Полный цикл IT-решений для роста вашего бизнеса</title>
        <meta name="description" content="Симбиоз — команда инженеров, предоставляющая полный цикл цифровой трансформации и внедрения инновационных технологий. Создаём надёжные веб-сервисы, внедряем машинное обучение, разворачиваем Telegram-ботов и автоматизируем задачи." />
      </Helmet>
      <Routes>
        <Route path="/" element={
          <>
            <Header theme={theme} onToggleTheme={handleTheme} />
            <div id="hero"><Hero /></div>
            <Services />
            <Portfolio />
            <div id="prices"><Prices /></div>
            <Process />
            <div id="reviews"><Reviews /></div>
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
