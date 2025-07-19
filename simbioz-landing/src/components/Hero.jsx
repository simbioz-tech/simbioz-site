import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  position: relative;
  padding: 80px 0 64px 0;
  background: ${({ theme }) => theme.background};
  transition: background 0.4s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
  @media (max-width: 700px) {
    overflow-x: hidden;
    width: 100vw;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 220px;
    pointer-events: none;
    z-index: 0;
    background: ${({ theme }) =>
      theme.background === '#0a0a23'
        ? 'linear-gradient(180deg, #1e2a78 0%, transparent 100%)'
        : 'linear-gradient(180deg, #e3e8fa 0%, transparent 100%)'};
    opacity: 0.85;
    transition: background 0.4s cubic-bezier(.4,0,.2,1);
    @media (max-width: 700px) {
        padding: 0;
    }
  }
`;
const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
  position: relative;
  z-index: 1;
  @media (max-width: 700px) {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    max-width: 100vw;
    padding: 0 2vw;
    box-sizing: border-box;
  }
`;
const Title = styled(motion.h1)`
  font-size: 3.2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.background === '#0a0a23' ? '#fff' : theme.text};
  margin-bottom: 18px;
  transition: color 0.4s cubic-bezier(.4,0,.2,1);
`;
const Subtitle = styled(motion.p)`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.background === '#0a0a23' ? '#b3c0f7' : theme.accent};
  margin-bottom: 40px;
  transition: color 0.4s cubic-bezier(.4,0,.2,1);
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }
`;
const MainButton = styled(motion.a)`
  display: inline-block;
  padding: 14px 36px;
  border-radius: 20px;
  background: linear-gradient(90deg, #3a7bd5 0%, #1e2a78 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.18rem;
  text-decoration: none;
  border: none;
  transition: background 0.22s, color 0.22s, box-shadow 0.18s, transform 0.18s;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.13);
  letter-spacing: 0.02em;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, #1e2a78 0%, #3a7bd5 100%);
    color: #fff;
    box-shadow: 0 8px 32px 0 rgba(30,42,120,0.18);
    transform: translateY(-2px) scale(1.04);
  }
  @media (max-width: 700px) {
    width: 100%;
    padding: 14px 0;
    font-size: 1.08rem;
    border-radius: 16px;
  }
`;
const OutlineButton = styled(motion.a)`
  display: inline-block;
  padding: 14px 32px;
  border-radius: 18px;
  border: 2px solid ${({ theme }) => theme.background === '#0a0a23' ? '#3a7bd5' : theme.accent};
  background: transparent;
  color: ${({ theme }) => theme.background === '#0a0a23' ? '#b3c0f7' : theme.accent};
  font-weight: 700;
  font-size: 1.18rem;
  text-decoration: none;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 8px 0 rgba(30,42,120,0.06);
  cursor: pointer;
  transition: background 0.22s, color 0.22s, border-color 0.22s, box-shadow 0.18s, transform 0.18s;
  margin-left: 2px;
  &:hover {
    background: ${({ theme }) => theme.background === '#0a0a23' ? '#23234a' : '#e3e8fa'};
    color: ${({ theme }) => theme.background === '#0a0a23' ? '#fff' : theme.accent2};
    border-color: ${({ theme }) => theme.accent2};
    box-shadow: 0 6px 24px 0 rgba(30,42,120,0.13);
    transform: translateY(-2px) scale(1.04);
  }
  @media (max-width: 700px) {
    width: 100%;
    padding: 14px 0;
    font-size: 1.08rem;
    border-radius: 16px;
    margin-left: 0;
  }
`;

const Hero = () => (
  <Section as={motion.section} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
    <Container>
      <Title initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        Backend & ML-экспертиза для вашего бизнеса
      </Title>
      <Subtitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        Мы — команда инженеров, специализирующихся на сложных backend-системах, интеграциях и искусственном интеллекте. <br />
        Помогаем компаниям автоматизировать процессы, внедрять ML и строить надёжные сервисы.
      </Subtitle>
      <ButtonRow>
        <MainButton href="#contact" whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
          Начать проект
        </MainButton>
        <OutlineButton href="#services" whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
          Узнать подробнее
        </OutlineButton>
      </ButtonRow>
    </Container>
  </Section>
);

export default Hero; 