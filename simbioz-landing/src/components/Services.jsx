import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaServer, FaBrain, FaPlug, FaCogs, FaChartLine, FaTools } from 'react-icons/fa';

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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  box-sizing: border-box;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 12px;
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 0 4vw;
  }
`;
const Card = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.08);
  padding: 28px 18px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 220px;
  font-size: 1.05rem;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s;
  cursor: pointer;
  min-width: 0;
  &:hover {
    box-shadow: 0 12px 36px 0 rgba(30,42,120,0.22);
    transform: translateY(-8px) scale(1.08);
    border-color: #3a7bd5;
  }
  @media (max-width: 700px) {
    padding: 18px 8px;
    border-radius: 12px;
    font-size: 0.98rem;
    min-height: 0;
    margin: 0 auto;
    max-width: 380px;
    min-width: 220px;
    box-sizing: border-box;
  }
`;
const IconWrap = styled.div`  font-size: 2.5rem;
  margin-bottom: 16px;
  color: #3a7bd5;
`;const services = [
  { icon: <FaServer />, title: 'Backend на Java', desc: 'Проектирование и разработка микросервисов, REST/gRPC API, интеграции, отказоустойчивые системы.' },
  { icon: <FaBrain />, title: 'ML/AI решения', desc: 'Машинное обучение, Data Science, автоматизация, предиктивная аналитика, внедрение моделей.' },
  { icon: <FaPlug />, title: 'Интеграция сервисов', desc: 'Интеграция с внешними API, платёжными системами, корпоративными платформами.' },
  { icon: <FaCogs />, title: 'DevOps и CI/CD', desc: 'Автоматизация процессов, настройка CI/CD, контейнеризация, мониторинг.' },
  { icon: <FaChartLine />, title: 'Консалтинг и аудит', desc: 'Аудит архитектуры, оптимизация, подбор технологий, техническое интервью.' },
  { icon: <FaTools />, title: 'Поддержка и сопровождение', desc: 'Техническая поддержка, развитие и оптимизация существующих решений.' },
];

const Services = () => (
  <Section id="services">
    <Container>
      <Title>Наши услуги</Title>
      <CardGrid>
        {services.map((s, i) => (
          <Card key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <IconWrap>{s.icon}</IconWrap>
            <h3 style={{ marginBottom: 8 }}>{s.title}</h3>
            <p style={{ textAlign: 'center' }}>{s.desc}</p>
          </Card>
        ))}
      </CardGrid>
    </Container>
  </Section>
);

export default Services;


 