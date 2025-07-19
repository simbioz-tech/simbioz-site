import React from 'react';
import styled from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa';

const Toggle = styled.button`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 100;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(30,42,120,0.08);
`;

const ThemeToggle = ({ theme, onToggle }) => (
  <Toggle onClick={onToggle} aria-label="Переключить тему">
    {theme === 'dark' ? <FaSun /> : <FaMoon />}
  </Toggle>
);

export default ThemeToggle; 