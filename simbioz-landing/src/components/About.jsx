import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 100px 0 80px 0;
  background: ${({ theme }) => theme.background};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(0, 180, 216, 0.1) 0%, rgba(0, 180, 216, 0.1) 5%, rgba(0, 180, 216, 0.1) 10%, transparent 70%),
      radial-gradient(circle at 80% 20%, rgba(230, 57, 70, 0.1) 0%, rgba(230, 57, 70, 0.1) 5%, rgba(230, 57, 70, 0.1) 10%, transparent 70%);
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
  margin-bottom: 16px;
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

const Description = styled(motion.p)`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.7;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
  font-weight: 400;
`;

const About = () => (
  <Section id="about">
    <Container>
      <Title>О нас</Title>
      <Description 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Мы — команда из Java-разработчика и ML-инженера. Создаём современные, надёжные и масштабируемые решения для бизнеса: от бэкенда до искусственного интеллекта. Работаем быстро, прозрачно и с гарантией результата.
      </Description>
    </Container>
  </Section>
);

export default About; 