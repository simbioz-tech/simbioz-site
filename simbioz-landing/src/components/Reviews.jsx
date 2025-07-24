import React from 'react';
import styled, { keyframes } from 'styled-components';
import InfiniteCarousel from './InfiniteCarousel';

const Section = styled.section`
  padding: 64px 0 48px 0;
  background: ${({ theme }) => theme.card};
  overflow-x: hidden;
`;
const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
`;
const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 24px;
  text-align: center;
`;
const Card = styled.div`
  min-width: 320px;
  max-width: 340px;
  background: ${({ theme }) => theme.background};
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.08);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  margin-right: 20px;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s;
  cursor: default;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 6px 20px 0 rgba(58,123,213,0.13);
  }
  @media (max-width: 700px) {
    min-width: 90vw;
    max-width: 95vw;
    padding: 18px 10px;
  }
`;
const Name = styled.div`
  font-weight: 700;
  color: #3a7bd5;
  margin-bottom: 4px;
`;
const Service = styled.div`
  font-size: 0.98rem;
  color: #7a88c9;
  margin-bottom: 10px;
`;
const reviews = [
  { name: 'Анна', service: 'Сайт для бизнеса', text: 'Сделали современный сайт-визитку с интеграцией в Telegram. Всё понятно, быстро и удобно!' },
  { name: 'Владимир', service: 'Автоматизация отчётности', text: 'Теперь отчёты приходят в Telegram и на почту автоматически. Экономит кучу времени!' },
  { name: 'Мария', service: 'Мини-CRM', text: 'Реализовали простую CRM для заявок — всё под контролем, есть аналитика. Спасибо за поддержку!' },
  { name: 'Алексей', service: 'Telegram-бот', text: 'Бот для сбора обратной связи работает отлично, интеграция с сайтом без проблем.' },
];

const Reviews = () => {
  // Дублируем массив для seamless loop
  const items = [...reviews, ...reviews];
  return (
    <Section>
      <Container>
        <Title>Отзывы</Title>
        <InfiniteCarousel speed={80} gap={20}>
          {reviews.map((r, i) => (
            <Card key={r.name + i}>
              <Name>{r.name}</Name>
              <Service>{r.service}</Service>
              <p style={{ fontStyle: 'italic', marginBottom: 0 }}>&ldquo;{r.text}&rdquo;</p>
            </Card>
          ))}
        </InfiniteCarousel>
      </Container>
    </Section>
  );
};

export default Reviews; 