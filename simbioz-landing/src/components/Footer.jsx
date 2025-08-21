import React from 'react';
import styled from 'styled-components';
import { FaTelegramPlane, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterWrap = styled.footer`
  text-align: center;
  padding: 40px 0 24px 0;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.border};
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 0 16px;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
    padding: 0 12px;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 16px;
  margin: 0;
  width: 200px;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 20px;
    width: 100%;
    max-width: 250px;
  }
  
  @media (max-width: 480px) {
    gap: 18px;
  }
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.3rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  
  &:hover {
    color: #00b4d8;
    opacity: 1;
    background: rgba(0, 180, 216, 0.1);
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 180, 216, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    width: 52px;
    height: 52px;
    padding: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    width: 48px;
    height: 48px;
    padding: 12px;
  }
`;

const Policy = styled(Link)`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 6px 14px;
  border-radius: 16px;
  text-align: center;
  white-space: nowrap;
  
  &:hover {
    color: #00b4d8;
    opacity: 1;
    background: rgba(0, 180, 216, 0.1);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 8px 16px;
    width: 100%;
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 200px;
  
  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
    max-width: 250px;
  }
`;

const LogoTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #00b4d8;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const LogoSubtitle = styled.div`
  font-size: 0.85rem;
  opacity: 0.7;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 200px;
  
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 100%;
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Footer = () => (
    <FooterWrap>
        <Row>
            <LogoContainer>
                <LogoTitle>Simbioz Tech</LogoTitle>
                <LogoSubtitle>IT-решения для бизнеса</LogoSubtitle>
            </LogoContainer>
            
            <LinksContainer>
                <Policy to="/privacy">Политика конфиденциальности</Policy>
                <Copyright>
                    © {new Date().getFullYear()} Simbioz Tech. Все права защищены.
                </Copyright>
            </LinksContainer>

            <Socials>
                <SocialLink href="https://t.me/simbioztech" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                    <FaTelegramPlane />
                </SocialLink>
                <SocialLink href="https://github.com/simbioz-tech" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub />
                </SocialLink>
                <SocialLink href="mailto:simbioztech@yandex.ru" aria-label="Email">
                    <FaEnvelope />
                </SocialLink>
            </Socials>
            
            
        </Row>
    </FooterWrap>
);

export default Footer;
