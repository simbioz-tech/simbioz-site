import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({ 
  title = "Симбиоз — Полный цикл IT-решений для роста вашего бизнеса",
  description = "Профессиональная разработка веб-приложений, мобильных приложений, машинное обучение и IT-консалтинг. Полный цикл разработки от идеи до запуска.",
  keywords = "backend, машинное обучение, ML, разработка, команда, симбиоз, программирование, веб-разработка, мобильные приложения",
  ogTitle,
  ogDescription,
  canonical = "https://simbioz-tech.ru"
}) => {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph теги */}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:url" content={canonical} />
      
      {/* Twitter Card теги */}
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
};

export default SEOHelmet;