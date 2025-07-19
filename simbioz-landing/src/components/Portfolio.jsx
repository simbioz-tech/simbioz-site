import React from 'react';
import styled, { keyframes } from 'styled-components';

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
// --- Технологии ---
const techSlide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;
const TechCarouselWrap = styled.div`
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 32px;
  /* fade-out по краям (ещё шире) */
  mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 70%, transparent 100%);
`;
const TechCarousel = styled.div`
  display: flex;
  width: 200%;
  animation: ${techSlide} 14s linear infinite;
  user-select: none;
  pointer-events: none;
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
const TechTitle = styled.div`
  font-size: 1.08rem;
  color: #7a88c9;
  font-weight: 600;
  margin-bottom: 14px;
  text-align: center;
  letter-spacing: 0.2px;
`;
// --- Проекты ---
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
`;
const Card = styled.a`
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
  transition: background 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1), color 0s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 32px 0 rgba(30,42,120,0.18);
    transform: translateY(-4px) scale(1.04);
  }
`;
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;
const Tag = styled.span`
  background: #23234a;
  color: #b3c0f7;
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
const MoreBtn = styled.a`
  display: block;
  margin: 36px auto 0 auto;
  background: #1e2a78;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 38px;
  font-size: 1.15rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
  cursor: pointer;
  box-shadow: 0 2px 16px 0 rgba(30,42,120,0.10);
  &:hover {
    background: #2e3a8c;
    transform: scale(1.04);
  }
`;
const MoreLink = styled.a`
  display: block;
  margin: 36px auto 0 auto;
  color: #3a7bd5;
  font-size: 1.08rem;
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

const techs = [
  'Java', 'Spring Boot', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Kafka', 'RabbitMQ', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'MLOps', 'PyTorch', 'TensorFlow', 'scikit-learn', 'gRPC', 'REST', 'CI/CD', 'GitLab', 'Prometheus', 'Grafana', 'Redis', 'Elasticsearch', 'Airflow', 'Pandas', 'Numpy', 'OpenAI', 'LangChain', 'S3', 'Terraform', 'Ansible', 'Linux'
];

const projects = [
  {
    title: 'ML-платформа для логистики',
    desc: 'Оптимизация маршрутов, прогнозирование спроса, автоматизация логистики.',
    tags: ['ML', 'Python', 'MLOps', 'Logistics'],
    link: 'https://github.com/example/ml-logistics',
  },
  {
    title: 'Финтех API',
    desc: 'Высоконагруженные сервисы для банков и финтех-компаний.',
    tags: ['Java', 'Spring', 'Kafka', 'Fintech'],
    link: 'https://github.com/example/fintech-api',
  },
  {
    title: 'AI-бот для поддержки',
    desc: 'Автоматизация поддержки клиентов, чат-боты, интеграция с CRM.',
    tags: ['AI', 'NLP', 'Integration'],
    link: 'https://github.com/example/ai-support-bot',
  },
];

const Portfolio = () => {
  // Для бесшовного скролла дублируем массив techs
  const techItems = [...techs, ...techs];
  return (
    <Section>
      <Container>
        <Title>Проекты</Title>
        <TechCarouselWrap>
          <TechCarousel>
            {techItems.map((t, i) => (
              <TechCard key={t + i}>{t}</TechCard>
            ))}
          </TechCarousel>
        </TechCarouselWrap>
        <CardGrid>
          {projects.map((p, i) => (
            <Card href={p.link} target="_blank" rel="noopener noreferrer" key={p.title}>
              <h3 style={{ marginBottom: 8 }}>{p.title}</h3>
              <p style={{ color: '#7a88c9', marginBottom: 8 }}>{p.desc}</p>
              <Tags>
                {p.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </Tags>
            </Card>
          ))}
        </CardGrid>
        <MoreLink href="#" onClick={e => { e.preventDefault(); alert('Показать все проекты — скоро!'); }}>
          Смотреть все проекты
        </MoreLink>
      </Container>
    </Section>
  );
};

export default Portfolio; 