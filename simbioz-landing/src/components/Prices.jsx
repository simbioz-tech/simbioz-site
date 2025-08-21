import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { createPortal } from 'react-dom';

const Section = styled.section`
  padding: 100px 0 80px 0;
  background: ${({ theme }) => theme.background};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(0, 180, 216, 0.04) 0%, rgba(0, 180, 216, 0.04) 5%, rgba(0, 180, 216, 0.04) 10%, transparent 70%),
      radial-gradient(circle at 80% 80%, rgba(230, 57, 70, 0.04) 0%, rgba(230, 57, 70, 0.04) 5%, rgba(230, 57, 70, 0.04) 30%, transparent 70%);
    filter: blur(15px);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 30px;
  text-align: center;
  font-weight: 800;
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #00b4d8, #e63946);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 40px;
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 24px;
    justify-items: center;
    align-items: stretch;
    grid-auto-rows: 1fr;
  }
`;

const HitRibbon = styled.div`
  position: absolute;
  top: 14px;
  right: -32px;
  transform: rotate(45deg);
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  color: #fff;
  font-weight: 800;
  font-size: 0.98rem;
  padding: 10px 22px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 180, 216, 0.3);
  letter-spacing: 0.03em;
  z-index: 10;
  user-select: none;
  text-align: center;
  
  @media (max-width: 700px) {
    font-size: 0.75rem;
    padding: 8px 18px;
    border-radius: 8px;
    top: 22px;
    left: 54%;
    right: auto;
    transform: translateX(-50%) rotate(45deg);
  }
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 320px;
  max-width: 340px;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  // Glassmorphism эффект
  backdrop-filter: blur(8px);
  background: ${({ theme }) => 
    theme.background === '#ffffff' 
      ? 'rgba(248, 249, 250, 0.8)' 
      : 'rgba(26, 26, 26, 0.8)'
  };
  
  &.standard {
    transform: none;
    z-index: auto;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 180, 216, 0.2);
    border: 1px solid rgba(0, 180, 216, 0.3);
  }
  
  &:hover.standard {
    transform: translateY(-8px);
  }
  
  @media (max-width: 700px) {
    padding: 24px 20px;
    border-radius: 16px;
    font-size: 0.98rem;
    min-width: 90vw;
    max-width: 95vw;
    margin: 0 auto;
    transition: none !important;
    transform: none !important;
    pointer-events: auto;
    
    &.standard {
      transform: none !important;
      z-index: auto;
    }
    
    &:hover, &:active, &:focus, &:focus-visible, &:focus-within {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
      outline: none !important;
      background: inherit !important;
      transform: none !important;
      transition: none !important;
      z-index: auto !important;
    }
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
  color: #00b4d8;
  margin-bottom: 8px;
  transition: color 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Feature = styled.li`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  line-height: 1.5;
`;

const Button = styled.a`
  display: inline-block;
  padding: 14px 24px;
  border-radius: 24px;
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  border: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
  letter-spacing: 0.02em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 180, 216, 0.4);
  }
  
  @media (max-width: 700px) {
    padding: 12px 20px;
    font-size: 1rem;
    border-radius: 20px;
  }
`;

const TabsWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const TabBtn = styled.button`
  padding: 10px 20px;
  border-radius: 24px;
  border: 2px solid ${({ active }) => active ? '#00b4d8' : 'transparent'};
  background: ${({ active, theme }) => 
    active 
      ? 'linear-gradient(135deg, #00b4d8 0%, #e63946 100%)' 
      : theme.background === '#ffffff' 
        ? 'rgba(248, 249, 250, 0.8)' 
        : 'rgba(26, 26, 26, 0.8)'
  };
  color: ${({ active }) => active ? '#fff' : 'inherit'};
  font-weight: 600;
  font-size: 1rem;
  box-shadow: ${({ active }) => active ? '0 4px 12px rgba(0, 180, 216, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 180, 216, 0.2);
  }
`;

const StudentBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  color: #fff;
  border-radius: 16px;
  padding: 16px 24px;
  margin: 24px 0 16px 0;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 6px 24px rgba(0, 180, 216, 0.2);
  position: relative;
  
  @media (max-width: 900px) {
    flex-direction: column;
    font-size: 0.85rem;
    padding: 14px 20px;
    gap: 10px;
    text-align: center;
  }
`;

const StudentIcon = styled(FaGraduationCap)`
  font-size: 2rem;
  color: #fff;
`;

const StudentBtn = styled.button`
  margin-left: 24px;
  background: #fff;
  color: #00b4d8;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 180, 216, 0.2);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 180, 216, 0.3);
  }
  
  @media (max-width: 700px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
    padding: 10px 18px;
    font-size: 0.85rem;
  }
`;

const RecommendRibbon = styled.div`
  position: absolute;
  top: 16px;
  right: -28px;
  transform: rotate(45deg);
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  color: #fff;
  font-weight: 800;
  font-size: 0.68rem;
  padding: 8px 28px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
  letter-spacing: 0.05em;
  z-index: 10;
  user-select: none;
  text-align: center;
  text-transform: uppercase;
  
  @media (max-width: 900px) {
    font-size: 0.72rem;
    padding: 6px 22px;
    border-radius: 3px;
    top: 18px;
    right: -26px;
    transform: rotate(45deg);
  }
`;

const StudentModalOverlay = styled.div`
  position: fixed !important;
  z-index: 2147483647 !important;
  top: 0 !important; 
  left: 0 !important; 
  right: 0 !important; 
  bottom: 0 !important;
  background: rgba(0, 0, 0, 0.6) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  backdrop-filter: blur(4px) !important;
  pointer-events: auto !important;
  transform: translateZ(0) !important;
  will-change: transform !important;
`;

const StudentModalContent = styled.div`
  background: ${({ theme }) => theme.card} !important;
  color: ${({ theme }) => theme.text} !important;
  border-radius: 20px !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2) !important;
  padding: 32px 24px 24px 24px !important;
  max-width: 420px !important;
  width: 96vw !important;
  position: relative !important;
  text-align: left !important;
  border: 1px solid ${({ theme }) => theme.border} !important;
  z-index: 2147483647 !important;
  transform: translateZ(0) !important;
  will-change: transform !important;
  
  @media (max-width: 700px) {
    padding: 24px 20px 20px 20px !important;
    font-size: 0.98rem !important;
  }
`;

const StudentModalTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: #00b4d8;
  text-align: center;
`;

const StudentModalList = styled.ul`
  margin: 0 0 20px 0;
  padding-left: 20px;
  list-style-position: inside;
  text-align: left;
  line-height: 1.6;
`;

const StudentModalClose = styled.button`
  position: absolute;
  top: 12px; right: 18px;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover { 
    color: #00b4d8; 
  }
`;

const prices = [
  // Frontend и клиентская логика
  {
    section: 'Frontend и клиентская логика',
    title: 'Базовый',
    price: 'от 14 000₽',
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
    price: 'от 22 000₽',
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
    price: 'от 80 000₽',
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
    price: 'от 30 000₽',
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
    price: 'от 105 000₽',
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
    price: 'от 8 000₽',
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
    price: 'от 14 000₽',
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
    price: 'от 60 000₽',
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
    section: 'ML и автоматизация',
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
    section: 'ML и автоматизация',
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
    section: 'ML и автоматизация',
    title: 'Премиум',
    price: 'от 99 000₽',
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
    price: 'от 10 000₽',
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
    price: 'от 15 000₽',
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
    price: 'от 25 000₽',
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
    price: 'от 5 000₽',
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
    price: 'от 10 000₽',
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
    price: 'от 30 000₽',
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

const StudentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return createPortal(
    <StudentModalOverlay onClick={onClose}>
      <StudentModalContent onClick={e => e.stopPropagation()}>
        <StudentModalClose onClick={onClose} aria-label="Закрыть">×</StudentModalClose>
        <StudentModalTitle>Условия студенческой скидки 25%</StudentModalTitle>
        <StudentModalList>
          <li>Скидка действует только на тарифы "Базовый" во всех категориях услуг.</li>
          <li>Для получения скидки необходимо приложить фото или скан действующего студенческого билета при оформлении заявки.</li>
          <li>Мы проверим действительность студенческого (годен ли, совпадает ли ФИО).</li>
          <li>Скидка не суммируется с другими акциями и спецпредложениями.</li>
          <li>Срок действия скидки — до окончания обучения (или до отмены акции).</li>
          <li>В случае сомнений мы можем запросить дополнительное подтверждение статуса студента.</li>
        </StudentModalList>
        <div style={{ textAlign: 'center', color: '#00b4d8', fontWeight: 700, fontSize: '1.08rem' }}>
          Начни свой путь в IT с выгодой!
        </div>
      </StudentModalContent>
    </StudentModalOverlay>,
    document.body
  );
};

const Prices = () => {
  const [active, setActive] = useState(prices[0].section);
  const [studentOpen, setStudentOpen] = useState(false);
  const sections = getSections(prices);
  const controls = useRef(prices.map(() => useAnimation())).current;
  const refs = useRef(prices.map(() => useRef(null))).current;

  useEffect(() => {
    const observers = refs.map((ref, index) => {
      const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              controls[index].start({ opacity: 1, y: 0 });
              observer.unobserve(ref.current);
            }
          },
          { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, [controls, refs, active]);

  useEffect(() => {
    controls.forEach(control => control.set({ opacity: 0, y: 20 }));
  }, [active, controls]);

  return (
      <>
        <Section>
          <Container>
            <Title>Тарифы и цены</Title>
            <Subtitle>Выберите подходящий тариф для вашего проекта</Subtitle>
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
                      className={p.title === 'Стандарт' ? 'standard' : ''}
                                              initial={{ opacity: 0, y: 20 }}
                      animate={controls[i]}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    {p.popular && <RecommendRibbon>Советуем</RecommendRibbon>}
                    <CardContent>
                      <div style={{ fontWeight: 700, color: '#00b4d8', marginBottom: 4, fontSize: '1.02rem' }}>{p.section}</div>
                      <h3 style={{ marginBottom: 8 }}>{p.title}</h3>
                      <Price>{p.price}</Price>
                      {p.subtitle && <div style={{ color: '#b3b3b3', fontSize: '1.08rem', marginBottom: 18 }}>{p.subtitle}</div>}
                      <ul style={{ paddingLeft: 18, marginBottom: 12, marginTop: p.subtitle ? 0 : 18 }}>
                        {p.features.map(f => <Feature key={f}>{f}</Feature>)}
                      </ul>
                    </CardContent>
                    <Button
                      href="#contact"
                      style={{ marginTop: 'auto', width: '100%', boxSizing: 'border-box' }}
                    >
                      {p.section === 'Поддержка и сопровождение' ? 'Заказать' : 'Обсудить проект'}
                    </Button>
                  </Card>
              ))}
            </CardGrid>
            <StudentBanner>
              <StudentIcon />
              <span>
                <b>Студентам — скидка 25% на тариф “Базовый”!</b><br />
                Учишься в вузе? Просто приложи фото действующего студенческого при заказе — и получи выгодное предложение на старт карьеры в IT.
              </span>
              <StudentBtn onClick={() => setStudentOpen(true)}>
                Подробнее об условиях
              </StudentBtn>
            </StudentBanner>
            <StudentModal isOpen={studentOpen} onClose={() => setStudentOpen(false)} />
          </Container>
        </Section>
      </>
  );
};

export default Prices;