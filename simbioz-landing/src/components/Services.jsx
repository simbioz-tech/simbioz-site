import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FaLaptopCode, FaServer, FaCogs, FaRobot, FaPlug, FaUserCheck } from 'react-icons/fa';

const Section = styled.section`
  padding: 64px 0 48px 0;
  background: ${({ theme }) => theme.card};
`;
const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0 4vw;
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
  box-sizing: border-box;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 12px;
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 0;
  }
`;
const Card = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(30,42,120,0.08);
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 220px;
  min-width: 320px;
  max-width: 340px;
  font-size: 1.05rem;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s, transform 0.25s cubic-bezier(.4,0,.2,1);
  cursor: pointer;
  position: relative;
  overflow: visible;
  box-sizing: border-box;
  width: 100%;
  max-width: 340px;
  border: none;
  &:hover {
    box-shadow: 0 0 0 4px #3a7bd5, 0 0 18px 4px #3a7bd5aa;
    transform: translateY(-10px) scale(1.10);
    z-index: 2;
  }
  &:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    pointer-events: none;
    box-shadow: 0 0 0 4px #3a7bd5, 0 0 18px 4px #3a7bd5aa;
    opacity: 1;
    transition: opacity 0.3s;
    z-index: 1;
  }
  @media (max-width: 700px) {
    padding: 18px 10px;
    border-radius: 12px;
    font-size: 0.98rem;
    min-height: 0;
    margin: 0 auto;
    width: 100%;
    max-width: 340px;
    box-sizing: border-box;
  }
`;
const IconWrap = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: #3a7bd5;
  transition: transform 0.35s cubic-bezier(.4,0,.2,1);
  ${Card}:hover & {
    transform: scale(1.18);
    filter: drop-shadow(0 0 8px #3a7bd5cc);
  }
`;

const services = [
    { icon: <FaLaptopCode />, title: 'Frontend и клиентская логика', desc: 'Создание адаптивных интерфейсов на React, Vue, TypeScript. Интеграция с backend, настройка клиентской логики.' },
    { icon: <FaServer />, title: 'Backend и архитектура', desc: 'Проектирование микросервисов, разработка REST/gRPC API, работа с базами данных, интеграции и построение отказоустойчивых систем.' },
    { icon: <FaCogs />, title: 'DevOps и инфраструктура', desc: 'Автоматизация развёртывания, настройка CI/CD, Docker, Kubernetes, мониторинг и обеспечение стабильной работы.' },
    { icon: <FaRobot />, title: 'Машинное обучение и автоматизация', desc: 'Внедрение ML-моделей, автоматизация процессов, предиктивная аналитика, чат-боты и Telegram-боты для бизнеса.' },
    { icon: <FaPlug />, title: 'Интеграции и техническая поддержка', desc: 'Интеграции с API, платёжными системами, CRM и корпоративными платформами. Сопровождение, развитие решений, реакция на инциденты.' },
    { icon: <FaUserCheck />, title: 'Аудит и технологический консалтинг', desc: 'Анализ архитектуры, код-ревью, оптимизация и помощь в выборе технологий.' },
];

const Services = () => {
    const controls = services.map(() => useAnimation());
    const refs = services.map(() => useRef(null));

    useEffect(() => {
        const observers = refs.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        controls[index].start({ opacity: 1, y: 0 });
                        observer.unobserve(ref.current); // Stop observing once animated
                    }
                },
                { threshold: 0.2 } // Trigger when 20% of the card is visible
            );

            if (ref.current) observer.observe(ref.current);
            return observer;
        });

        return () => observers.forEach(observer => observer.disconnect());
    }, [controls, refs]);

    return (
        <Section id="services">
            <Container>
                <Title>Наши услуги</Title>
                <CardGrid>
                    {services.map((s, i) => (
                        <Card
                            key={s.title}
                            ref={refs[i]}
                            animate={controls[i]}
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 }}
                        >
                            <IconWrap>{s.icon}</IconWrap>
                            <h3
                                style={{ marginBottom: 8, textAlign: i >= 3 ? 'center' : undefined }}
                            >
                                {s.title}
                            </h3>
                            <p style={{ textAlign: 'center' }}>{s.desc}</p>
                        </Card>
                    ))}
                </CardGrid>
            </Container>
        </Section>
    );
};

export default Services;