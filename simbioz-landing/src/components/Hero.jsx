import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import VacanciesModal from './VacanciesModal';

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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: nowrap;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }
`;

const BottomButtons = styled.div`
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-top: 10px;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
    align-items: center;
  }
`;
const MainButton = styled(motion.a)`
  display: inline-block;
  padding: 12px 36px;
  width: 220px;
  border-radius: 32px;
  background: linear-gradient(45deg, #3a7bd5, #1e2a78, #3a7bd5);
  background-size: 200% 100%;
  animation: gradientShift 5s ease infinite;
  color: #fff;
  font-weight: 700;
  font-size: 1.18rem;
  text-decoration: none;
  border: none;
  transition: background 0.3s, box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.13);
  letter-spacing: 0.02em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    background-position: 100% 0;
    box-shadow: 0 8px 32px 0 rgba(58, 123, 213, 0.5);
    transform: translateY(-2px) scale(1.05);
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }
  &:hover::before {
    left: 100%;
  }
  @media (max-width: 700px) {
    width: 90vw;
    max-width: 340px;
    min-width: 180px;
    padding: 14px 20px;
    font-size: 1.08rem;
    border-radius: 20px;
  }
`;
const OutlineButton = styled(motion.a)`
  display: inline-block;
  padding: 12px 36px;
  width: 220px;
  border-radius: 32px;
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
  position: relative;
  overflow: hidden;
  @media (max-width: 700px) {
    width: 90vw;
    max-width: 340px;
    min-width: 180px;
    padding: 14px 20px;
    font-size: 1.08rem;
    border-radius: 20px;
  }
  &:hover {
    background: ${({ theme }) => theme.background === '#0a0a23' ? '#23234a' : '#e3e8fa'};
    color: ${({ theme }) => theme.background === '#0a0a23' ? '#fff' : theme.accent2};
    border-color: ${({ theme }) => theme.accent2};
    box-shadow: 0 6px 24px 0 rgba(30,42,120,0.13);
    transform: translateY(-2px) scale(1.04);
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(58,123,213,0.5); }
    70% { box-shadow: 0 0 0 10px rgba(58,123,213,0); }
    100% { box-shadow: 0 0 0 0 rgba(58,123,213,0); }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }
  &:hover::before {
    left: 100%;
  }
`;

const WorkWithUsButton = styled(OutlineButton)`
  display: inline-block;
  width: 220px;
  text-align: center;
  @media (max-width: 700px) {
    width: 90vw;
    max-width: 340px;
    min-width: 180px;
    padding: 14px 20px;
    font-size: 1.08rem;
    border-radius: 20px;
  }
`;

const Hero = () => {
  const [vacanciesOpen, setVacanciesOpen] = useState(false);
  return (
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
          <WorkWithUsButton href="#vacancies" onClick={e => { e.preventDefault(); setVacanciesOpen(true); }} whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
            Работать с нами
          </WorkWithUsButton>
          <OutlineButton href="#services" whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
            Узнать подробнее
          </OutlineButton>
        </ButtonRow>
        <VacanciesModal open={vacanciesOpen} onClose={() => setVacanciesOpen(false)} />
      </Container>
    </Section>
  );
};

export default Hero; 