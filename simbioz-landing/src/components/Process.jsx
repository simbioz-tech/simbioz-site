import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  justify-content: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 18px;
    align-items: center;
    width: 100vw;
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0 2vw;
  }
`;
const Step = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(30,42,120,0.08);
  padding: 32px 24px;
  min-width: 320px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s, transform 0.25s cubic-bezier(.4,0,.2,1);
  cursor: pointer;
  position: relative;
  overflow: visible;
  box-sizing: border-box;
  border: none;
  &:hover {
    box-shadow: 0 0 2px 2px #3a7bd5, 0 0 5px 5px #3a7bd5aa;
    transform: translateY(-8px) scale(1.10);
    z-index: 2;
  }
  &:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    pointer-events: none;
    box-shadow: 0 0 2px 2px #3a7bd5, 0 0 5px 5px #3a7bd5aa;
    opacity: 1;
    transition: opacity 0.3s;
    z-index: 1;
  }
  @media (max-width: 700px) {
    padding: 18px 10px;
    border-radius: 16px;
    font-size: 0.98rem;
    min-width: 90vw;
    max-width: 95vw;
    margin: 0 auto;
  }
`;
const IconWrap = styled.div`
  font-size: 2.2rem;
  color: #3a7bd5;
  margin-bottom: 12px;
  transition: transform 0.35s cubic-bezier(.4,0,.2,1);
  ${Step}:hover & {
    transform: scale(1.18);
    filter: drop-shadow(0 0 8px #3a7bd5cc);
  }
`;

const steps = [
  { icon: <FaSearch />, title: 'Знакомство и анализ', desc: 'Обсуждаем задачи, изучаем бизнес-процессы и цели клиента.' },
  { icon: <FaProjectDiagram />, title: 'Проектирование решения', desc: 'Формируем архитектуру, подбираем технологии, планируем этапы.' },
  { icon: <FaCode />, title: 'Разработка', desc: 'Создаём интерфейсы, backend, реализуем бизнес-логику.' },
  { icon: <FaPlug />, title: 'Интеграция и автоматизация', desc: 'Интегрируем внешние сервисы, настраиваем автоматизацию и ML.' },
  { icon: <FaRocket />, title: 'Запуск и внедрение', desc: 'Тестируем, внедряем решение, обучаем и сопровождаем запуск.' },
  { icon: <FaTools />, title: 'Поддержка и развитие', desc: 'Оперативно реагируем на вопросы, развиваем и оптимизируем проект.' },
];

const Process = () => {
  const controls = steps.map(() => useAnimation());
  const refs = steps.map(() => useRef(null));

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
  }, [controls, refs]);

  return (
      <Section>
        <Container>
          <Title>Процесс работы</Title>
          <Steps>
            {steps.map((s, i) => (
                <Step
                    key={s.title}
                    ref={refs[i]}
                    animate={controls[i]}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 }}
                >
                  <IconWrap>{s.icon}</IconWrap>
                  <h4
                      style={{ marginBottom: 8, textAlign: s.title === 'Интеграция и автоматизация' ? 'center' : undefined }}
                  >
                      {s.title}
                  </h4>
                  <p style={{ textAlign: 'center', color: '#7a88c9' }}>{s.desc}</p>
                </Step>
            ))}
          </Steps>
        </Container>
      </Section>
  );
};

export default Process;