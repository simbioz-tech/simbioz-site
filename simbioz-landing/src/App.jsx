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
        <title>Симбиоз — Полный цикл IT-решений для роста вашего бизнеса | Разработка, Автоматизация, ML/AI</title>
        <meta name="description" content="Симбиоз — команда опытных инженеров. Веб-разработка, автоматизация процессов, интеграции API, машинное обучение, DevOps. Индивидуальные решения для роста бизнеса. Студентам скидка 25%." />
        
        {/* Open Graph теги */}
        <meta property="og:title" content="Симбиоз — Полный цикл IT-решений для роста вашего бизнеса | Разработка, Автоматизация, ML/AI" />
        <meta property="og:description" content="Симбиоз — команда опытных инженеров. Веб-разработка, автоматизация процессов, интеграции API, машинное обучение, DevOps. Индивидуальные решения для роста бизнеса. Студентам скидка 25%." />
        <meta property="og:image" content="https://simbioz-tech.ru/og-image.png?v=3" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Симбиоз Tech - IT-решения для бизнеса" />
        <meta property="og:url" content="https://simbioz-tech.ru" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Симбиоз Tech" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:image:secure_url" content="https://simbioz-tech.ru/og-image.png?v=3" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:updated_time" content="2024-01-01T00:00:00+03:00" />
        
        {/* Twitter Card теги */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Симбиоз — Полный цикл IT-решений для роста вашего бизнеса | Разработка, Автоматизация, ML/AI" />
        <meta name="twitter:description" content="Симбиоз — команда опытных инженеров. Веб-разработка, автоматизация процессов, интеграции API, машинное обучение, DevOps. Индивидуальные решения для роста бизнеса. Студентам скидка 25%." />
        <meta name="twitter:image" content="https://simbioz-tech.ru/og-image.png?v=3" />
        <meta name="twitter:image:alt" content="Симбиоз Tech - IT-решения для бизнеса" />
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
