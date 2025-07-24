import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const Section = styled.section`
  padding: 64px 0 48px 0;
  background: ${({ theme }) => theme.card};
`;
const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 24px;
  text-align: center;
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 18px;
    justify-items: center;
    align-items: stretch;
    grid-auto-rows: 1fr;
  }
`;
const Card = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.08);
  padding: 24px 18px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 320px;
  max-width: 340px;
  box-sizing: border-box;
  overflow: hidden;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s, transform 0.25s cubic-bezier(.4,0,.2,1);
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: 0 20px 60px 0 rgba(58,123,213,0.38), 0 2px 24px 0 rgba(30,42,120,0.18);
    transform: translateY(-10px);
    border-color: #3a7bd5;
    z-index: 2;
  }
  &:hover::after {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 22px;
    pointer-events: none;
    box-shadow: 0 0 36px 10px #3a7bd5aa;
    opacity: 0.5;
    transition: opacity 0.3s;
    z-index: 1;
  }
  @media (max-width: 700px) {
    padding: 18px 10px;
    border-radius: 10px;
    font-size: 0.98rem;
    min-width: 90vw;
    max-width: 95vw;
    margin: 0 auto;
  }
`;
const CardContent = styled.div`
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #3a7bd5;
  margin-bottom: 8px;
  transition: color 0.3s;
  ${Card}:hover & {
    color: #1e2a78;
    text-shadow: 0 2px 16px #3a7bd5aa;
  }
`;
const Feature = styled.li`
  margin-bottom: 6px;
  color: #7a88c9;
`;
const Button = styled.a`
  display: inline-block;
  padding: 10px 18px;
  border-radius: 28px;
  background: linear-gradient(45deg, #3a7bd5, #1e2a78, #3a7bd5);
  background-size: 200% 100%;
  animation: gradientShift 5s ease infinite;
  color: #fff;
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  border: none;
  transition: background 0.3s, box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.13);
  letter-spacing: 0.02em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    background-position: 100% 0;
    box-shadow: 0 8px 32px 0 rgba(58, 123, 213, 0.5);
    transform: translateY(-2px) scale(1.05);
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }
  &:hover::before {
    left: 100%;
  }
  @media (max-width: 700px) {
    padding: 12px 0;
    font-size: 0.98rem;
    border-radius: 12px;
    text-align: center;
    /* hover уже обработан выше */
  }
`;
const TabsWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;
const TabBtn = styled.button`
  padding: 7px 16px;
  border-radius: 24px;
  border: none;
  background: ${({ active, theme }) => active ? (theme.background === '#0a0a23' ? '#23234a' : '#fff') : 'transparent'};
  color: ${({ active, theme }) => active ? (theme.background === '#0a0a23' ? '#fff' : '#23234a') : theme.text};
  font-weight: 600;
  font-size: 1.08rem;
  box-shadow: ${({ active }) => active ? '0 2px 12px 0 rgba(30,42,120,0.08)' : 'none'};
  border: ${({ active, theme }) => active ? '2px solid #3a7bd5' : '2px solid transparent'};
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border 0.18s;
  &:hover {
    background: ${({ theme }) => theme.background === '#0a0a23' ? '#23234a' : '#e3e8fa'};
    color: ${({ theme }) => theme.background === '#0a0a23' ? '#b3c0f7' : '#1e2a78'};
  }
`;

const prices = [
  // Frontend и клиентская логика
  {
    section: 'Frontend и клиентская логика',
    title: 'Базовый',
    price: 'от 12 000₽',
    subtitle: 'Лендинг или простое приложение',
    features: [
      'Адаптивная верстка',
      'Базовая интеграция',
      'SEO-оптимизация',
    ],
    popular: false,
  },
  {
    section: 'Frontend и клиентская логика',
    title: 'Стандарт',
    price: 'от 19 000₽',
    subtitle: 'Корпоративный сайт или SPA',
    features: [
      'Современный дизайн',
      'Интеграция с backend/API',
      'Форма обратной связи',
      'Базовая анимация',
    ],
    popular: true,
  },
  {
    section: 'Frontend и клиентская логика',
    title: 'Премиум',
    price: 'от 29 000₽',
    subtitle: 'Сложные интерфейсы, кастомные решения',
    features: [
      'Индивидуальный UI/UX',
      'Интерактивные элементы',
      'Интеграция с внешними сервисами',
      'Тестирование и поддержка',
    ],
    popular: false,
  },
  // Backend и архитектура
  {
    section: 'Backend и архитектура',
    title: 'Базовый',
    price: 'от 15 000₽',
    subtitle: 'Простой API или микросервис',
    features: [
      'REST API',
      'База данных',
      'Документация',
    ],
    popular: false,
  },
  {
    section: 'Backend и архитектура',
    title: 'Стандарт',
    price: 'от 24 000₽',
    subtitle: 'Корпоративный backend',
    features: [
      'Проектирование архитектуры',
      'Интеграция с внешними сервисами',
      'Авторизация и безопасность',
      'Тестирование',
    ],
    popular: true,
  },
  {
    section: 'Backend и архитектура',
    title: 'Премиум',
    price: 'от 39 000₽',
    subtitle: 'Высоконагруженные системы',
    features: [
      'Микросервисная архитектура',
      'Масштабируемость',
      'Мониторинг и логирование',
      'Поддержка SLA',
    ],
    popular: false,
  },
  // DevOps и инфраструктура
  {
    section: 'DevOps и инфраструктура',
    title: 'Базовый',
    price: 'от 7 000₽',
    subtitle: 'Автоматизация деплоя',
    features: [
      'Настройка CI/CD',
      'Docker Compose',
      'Документация',
    ],
    popular: false,
  },
  {
    section: 'DevOps и инфраструктура',
    title: 'Стандарт',
    price: 'от 12 000₽',
    subtitle: 'Контейнеризация и мониторинг',
    features: [
      'Docker/Kubernetes',
      'Мониторинг и алерты',
      'Резервное копирование',
      'Обновление без простоя',
    ],
    popular: true,
  },
  {
    section: 'DevOps и инфраструктура',
    title: 'Премиум',
    price: 'от 19 000₽',
    subtitle: 'Инфраструктура под ключ',
    features: [
      'Инфраструктура как код',
      'Высокая отказоустойчивость',
      'Секрет-менеджмент',
      'Поддержка 24/7',
    ],
    popular: false,
  },
  // Машинное обучение и автоматизация
  {
    section: 'Машинное обучение и автоматизация',
    title: 'Базовый',
    price: 'от 15 000₽',
    subtitle: 'Простая аналитика или ML-модель',
    features: [
      'Анализ данных',
      'Обучение базовой модели',
      'Визуализация результатов',
    ],
    popular: false,
  },
  {
    section: 'Машинное обучение и автоматизация',
    title: 'Стандарт',
    price: 'от 29 000₽',
    subtitle: 'Внедрение ML/AI, чат-бот',
    features: [
      'Обработка и подготовка данных',
      'Интеграция ML в бизнес-процесс',
      'Разработка Telegram-бота',
      'Документация',
    ],
    popular: true,
  },
  {
    section: 'Машинное обучение и автоматизация',
    title: 'Премиум',
    price: 'от 49 000₽',
    subtitle: 'Комплексная автоматизация',
    features: [
      'Сложные ML-модели',
      'Автоматизация бизнес-процессов',
      'Интеграция с внешними сервисами',
      'Поддержка и развитие',
    ],
    popular: false,
  },
  // Интеграции и поддержка
  {
    section: 'Интеграции и поддержка',
    title: 'Базовый',
    price: 'от 5 000₽',
    subtitle: 'Интеграция с одним сервисом',
    features: [
      'Интеграция с API/CRM',
      'Настройка webhooks',
      'Базовая поддержка',
    ],
    popular: false,
  },
  {
    section: 'Интеграции и поддержка',
    title: 'Стандарт',
    price: 'от 9 000₽',
    subtitle: 'Комплексная интеграция',
    features: [
      'Интеграция с несколькими сервисами',
      'Автоматизация обмена',
      'Техническая поддержка',
      'Реакция на инциденты',
    ],
    popular: true,
  },
  {
    section: 'Интеграции и поддержка',
    title: 'Премиум',
    price: 'от 15 000₽',
    subtitle: 'Поддержка и развитие',
    features: [
      'Мониторинг интеграций',
      'Экстренная поддержка',
      'Развитие решений',
      'Отчётность',
    ],
    popular: false,
  },
  // Аудит и консалтинг
  {
    section: 'Аудит и консалтинг',
    title: 'Базовый',
    price: 'от 3 000₽',
    subtitle: 'Быстрый аудит',
    features: [
      'Анализ архитектуры',
      'Краткий отчёт',
      'Рекомендации',
    ],
    popular: false,
  },
  {
    section: 'Аудит и консалтинг',
    title: 'Стандарт',
    price: 'от 7 000₽',
    subtitle: 'Код-ревью и аудит',
    features: [
      'Код-ревью',
      'Детальный отчёт',
      'Оптимизация',
      'Помощь в выборе технологий',
    ],
    popular: true,
  },
  {
    section: 'Аудит и консалтинг',
    title: 'Премиум',
    price: 'от 12 000₽',
    subtitle: 'Комплексный консалтинг',
    features: [
      'Аудит архитектуры и процессов',
      'Технологический консалтинг',
      'Сопровождение внедрения',
      'Обучение команды',
    ],
    popular: false,
  },
];

const getSections = (prices) => {
  const set = new Set();
  prices.forEach(p => set.add(p.section));
  return Array.from(set);
};

const Prices = () => {
  const [active, setActive] = useState(prices[0].section);
  const sections = getSections(prices);
  const controls = useRef(prices.map(() => useAnimation())).current;
  const refs = useRef(prices.map(() => useRef(null))).current;

  useEffect(() => {
    const observers = refs.map((ref, index) => {
      const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              controls[index].start({ opacity: 1, y: 0 });
              observer.unobserve(ref.current); // Stop observing once animated
            }
          },
          { threshold: 0.2 }
      );

      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, [controls, refs, active]);

  // Reset animations when switching tabs
  useEffect(() => {
    controls.forEach(control => control.set({ opacity: 0, y: 30 }));
  }, [active, controls]);

  return (
      <Section>
        <Container>
          <Title>Тарифы и цены</Title>
          <TabsWrap>
            {sections.map(section => (
                <TabBtn
                    key={section}
                    active={active === section}
                    onClick={() => setActive(section)}
                >
                  {section}
                </TabBtn>
            ))}
          </TabsWrap>
          <CardGrid>
            {prices.filter(p => p.section === active).map((p, i) => (
                <Card
                    key={p.title}
                    ref={refs[prices.findIndex(price => price.title === p.title)]}
                    style={p.popular ? { border: '2.5px solid #3a7bd5', boxShadow: '0 8px 32px 0 rgba(30,42,120,0.13)' } : {}}
                >
                  <CardContent>
                    <div style={{ fontWeight: 700, color: '#7a88c9', marginBottom: 4, fontSize: '1.02rem' }}>{p.section}</div>
                    <h3 style={{ marginBottom: 8 }}>{p.title}</h3>
                    <Price>{p.price}</Price>
                    {p.subtitle && <div style={{ color: '#b3b3b3', fontSize: '1.08rem', marginBottom: 18 }}>{p.subtitle}</div>}
                    <ul style={{ paddingLeft: 18, marginBottom: 12, marginTop: p.subtitle ? 0 : 18 }}>
                      {p.features.map(f => <Feature key={f}>{f}</Feature>)}
                    </ul>
                  </CardContent>
                  <Button href="#contact" style={{ marginTop: 'auto', width: '100%', boxSizing: 'border-box' }}>
                    {p.section === 'Поддержка и сопровождение' ? 'Заказать' : 'Обсудить проект'}
                  </Button>
                </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>
  );
};

export default Prices;