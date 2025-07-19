import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaJava, FaBrain } from 'react-icons/fa';

const Section = styled.section`
  padding: 64px 0 48px 0;
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
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
`;
const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.08);
  padding: 32px 24px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const team = [
  {
    name: 'Алексей',
    role: 'Java Developer',
    icon: <FaJava size={48} color="#e76f00" />,
    desc: 'Бэкенд, микросервисы, интеграции, API, DevOps.'
  },
  {
    name: 'Иван',
    role: 'ML Engineer',
    icon: <FaBrain size={48} color="#3a7bd5" />,
    desc: 'Машинное обучение, анализ данных, AI, MLOps.'
  }
];

const Team = () => (
  <Section>
    <Container>
      <Title>Наша команда</Title>
      <CardGrid>
        {team.map((m, i) => (
          <Card key={m.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            {m.icon}
            <h3 style={{ margin: '12px 0 4px 0' }}>{m.name}</h3>
            <p style={{ color: '#7a88c9', fontWeight: 600, marginBottom: 8 }}>{m.role}</p>
            <p style={{ textAlign: 'center' }}>{m.desc}</p>
          </Card>
        ))}
      </CardGrid>
    </Container>
  </Section>
);

export default Team; 