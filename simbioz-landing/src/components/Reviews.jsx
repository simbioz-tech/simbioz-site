import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import InfiniteCarousel from './InfiniteCarousel';

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
    filter: blur(0px);
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

const Card = styled.div`
  min-width: 320px;
  max-width: 340px;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  margin-right: 20px;
  transition: all 0.2s ease;
  cursor: default;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.border};
  opacity: 0;
  transform: translateY(30px);
  
  &.animate {
    animation: fadeInUp 1s ease forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    &.animate {
      animation-delay: calc(var(--delay, 0.1s) * 3);
    }
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 180, 216, 0.15);
    border-color: rgba(0, 180, 216, 0.3);
  }
  
  @media (max-width: 700px) {
    min-width: 90vw;
    max-width: 95vw;
    padding: 24px 20px;
  }
`;

const Name = styled.div`
  font-weight: 700;
  color: #00b4d8;
  margin-bottom: 4px;
  font-size: 1.1rem;
`;

const Service = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-bottom: 12px;
  font-weight: 500;
`;

const ReviewText = styled.p`
  font-style: italic;
  margin-bottom: 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
`;

const reviews = [
  { name: 'Анна', service: 'Сайт для бизнеса', text: 'Сделали современный сайт-визитку с интеграцией в Telegram. Всё понятно, быстро и удобно!' },
  { name: 'Владимир', service: 'Автоматизация отчётности', text: 'Теперь отчёты приходят в Telegram и на почту автоматически. Экономит кучу времени!' },
  { name: 'Мария', service: 'Мини-CRM', text: 'Реализовали простую CRM для заявок — всё под контролем, есть аналитика. Спасибо за поддержку!' },
  { name: 'Алексей', service: 'Telegram-бот', text: 'Бот для сбора обратной связи работает отлично, интеграция с сайтом без проблем.' },
];

const Reviews = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <Section id="reviews" ref={sectionRef}>
      <Container>
        <Title>Отзывы</Title>
        <InfiniteCarousel speed={60} gap={20}>
          {reviews.map((r, i) => (
            <Card 
              key={r.name + i}
              className={isVisible ? 'animate' : ''}
              style={{ 
                animationDelay: `${i * 0.1}s`,
                '--delay': `${i * 0.1}s`
              }}
            >
              <Name>{r.name}</Name>
              <Service>{r.service}</Service>
              <ReviewText>&ldquo;{r.text}&rdquo;</ReviewText>
            </Card>
          ))}
        </InfiniteCarousel>
      </Container>
    </Section>
  );
};

export default Reviews; 