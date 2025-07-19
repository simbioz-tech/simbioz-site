import React from 'react';
import styled, { keyframes } from 'styled-components';

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
const slide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;
const CarouselWrap = styled.div`
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
const Carousel = styled.div`
  display: flex;
  width: 200%;
  animation: ${slide} 12s linear infinite;
  user-select: none;
  pointer-events: none;
`;
const Card = styled.div`
  min-width: 320px;
  max-width: 340px;
  background: ${({ theme }) => theme.background};
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.08);
  padding: 32px 24px;
  border: 1.5px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  margin-right: 20px;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 12px 36px 0 rgba(30,42,120,0.22);
    transform: translateY(-8px) scale(1.08);
    border-color: #3a7bd5;
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
  { name: 'Екатерина', service: 'ML/AI проект', text: 'Ребята внедрили ML-модель для прогнозирования спроса — результат превзошёл ожидания!' },
  { name: 'Дмитрий', service: 'Backend-решение', text: 'Разработали отказоустойчивый API для финтеха. Всё быстро, чётко, профессионально.' },
  { name: 'Ольга', service: 'Интеграция сервисов', text: 'Интеграция с платёжными системами прошла безупречно. Отличная коммуникация.' },
  { name: 'Игорь', service: 'DevOps/CI-CD', text: 'Автоматизировали развёртывание и мониторинг ML-сервисов. Очень доволен сотрудничеством.' },
];

const Reviews = () => {
  // Дублируем массив для seamless loop
  const items = [...reviews, ...reviews];
  return (
    <Section>
      <Container>
        <Title>Отзывы</Title>
        <CarouselWrap>
          <Carousel>
            {items.map((r, i) => (
              <Card key={r.name + i}>
                <Name>{r.name}</Name>
                <Service>{r.service}</Service>
                <p style={{ fontStyle: 'italic', marginBottom: 0 }}>&ldquo;{r.text}&rdquo;</p>
              </Card>
            ))}
          </Carousel>
        </CarouselWrap>
      </Container>
    </Section>
  );
};

export default Reviews; 