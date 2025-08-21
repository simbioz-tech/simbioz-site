import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaSearch, FaProjectDiagram, FaCode, FaPlug, FaRocket, FaTools, FaCheck } from 'react-icons/fa';

const Section = styled.section`
  padding: 80px 0 60px 0;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(0, 180, 216, 0.04) 0%, rgba(0, 180, 216, 0.04) 5%, rgba(0, 180, 216, 0.04) 10%, transparent 70%),
      radial-gradient(circle at 80% 20%, rgba(230, 57, 70, 0.04) 0%, rgba(230, 57, 70, 0.04) 5%, rgba(230, 57, 70, 0.04) 30%, transparent 70%);
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

const TimelineContainer = styled.div`
  position: relative;
  padding: 20px 0;
`;

const TimelineSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  position: relative;
  z-index: 2;
  align-items: stretch;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  height: 100%;
  
  &.animate {
    animation: ${slideIn} 0.8s ease forwards;
    animation-delay: ${props => props.delay}s;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
  }
`;

const StepCircle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card};
  border: 3px solid ${({ $active, $completed }) => 
    $completed ? '#00b4d8' : $active ? '#e63946' : '#e0e0e0'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${({ $active, $completed }) => 
    $completed ? '#00b4d8' : $active ? '#e63946' : '#999'
  };
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  z-index: 3;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  
  ${({ $active }) => $active && css`
    animation: ${pulse} 2s infinite;
    box-shadow: 0 8px 24px rgba(230, 57, 70, 0.3);
  `}
  
  ${({ $completed }) => $completed && css`
    box-shadow: 0 8px 24px rgba(0, 180, 216, 0.3);
  `}
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.4rem;
    margin-bottom: 12px;
  }
`;

const StepContent = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 20px 16px;
  margin-top: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.border};
  width: 100%;
  height: 180px;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  background: ${({ theme }) => 
    theme.background === '#ffffff' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(26, 26, 26, 0.9)'
  };
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  ${({ $active }) => $active && css`
    box-shadow: 0 16px 32px rgba(230, 57, 70, 0.2);
    border-color: #e63946;
  `}
  
  ${({ $completed }) => $completed && css`
    border-color: #00b4d8;
  `}
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    height: 160px;
    padding: 16px 12px;
  }
`;

const StepTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
  line-height: 1.3;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 35px;
    font-size: 1rem;
  }
`;

const StepDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  line-height: 1.4;
  margin-bottom: 16px;
  height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  
  @media (max-width: 768px) {
    height: 40px;
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
    margin-bottom: 5px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00b4d8, #e63946);
  border-radius: 2px;
  transition: width 0.5s ease;
  width: ${({ $progress }) => $progress}%;
`;

const StepNumber = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  background: ${({ $completed }) => $completed ? '#00b4d8' : '#e63946'};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 4;
`;

const ConnectionLine = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #00b4d8, #e63946);
  transform: translate(-50%, -50%);
  z-index: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const steps = [
  { 
    icon: <FaSearch />, 
    title: 'Знакомство и анализ', 
    desc: 'Обсуждаем задачи, изучаем бизнес-процессы и цели клиента.',
    duration: '1-2 дня'
  },
  { 
    icon: <FaProjectDiagram />, 
    title: 'Проектирование решения', 
    desc: 'Формируем архитектуру, подбираем технологии, планируем этапы.',
    duration: '3-5 дней'
  },
  { 
    icon: <FaCode />, 
    title: 'Разработка', 
    desc: 'Создаём интерфейсы, backend, реализуем бизнес-логику.',
    duration: '2-4 недели'
  },
  { 
    icon: <FaPlug />, 
    title: 'Интеграция и автоматизация', 
    desc: 'Интегрируем внешние сервисы, настраиваем автоматизацию и ML.',
    duration: '1-2 недели'
  },
  { 
    icon: <FaRocket />, 
    title: 'Запуск и внедрение', 
    desc: 'Тестируем, внедряем решение, обучаем и сопровождаем запуск.',
    duration: '3-7 дней'
  },
  { 
    icon: <FaTools />, 
    title: 'Поддержка и развитие', 
    desc: 'Оперативно реагируем на вопросы, развиваем и оптимизируем проект.',
    duration: 'Постоянно'
  },
];

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev < steps.length - 1) {
            setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
            return prev + 1;
          } else {
            setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
            clearInterval(interval);
            return -1; // Убираем активный шаг после завершения
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setCompletedSteps(Array.from({ length: index }, (_, i) => i));
  };

  // Сброс анимации при клике на любую карточку
  const resetAnimation = () => {
    setActiveStep(0);
    setCompletedSteps([]);
  };

  return (
    <Section id="process" ref={sectionRef}>
      <Container>
        <Title>Процесс работы</Title>
        <Subtitle>
          Прозрачный и эффективный подход к реализации проектов
        </Subtitle>
        
        <TimelineContainer>
          <TimelineSteps>
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isCompleted = completedSteps.includes(index);
              const progress = isCompleted ? 100 : isActive ? 50 : 0;
              
              return (
                <Step 
                  key={step.title}
                  className={isVisible ? 'animate' : ''}
                  delay={index * 0.2}
                >
                  <StepCircle
                    $active={isActive}
                    $completed={isCompleted}
                    onClick={() => {
                      if (activeStep === -1) {
                        resetAnimation();
                      } else {
                        handleStepClick(index);
                      }
                    }}
                  >
                    {isCompleted ? <FaCheck /> : step.icon}
                    <StepNumber $completed={isCompleted}>
                      {index + 1}
                    </StepNumber>
                  </StepCircle>
                  
                  <StepContent $active={isActive} $completed={isCompleted}>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.desc}</StepDescription>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '12px', fontWeight: '500' }}>
                      {step.duration}
                    </div>
                    <ProgressBar>
                      <ProgressFill $progress={progress} />
                    </ProgressBar>
                  </StepContent>
                  

                </Step>
              );
            })}
          </TimelineSteps>
        </TimelineContainer>
      </Container>
    </Section>
  );
};

export default Process;