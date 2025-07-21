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
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s;
  min-width: 0;
  @media (max-width: 700px) {
    padding: 16px 8px;
    border-radius: 10px;
    font-size: 0.98rem;
    width: 340px;
    max-width: 90vw;
    min-width: 240px;
    margin: 0 auto;
    min-height: 420px;
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
`;
const Feature = styled.li`
  margin-bottom: 6px;
  color: #7a88c9;
`;
const Button = styled.a`
  display: inline-block;
  padding: 10px 18px;
  border-radius: 28px;
  background: linear-gradient(90deg, #3a7bd5 0%, #1e2a78 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  border: none;
  transition: background 0.22s, color 0.22s, box-shadow 0.18s, transform 0.18s;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.13);
  letter-spacing: 0.02em;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, #1e2a78 0%, #3a7bd5 100%);
    color: #fff;
    box-shadow: 0 8px 32px 0 rgba(30,42,120,0.18);
    transform: translateY(-2px) scale(1.04);
  }
  @media (max-width: 700px) {
    padding: 12px 0;
    font-size: 0.98rem;
    border-radius: 12px;
    text-align: center;
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
    color: ${({ theme }) => theme.accent};
  }
`;

const prices = [
  // Backend-разработка
  {
    section: 'Backend-разработка',
    title: 'Backend на Java',
    price: 'от 90 000₽',
    subtitle: 'Микросервисы, REST/gRPC API, интеграции',
    features: [
      'Проектирование архитектуры',
      'Разработка микросервисов',
      'Интеграция с внешними сервисами',
      'Отказоустойчивые системы',
      'Документация и тестирование',
    ],
    popular: true,
  },
  {
    section: 'Backend-разработка',
    title: 'API для мобильных/веб-приложений',
    price: 'от 70 000₽',
    subtitle: 'Быстрые и безопасные API',
    features: [
      'Разработка REST/gRPC API',
      'Авторизация и безопасность',
      'Интеграция с внешними сервисами',
      'Документация (Swagger/OpenAPI)',
    ],
    popular: false,
  },
  {
    section: 'Backend-разработка',
    title: 'Миграция и оптимизация',
    price: 'от 60 000₽',
    subtitle: 'Перенос и ускорение систем',
    features: [
      'Миграция старых решений',
      'Оптимизация производительности',
      'Рефакторинг кода',
      'Снижение затрат на инфраструктуру',
    ],
    popular: false,
  },
  // ML/AI решения
  {
    section: 'ML/AI решения',
    title: 'Машинное обучение под задачу',
    price: 'от 120 000₽',
    subtitle: 'Классификация, регрессия, подбор моделей',
    features: [
      'Анализ и подготовка данных',
      'Обучение и внедрение моделей',
      'Визуализация результатов',
      'Интеграция в бизнес-процессы',
    ],
    popular: true,
  },
  {
    section: 'ML/AI решения',
    title: 'NLP и обработка текста',
    price: 'от 100 000₽',
    subtitle: 'Чат-боты, анализ тональности, генерация текстов',
    features: [
      'Чат-боты и ассистенты',
      'Анализ тональности',
      'Генерация и поиск по тексту',
      'Извлечение сущностей',
    ],
    popular: false,
  },
  {
    section: 'ML/AI решения',
    title: 'Компьютерное зрение',
    price: 'от 130 000₽',
    subtitle: 'Распознавание изображений и видео',
    features: [
      'Детекция и классификация объектов',
      'OCR (распознавание текста)',
      'Видеоаналитика',
      'Внедрение в бизнес-процессы',
    ],
    popular: false,
  },
  // Интеграция сервисов
  {
    section: 'Интеграция сервисов',
    title: 'Интеграция с платёжными системами',
    price: 'от 60 000₽',
    subtitle: 'Stripe, ЮKassa, PayPal, банковские API',
    features: [
      'Интеграция с платёжными шлюзами',
      'Настройка webhooks',
      'Безопасность платежей',
    ],
    popular: true,
  },
  {
    section: 'Интеграция сервисов',
    title: 'Интеграция с корпоративными платформами',
    price: 'от 70 000₽',
    subtitle: '1С, Bitrix24, amoCRM, SAP, ERP',
    features: [
      'Интеграция с CRM/ERP',
      'Синхронизация данных',
      'Автоматизация обмена',
    ],
    popular: false,
  },
  {
    section: 'Интеграция сервисов',
    title: 'Интеграция с внешними API',
    price: 'от 50 000₽',
    subtitle: 'Соцсети, карты, email/SMS, облака',
    features: [
      'Интеграция с соцсетями',
      'Email/SMS сервисы',
      'Облачные платформы',
    ],
    popular: false,
  },
  // DevOps и CI/CD
  {
    section: 'DevOps и CI/CD',
    title: 'Внедрение CI/CD',
    price: 'от 50 000₽',
    subtitle: 'GitHub Actions, GitLab CI, автоматизация деплоя',
    features: [
      'Автоматизация сборки и деплоя',
      'GitHub Actions, GitLab CI',
      'Документация по процессу',
    ],
    popular: true,
  },
  {
    section: 'DevOps и CI/CD',
    title: 'Контейнеризация и оркестрация',
    price: 'от 60 000₽',
    subtitle: 'Docker, Kubernetes, настройка кластеров',
    features: [
      'Docker, Docker Compose',
      'Kubernetes, настройка кластеров',
      'Мониторинг контейнеров',
    ],
    popular: false,
  },
  {
    section: 'DevOps и CI/CD',
    title: 'Мониторинг и алерты',
    price: 'от 40 000₽',
    subtitle: 'Prometheus, Grafana, логирование',
    features: [
      'Настройка мониторинга',
      'Оповещения и алерты',
      'Логирование и аудит',
    ],
    popular: false,
  },
  // Консалтинг и аудит
  {
    section: 'Консалтинг и аудит',
    title: 'Аудит архитектуры',
    price: 'от 30 000₽',
    subtitle: 'Анализ текущих решений, рекомендации',
    features: [
      'Анализ архитектуры',
      'Рекомендации по улучшению',
      'Отчёт и презентация',
    ],
    popular: true,
  },
  {
    section: 'Консалтинг и аудит',
    title: 'Техническое интервью',
    price: 'от 15 000₽',
    subtitle: 'Оценка кандидатов, помощь в найме',
    features: [
      'Проведение интервью',
      'Оценка технических навыков',
      'Рекомендации по найму',
    ],
    popular: false,
  },
  {
    section: 'Консалтинг и аудит',
    title: 'Подбор технологий',
    price: 'от 20 000₽',
    subtitle: 'Выбор стеков, оптимизация затрат',
    features: [
      'Сравнение решений',
      'Оптимизация расходов',
      'Выбор технологий под задачу',
    ],
    popular: false,
  },
  // Поддержка и сопровождение
  {
    section: 'Поддержка и сопровождение',
    title: 'Базовый',
    price: '15 000₽/мес',
    subtitle: 'Минимальное обслуживание',
    features: [
      'Контент-обновления',
      'Техническая поддержка',
      'Резервные копии',
    ],
    popular: false,
  },
  {
    section: 'Поддержка и сопровождение',
    title: 'Стандарт',
    price: '25 000₽/мес',
    subtitle: 'Комплексное обслуживание',
    features: [
      'Все из Базового',
      'Мониторинг uptime',
      'Оптимизация скорости',
    ],
    popular: true,
  },
  {
    section: 'Поддержка и сопровождение',
    title: 'Премиум',
    price: '35 000₽/мес',
    subtitle: 'Полное сопровождение',
    features: [
      'Все из Стандарта',
      'Экстренная поддержка 24/7',
      'Защита от DDoS',
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
                    animate={controls[prices.findIndex(price => price.title === p.title)]}
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 }}
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