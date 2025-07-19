import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch, FaProjectDiagram, FaCode, FaPlug, FaRocket, FaTools } from 'react-icons/fa';

const Section = styled.section`
  padding: 64px 0 48px 0;
`;
const Container = styled.div`
  max-width: 900px;
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
const Steps = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
`;
const Step = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(30,42,120,0.08);
  padding: 32px 24px;
  border: 1.5px solid ${({ theme }) => theme.border};
  min-width: 200px;
  max-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 12px 36px 0 rgba(30,42,120,0.22);
    transform: translateY(-8px) scale(1.08);
    border-color: #3a7bd5;
  }
  @media (max-width: 700px) {
    padding: 18px 10px;
    border-radius: 10px;
    font-size: 0.98rem;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    margin: 0 auto;
  }
`;
const IconWrap = styled.div`
  font-size: 2.2rem;
  color: #3a7bd5;
  margin-bottom: 12px;
`;
const steps = [
  { icon: <FaSearch />, title: 'Анализ задачи', desc: 'Погружаемся в бизнес-процесс, выявляем цели и требования.' },
  { icon: <FaProjectDiagram />, title: 'Проектирование архитектуры', desc: 'Разрабатываем архитектуру backend/ML-решения, выбираем технологии.' },
  { icon: <FaCode />, title: 'Разработка и обучение', desc: 'Пишем код, обучаем ML-модели, реализуем интеграции.' },
  { icon: <FaPlug />, title: 'Интеграция', desc: 'Встраиваем решение в инфраструктуру клиента, настраиваем обмен данными.' },
  { icon: <FaRocket />, title: 'Внедрение', desc: 'Запуск в продакшн, обучение сотрудников, документация.' },
  { icon: <FaTools />, title: 'Поддержка', desc: 'Мониторинг, сопровождение, развитие и оптимизация.' },
];

const Process = () => (
  <Section>
    <Container>
      <Title>Процесс работы</Title>
      <Steps>
        {steps.map((s, i) => (
          <Step key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <IconWrap>{s.icon}</IconWrap>
            <h4 style={{ marginBottom: 8 }}>{s.title}</h4>
            <p style={{ textAlign: 'center', color: '#7a88c9' }}>{s.desc}</p>
          </Step>
        ))}
      </Steps>
    </Container>
  </Section>
);

export default Process; 