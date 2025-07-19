import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 64px 0 48px 0;
  background: ${({ theme }) => theme.card};
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

const About = () => (
  <Section>
    <Container>
      <Title>О нас</Title>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} style={{ maxWidth: 700, margin: '0 auto', fontSize: '1.15rem', textAlign: 'center' }}>
        Мы — команда из Java-разработчика и ML-инженера. Создаём современные, надёжные и масштабируемые решения для бизнеса: от бэкенда до искусственного интеллекта. Работаем быстро, прозрачно и с гарантией результата.
      </motion.p>
    </Container>
  </Section>
);

export default About; 