import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import InfiniteCarousel from './InfiniteCarousel';

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
const TechCarouselWrap = styled.div`
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 32px;
  mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 70%, transparent 100%);
`;
const TechCard = styled.div`
  min-width: 100px;
  max-width: 120px;
  background: ${({ theme }) => theme.techBg};
  color: ${({ theme }) => theme.techText};
  border-radius: 8px;
  padding: 10px 16px;
  margin-right: 12px;
  font-size: 0.98rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  letter-spacing: 0.2px;
  transition: background 0.2s, color 0.2s, transform 0.18s, box-shadow 0.18s;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.accent2};
    color: #fff;
    transform: scale(1.08);
    box-shadow: 0 2px 12px 0 rgba(30,42,120,0.10);
  }
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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
  align-items: flex-start;
  text-decoration: none;
  color: inherit;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s, transform 0.25s cubic-bezier(.4,0,.2,1);
  cursor: pointer;
  position: relative;
  overflow: visible;
  min-width: 320px;
  max-width: 340px;
  box-sizing: border-box;
  @media (max-width: 700px) {
    min-width: 90vw;
    max-width: 95vw;
    padding: 18px 10px;
  }
  &:hover {
    box-shadow: 0 20px 60px 0 rgba(58,123,213,0.38), 0 2px 24px 0 rgba(30,42,120,0.18);
    transform: translateY(-10px) scale(1.08);
    border-color: #3a7bd5;
    z-index: 2;
  }
  &:hover::after {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 22px;
    pointer-events: none;
    box-shadow: 0 0 36px 10px #3a7bd5aa;
    opacity: 0.5;
    transition: opacity 0.3s;
    z-index: 1;
  }
`;
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;
const Tag = styled.span`
  background: ${({ theme }) => theme.background === '#0a0a23' ? '#23234a' : '#e3e8fa'};
  color: ${({ theme }) => theme.background === '#0a0a23' ? '#b3c0f7' : '#3a7bd5'};
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 0.95rem;
  transition: background 0.18s, color 0.18s, transform 0.18s, box-shadow 0.18s;
  cursor: pointer;
  &:hover {
    background: #3a7bd5;
    color: #fff;
    transform: scale(1.08);
    box-shadow: 0 2px 8px 0 rgba(30,42,120,0.10);
  }
`;
const MoreLink = styled.a`
  display: block;
  margin: 36px auto 0 auto;
  color: #3a7bd5;
  font-size: 1.02rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  transition: color 0.2s;
  position: relative;
  &:hover {
    color: #2e3a8c;
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #3a7bd5 60%, #2e3a8c 100%);
    opacity: 0.5;
    border-radius: 2px;
    transform: scaleX(0);
    transition: transform 0.2s;
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;

// Update techs array to match new stack
const techs = [
  'Java', 'Spring Boot', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Kafka', 'RabbitMQ', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'MLOps', 'PyTorch', 'TensorFlow', 'scikit-learn', 'gRPC', 'REST', 'CI/CD', 'GitLab', 'Prometheus', 'Grafana', 'Redis', 'Elasticsearch', 'Airflow', 'Pandas', 'Numpy', 'OpenAI', 'LangChain', 'S3', 'Terraform', 'Ansible', 'Linux',
  // New/modern additions:
  'TypeScript', 'Telegram Bot', 'MLOps', 'NLU', 'LangChain'
];

// Update projects to be simpler and more realistic
const projects = [
  {
    title: 'Сайт для малого бизнеса',
    desc: 'Разработка адаптивного сайта-визитки с формой обратной связи и интеграцией с Telegram.',
    tags: ['React', 'Telegram Bot', 'Backend', 'Интеграция'],
  },
  {
    title: 'Автоматизация отчётности',
    desc: 'Скрипт для автоматической генерации и отправки отчётов в Telegram и на email.',
    tags: ['Python', 'Telegram Bot', 'Автоматизация'],
  },
  {
    title: 'Мини-CRM для заявок',
    desc: 'Веб-приложение для учёта и обработки заявок с базовой аналитикой.',
    tags: ['Vue', 'Java', 'PostgreSQL', 'Backend'],
  },
];

const Portfolio = () => {
  const controls = projects.map(() => useAnimation());
  const refs = projects.map(() => useRef(null));

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
      <Section>
        <Container>
          <Title>Проекты</Title>
          <TechCarouselWrap>
            <InfiniteCarousel speed={50} gap={12}>
              {techs.map((t, i) => (
                  <TechCard key={t + i}>{t}</TechCard>
              ))}
            </InfiniteCarousel>
          </TechCarouselWrap>
          <CardGrid>
            {projects.map((p, i) => (
                <Card
                    key={p.title}
                    ref={refs[i]}
                    animate={controls[i]}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 }}
                >
                  <h3 style={{ marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: '#7a88c9', marginBottom: 8 }}>{p.desc}</p>
                  <Tags>
                    {p.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </Tags>
                </Card>
            ))}
          </CardGrid>
          {/*
          <MoreLink href="#" onClick={e => { e.preventDefault(); alert('Показать все проекты — скоро!'); }}>
            Смотреть все проекты
          </MoreLink>
          */}
        </Container>
      </Section>
  );
};

export default Portfolio;