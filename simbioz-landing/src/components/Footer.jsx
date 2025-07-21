import React from 'react';
import styled from 'styled-components';
import { FaTelegramPlane, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterWrap = styled.footer`
  text-align: center;
  padding: 32px 0 16px 0;
  color: ${({ theme }) => theme.text};
  background: linear-gradient(90deg, ${({ theme }) => theme.card} 60%, ${({ theme }) => theme.background} 100%);
  border-top: 1.5px solid ${({ theme }) => theme.border};
  box-shadow: 0 -2px 24px 0 rgba(30,42,120,0.08);
`;
const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: center;
    gap: 32px;
  }
`;
const Socials = styled.div`
  display: flex;
  gap: 18px;
  margin: 8px 0 0 0;
`;
const SocialLink = styled.a`
  color: #7a88c9;
  font-size: 1.5rem;
  transition: color 0.18s, transform 0.18s, box-shadow 0.18s;
  border-radius: 50%;
  padding: 6px;
  &:hover {
    color: #3a7bd5;
    background: rgba(58,123,213,0.08);
    transform: translateY(-2px) scale(1.13) rotate(-6deg);
    box-shadow: 0 2px 12px 0 rgba(58,123,213,0.13);
  }
`;
const Policy = styled(Link)`
  color: #7a88c9;
  font-size: 1.01rem;
  text-decoration: underline;
  margin-left: 8px;
  &:hover {
    color: #3a7bd5;
  }
`;
const Copyright = styled.div`
  margin-top: 10px;
  font-size: 1.01rem;
  color: #7a88c9;
`;
const Contacts = styled.div`
  font-size: 1.08rem;
  color: ${({ theme }) => theme.text};
  margin-top: 4px;
`;

const Footer = () => (
  <FooterWrap>
    <Row>
      <Socials>
        <SocialLink href="https://t.me/simbioztech" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegramPlane /></SocialLink>
        <SocialLink href="https://github.com/simbioz-tech" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></SocialLink>
        <SocialLink href="mailto:simbioztech@yandex.ru" aria-label="Email"><FaEnvelope /></SocialLink>
      </Socials>
      <Policy to="/privacy">Политика конфиденциальности</Policy>
    </Row>
    <Copyright>
      &copy; {new Date().getFullYear()} Simbioz Tech. Все права защищены.
    </Copyright>
  </FooterWrap>
);

export default Footer; 