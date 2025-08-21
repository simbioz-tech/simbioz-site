import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import InfiniteCarousel from './InfiniteCarousel';
import { FaGlobe, FaChartBar, FaClipboardList, FaRocket } from 'react-icons/fa';

// Стилизованные компоненты
const Section = styled.section`
  padding: 100px 0 80px 0;
  background: ${({ theme }) => theme.background};
  overflow-x: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(0, 180, 216, 0.04) 0%, rgba(0, 180, 216, 0.04) 5%, rgba(0, 180, 216, 0.04) 10%, transparent 70%),
      radial-gradient(circle at 80% 20%, rgba(230, 57, 70, 0.04) 0%, rgba(230, 57, 70, 0.04) 5%, rgba(230, 57, 70, 0.04) 30%, transparent 70%);
    filter: blur(15px);
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
  margin-bottom: 30px;
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

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const TechCarouselWrap = styled.div`
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 60px;
  mask-image: linear-gradient(to right, transparent 0%, #000 20%, #000 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 20%, #000 80%, transparent 100%);
`;

const TechCard = styled.div`
  min-width: 120px;
  max-width: 140px;
  background: ${({ theme }) => theme.techBg};
  color: ${({ theme }) => theme.techText};
  border-radius: 12px;
  padding: 12px 20px;
  margin-right: 16px;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.2px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.border};
  
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: white;
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 24px;
    justify-items: center;
    align-items: stretch;
    grid-auto-rows: 1fr;
    padding: 0;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 24px;
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-width: 360px;
  max-width: 420px;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border};
  
  // Glassmorphism эффект
  backdrop-filter: blur(10px);
  background: ${({ theme }) => 
    theme.background === '#ffffff' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(26, 26, 26, 0.9)'
  };
  opacity: 0;
  transform: translateY(30px);
  
  &.animate {
    animation: fadeInUp 0.8s ease forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    &.animate {
      animation-delay: calc(var(--delay, 0.1s) * 3);
    }
  }
  
  // Градиентная рамка
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(135deg, #00b4d8, #e63946, #00b4d8);
    background-size: 200% 200%;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  // Декоративный элемент
  &::after {
    content: '';
    position: absolute;
    top: -40%;
    right: -40%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, rgba(230, 57, 70, 0.08) 50%, transparent 70%);
    border-radius: 50%;
    transition: all 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 
      0 16px 32px rgba(0, 180, 216, 0.12),
      0 6px 12px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
      background-position: 100% 100%;
    }
    
    &::after {
      transform: scale(1.2);
      opacity: 0.15;
    }
    
    .project-title {
      background: linear-gradient(135deg, #00b4d8, #e63946);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .project-icon {
      transform: scale(1.05);
    }
  }
  
  @media (max-width: 700px) {
    width: 100%;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
    min-width: unset;
    padding: 28px 24px;
  }
`;

const ProjectIcon = styled.div`
  font-size: 2.8rem;
  margin-bottom: 24px;
  color: #00b4d8;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, rgba(0, 180, 216, 0.1), rgba(230, 57, 70, 0.1));
  border-radius: 16px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(0, 180, 216, 0.15), rgba(230, 57, 70, 0.15));
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  ${Card}:hover &::before {
    opacity: 1;
  }
  
  svg {
    width: 2.2rem;
    height: 2.2rem;
    position: relative;
    z-index: 1;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  line-height: 1.3;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #00b4d8, #e63946);
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  ${Card}:hover &::after {
    width: 50px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 24px;
  flex: 1;
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    opacity: 0.9;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.techBg};
  color: ${({ theme }) => theme.accent};
  border-radius: 12px;
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.border};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.4s ease;
  }
  
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: white;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const MoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  padding: 12px 24px;
  border-radius: 12px;
  
  &:hover {
    color: ${({ theme }) => theme.accent2};
    transform: translateY(-2px);
    
    &::after {
      transform: scaleX(1);
    }
  }
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #00b4d8, #e63946);
    opacity: 0.7;
    border-radius: 1px;
    transform: scaleX(0);
    transition: transform 0.2s ease;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

// Оригинальный список технологий
const techs = [
  'Java', 'Spring Boot', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Kafka', 'RabbitMQ', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'MLOps', 'PyTorch', 'TensorFlow', 'scikit-learn', 'gRPC', 'REST', 'CI/CD', 'GitLab', 'Prometheus', 'Grafana', 'Redis', 'Elasticsearch', 'Airflow', 'Pandas', 'Numpy', 'OpenAI', 'LangChain', 'S3', 'Terraform', 'Ansible', 'Linux',
  // Новые/современные дополнения:
  'TypeScript', 'Telegram Bot', 'MLOps', 'NLU', 'LangChain'
];

// Оригинальные проекты
const projects = [
  {
    title: 'Сайт для малого бизнеса',
    desc: 'Разработка адаптивного сайта-визитки с формой обратной связи и интеграцией с Telegram.',
    tags: ['React', 'Telegram Bot', 'Backend', 'Интеграция'],
    icon: FaGlobe
  },
  {
    title: 'Автоматизация отчётности',
    desc: 'Скрипт для автоматической генерации и отправки отчётов в Telegram и на email.',
    tags: ['Python', 'Telegram Bot', 'Автоматизация'],
    icon: FaChartBar
  },
  {
    title: 'Мини-CRM для заявок',
    desc: 'Веб-приложение для учёта и обработки заявок с базовой аналитикой.',
    tags: ['Vue', 'Java', 'PostgreSQL', 'Backend'],
    icon: FaClipboardList
  }
];

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef}>
      <Container>
        <Title>Наши кейсы</Title>
        <Subtitle>
          Реализованные решения, которые помогают бизнесу расти и развиваться
        </Subtitle>
        
        <TechCarouselWrap>
          <InfiniteCarousel speed={70} gap={16}>
            {techs.map((tech, i) => (
              <TechCard key={tech + i}>{tech}</TechCard>
            ))}
          </InfiniteCarousel>
        </TechCarouselWrap>
        
        <CardGrid>
          {projects.map((project, i) => (
            <Card
              key={project.title}
              className={isVisible ? 'animate' : ''}
              style={{ 
                animationDelay: `${i * 0.1}s`,
                '--delay': `${i * 0.1}s`
              }}
            >
              <ProjectIcon className="project-icon">
                <project.icon />
              </ProjectIcon>
              <ProjectTitle className="project-title">
                {project.title}
              </ProjectTitle>
              <ProjectDescription>
                {project.desc}
              </ProjectDescription>
              <Tags>
                {project.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            </Card>
          ))}
        </CardGrid>
        
        <div style={{ textAlign: 'center' }}>
          <MoreLink 
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Начать свой проект
            <span>→</span>
          </MoreLink>
        </div>
        

      </Container>
    </Section>
  );
};

export default Portfolio;