import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled.footer`
  text-align: center;
  padding: 32px 0 16px 0;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const Footer = () => (
  <FooterWrap>
    &copy; {new Date().getFullYear()} Simbioz Team. Все права защищены.
  </FooterWrap>
);

export default Footer; 