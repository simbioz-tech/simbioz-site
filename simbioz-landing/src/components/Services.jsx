import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaLaptopCode, FaServer, FaCogs, FaRobot, FaPlug, FaUserCheck } from 'react-icons/fa';

const Section = styled.section`
  padding: 100px 0 80px 0;
  background: ${({ theme }) => theme.background};
  overflow-x: hidden;
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
    
    /* Отключаем blur на мобильных для производительности */
    @media (max-width: 768px) {
      filter: none;
      opacity: 0.5;
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
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
  gap: 40px;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 10px;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  min-height: 320px;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  
  // Glassmorphism эффект - отключаем на мобильных
  backdrop-filter: blur(12px);
  
  @media (max-width: 768px) {
    backdrop-filter: none;
  }
  
  &.animate {
    animation: fadeInUp 0.8s ease forwards;
    
    @media (max-width: 768px) {
      animation: fadeInUp 1.2s ease forwards;
    }
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  background: ${({ theme }) => 
    theme.background === '#ffffff' 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(26, 26, 26, 0.95)'
  };
  
  border-radius: 20px;
  
  // Градиентная рамка
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(135deg, #00b4d8, #e63946, #00b4d8);
    background-size: 200% 200%;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: all 0.4s ease;
  }
  
  // Декоративные линии
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, transparent 30%, rgba(0, 180, 216, 0.1) 50%, transparent 70%),
      linear-gradient(-45deg, transparent 30%, rgba(230, 57, 70, 0.1) 50%, transparent 70%);
    opacity: 0;
    transition: all 0.4s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: 
      0 25px 50px rgba(0, 180, 216, 0.2),
      0 12px 24px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-8px) scale(1.02);
  }
  
  &:hover {
    &::before {
      opacity: 1;
      background-position: 100% 100%;
    }
    
    &::after {
      opacity: 1;
      transform: scale(1.1);
    }
    
    .icon {
      color: #00b4d8;
      transform: scale(1.15);
    }
    
    .title {
      background: linear-gradient(135deg, #00b4d8, #e63946);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  @media (max-width: 700px) {
    min-height: 280px;
  }
  
  @media (max-width: 768px) {
    &.animate {
      animation-delay: calc(var(--delay, 0.001s) * 0.5);
    }
  }
`;

const IconWrap = styled.div`
  font-size: 2.5rem;
  color: #00b4d8;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, rgba(0, 180, 216, 0.1), rgba(230, 57, 70, 0.1));
  border-radius: 14px;
  margin: 24px;
  
  // Светящийся эффект
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(0, 180, 216, 0.2), rgba(230, 57, 70, 0.2));
    opacity: 0;
    transition: all 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 24px 16px 24px;
  color: ${({ theme }) => theme.text};
  transition: all 0.4s ease;
  line-height: 1.3;
  text-align: left;
  position: relative;
  
  // Подчеркивание
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #00b4d8, #e63946);
    border-radius: 2px;
    transition: width 0.4s ease;
  }
  
  ${Card}:hover &::after {
    width: 60px;
  }
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 0 24px 24px 24px;
  flex: 1;
  text-align: left;
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;


const services = [
  {
    icon: <FaLaptopCode />,
    title: 'Frontend и клиентская логика',
    desc: 'Создание адаптивных интерфейсов на React, Vue, TypeScript. Интеграция с backend, настройка клиентской логики и оптимизация производительности.',
    gradient: 'linear-gradient(135deg, #00b4d8, #e63946)'
  },
  {
    icon: <FaServer />,
    title: 'Backend и архитектура',
    desc: 'Проектирование микросервисов, разработка REST/gRPC API, работа с базами данных, интеграции и построение отказоустойчивых систем.',
    gradient: 'linear-gradient(135deg, #e63946, #00b4d8)'
  },
  {
    icon: <FaCogs />,
    title: 'DevOps и инфраструктура',
    desc: 'Автоматизация развёртывания, настройка CI/CD, Docker, Kubernetes, мониторинг и обеспечение стабильной работы систем.',
    gradient: 'linear-gradient(135deg, #00b4d8, #e63946)'
  },
  {
    icon: <FaRobot />,
    title: 'Машинное обучение и AI',
    desc: 'Внедрение ML-моделей, автоматизация процессов, предиктивная аналитика, чат-боты и Telegram-боты для бизнеса.',
    gradient: 'linear-gradient(135deg, #e63946, #00b4d8)'
  },
  {
    icon: <FaPlug />,
    title: 'Интеграции и поддержка',
    desc: 'Интеграции с API, платёжными системами, CRM и корпоративными платформами. Сопровождение, развитие решений, реакция на инциденты.',
    gradient: 'linear-gradient(135deg, #00b4d8, #e63946)'
  },
  {
    icon: <FaUserCheck />,
    title: 'Консалтинг и аудит',
    desc: 'Анализ архитектуры, код-ревью, оптимизация производительности и помощь в выборе технологий для вашего проекта.',
    gradient: 'linear-gradient(135deg, #e63946, #00b4d8)'
  }
];

const Services = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => [...new Set([...prev, index])]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="services" ref={sectionRef}>
      <Container>
        <Title>Наши услуги</Title>
        <Subtitle>
          Полный спектр IT-решений для цифровой трансформации вашего бизнеса
        </Subtitle>
        
        <CardGrid>
          {services.map((service, i) => (
            <Card
              key={service.title}
              ref={el => cardRefs.current[i] = el}
              data-index={i}
              className={visibleCards.includes(i) ? 'animate' : ''}
              style={{ 
                animationDelay: `${i * 0.006}s`,
                '--delay': `${i * 0.006}s`
              }}
            >
              <IconWrap className="icon">
                {service.icon}
              </IconWrap>
              <CardTitle className="title">
                {service.title}
              </CardTitle>
              <CardDescription>
                {service.desc}
              </CardDescription>
            </Card>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default Services;