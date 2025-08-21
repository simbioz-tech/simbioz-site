import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaRocket, FaLightbulb, FaUsers, FaArrowRight } from 'react-icons/fa';
import VacanciesModal from './VacanciesModal';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  
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
  text-align: center;
  position: relative;
  z-index: 2;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  margin-bottom: 32px;
  line-height: 1.1;
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  
  &.animate {
    animation: fadeInUp 1s ease forwards;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, #00b4d8, #e63946);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
    
    &::after {
      width: 80px;
      bottom: -8px;
    }
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  margin-bottom: 48px;
  color: ${({ theme }) => theme.text};
  opacity: 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 400;
  transform: translateY(30px);
  
  &.animate {
    animation: fadeInUp 1s ease forwards;
    animation-delay: 0.2s;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
    font-size: clamp(1rem, 4vw, 1.2rem);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 48px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(30px);
  
  &.animate {
    animation: fadeInUp 1s ease forwards;
    animation-delay: 0.4s;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    margin-top: 40px;
  }
`;

const MainButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 48px;
  border-radius: 50px;
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 180, 216, 0.3);
  position: relative;
  min-width: 240px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e63946, #00b4d8);
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }
  
  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 32px rgba(0, 180, 216, 0.4);
    
    &::before {
      left: 0;
    }
    
    svg {
      transform: translateX(4px) scale(1.1);
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 12px 40px;
    font-size: 1rem;
    min-width: 220px;
    width: 100%;
    max-width: 320px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const OutlineButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 48px;
  border-radius: 50px;
  border: 2px solid transparent;
  background: linear-gradient(${({ theme }) => theme.background}, ${({ theme }) => theme.background}) padding-box,
              linear-gradient(135deg, #00b4d8, #e63946) border-box;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  min-width: 240px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #00b4d8, #e63946);
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }
  
  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    color: white;
    box-shadow: 0 8px 24px rgba(0, 180, 216, 0.3);
    
    &::before {
      left: 0;
    }
    
    svg {
      transform: translateX(4px) scale(1.1);
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 12px 40px;
    font-size: 1rem;
    min-width: 220px;
    width: 100%;
    max-width: 320px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-top: 48px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(30px);
  
  &.animate {
    animation: fadeInUp 1s ease forwards;
    animation-delay: 0.6s;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    margin-top: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
    margin-top: 50px;
    grid-template-columns: 1fr 1fr;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .stat-number {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    background: linear-gradient(135deg, #00b4d8, #e63946);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
    display: block;
  }
  
  .stat-label {
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
    font-weight: 500;
    white-space: nowrap;
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

const Hero = () => {
  const [vacanciesOpen, setVacanciesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { number: '50+', label: 'Проектов' },
    { number: '100%', label: 'Довольных клиентов' },
    { number: '24/7', label: 'Поддержка' },
    { number: '3+', label: 'Года опыта' }
  ];

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

    return (
    <>
      <Section ref={sectionRef}>
        <Container>
          <Title className={isVisible ? 'animate' : ''}>
            Полный цикл IT-решений
            <br />
            для роста вашего бизнеса
          </Title>
          
          <Subtitle className={isVisible ? 'animate' : ''}>
            Мы — команда инженеров, создающая инновационные решения для цифровой трансформации. 
            От backend-разработки до машинного обучения — мы воплощаем ваши идеи в реальность.
          </Subtitle>
          
          <ButtonRow className={isVisible ? 'animate' : ''}>
            <MainButton 
              href="#contact"
            >
              <FaRocket />
              Начать проект
            </MainButton>
            
            <OutlineButton
              href="#services"
            >
              <FaLightbulb />
              Узнать больше
            </OutlineButton>
            
            <OutlineButton
              href="#vacancies"
              onClick={(e) => {
                e.preventDefault();
                setVacanciesOpen(true);
              }}
            >
              <FaUsers />
              Хочу в команду
            </OutlineButton>
          </ButtonRow>
          
          <StatsContainer className={isVisible ? 'animate' : ''}>
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </StatItem>
            ))}
          </StatsContainer>
        </Container>
      </Section>
      
      <VacanciesModal open={vacanciesOpen} onClose={() => setVacanciesOpen(false)} />
    </>
  );
};

export default Hero;