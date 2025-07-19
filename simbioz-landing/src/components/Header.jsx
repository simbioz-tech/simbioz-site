import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.jpg';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

const HeaderWrap = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: transparent;
  padding: 0;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 14px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  background: ${({ theme }) => theme.background === '#0a0a23' ? theme.card : theme.background};
  border-radius: 36px;
  border: 1.5px solid ${({ theme }) => theme.border};
  box-shadow: 0 2px 16px 0 rgba(30,42,120,0.06);
  transition: background 0.4s, border-color 0.4s;
  @media (max-width: 700px) {
    padding: 0 2vw;
    margin: 10px 2vw 0 2vw;
    height: 56px;
    border-radius: 18px;
    gap: 0;
    justify-content: flex-start;
  }
`;
const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  letter-spacing: 1px;
  transition: color 0.3s;
  @media (max-width: 700px) {
    font-size: 1.05rem;
    gap: 6px;
  }
`;
const LogoImg = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 8px;
  background: transparent;
`;
const Nav = styled.nav`
  display: flex;
  gap: 32px;
  flex: 1;
  justify-content: center;
  @media (max-width: 900px) {
    gap: 18px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;
const NavLink = styled.a`
  color: ${({ theme }) => theme.text};
  font-size: 1.08rem;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.accent};
    opacity: 0.3;
    border-radius: 2px;
    transform: scaleX(0);
    transition: transform 0.2s;
  }
  &:hover::after {
    transform: scaleX(1);
  }
  @media (max-width: 700px) {
    width: 100%;
    box-sizing: border-box;
    font-size: 1.05rem;
    padding: 10px 0;
    margin: 0;
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  @media (max-width: 900px) {
    gap: 18px;
  }
  @media (max-width: 700px) {
    gap: 14px;
  }
`;
const ThemeBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: transparent;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: #fff;
    border-color: ${({ theme }) => theme.accent};
  }
  @media (max-width: 700px) {
    width: 34px;
    height: 34px;
    font-size: 1.05rem;
  }
`;
const OutlineBtn = styled.a`
  padding: 14px 32px;
  border-radius: 18px;
  border: 2px solid ${({ theme }) => theme.background === '#0a0a23' ? '#3a7bd5' : theme.accent};
  background: transparent;
  color: ${({ theme }) => theme.background === '#0a0a23' ? '#b3c0f7' : theme.accent};
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  margin-right: 2px;
  transition: background 0.22s, color 0.22s, border-color 0.22s, box-shadow 0.18s, transform 0.18s;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 8px 0 rgba(30,42,120,0.06);
  cursor: pointer;
  @media (max-width: 700px) {
    padding: 8px 14px;
    font-size: 0.98rem;
    min-width: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.background === '#0a0a23' ? '#23234a' : '#e3e8fa'};
    color: ${({ theme }) => theme.background === '#0a0a23' ? '#fff' : theme.accent2};
    border-color: ${({ theme }) => theme.accent2};
    box-shadow: 0 6px 24px 0 rgba(30,42,120,0.13);
    transform: translateY(-2px) scale(1.04);
  }
`;
const FillBtn = styled.a`
  padding: 14px 36px;
  border-radius: 20px;
  background: linear-gradient(90deg, #3a7bd5 0%, #1e2a78 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  border: none;
  transition: background 0.22s, color 0.22s, box-shadow 0.18s, transform 0.18s;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.13);
  letter-spacing: 0.02em;
  cursor: pointer;
  @media (max-width: 700px) {
    display: none;
  }
  &:hover {
    background: linear-gradient(90deg, #1e2a78 0%, #3a7bd5 100%);
    color: #fff;
    box-shadow: 0 8px 32px 0 rgba(30,42,120,0.18);
    transform: translateY(-2px) scale(1.04);
  }
`;
const Burger = styled.button`
  display: none;
  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: transparent;
    border: 1.5px solid ${({ theme }) => theme.border};
    border-radius: 50%;
    color: ${({ theme }) => theme.text};
    font-size: 1.25rem;
    margin-left: 6px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    &:hover {
      background: ${({ theme }) => theme.accent};
      color: #fff;
      border-color: ${({ theme }) => theme.accent};
    }
  }
`;
const MobileMenu = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px;
    max-width: 240px;
    background: ${({ theme }) => theme.background === '#0a0a23' ? theme.card : theme.background};
    border-radius: 0 18px 18px 0;
    box-shadow: 4px 0 32px 0 rgba(30,42,120,0.13);
    z-index: 200;
    padding: 0 0 18px 0;
    gap: 24px;
    align-items: flex-start;
    animation: slideIn 0.22s;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-60px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;
const MobileMenuHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 12px 8px 0px;
  border-bottom: 1.5px solid ${({ theme }) => theme.border};
`;
const MobileLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  font-size: 0.95rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  letter-spacing: 1px;
  word-break: break-word;
`;
const MobileLogoImg = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 7px;
  background: transparent;
`;
const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.accent2};
    color: #fff;
  }
`;

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 170px;
  background: ${({ theme }) => theme.card};
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  box-shadow: 0 6px 32px 0 rgba(30,42,120,0.13);
  padding: 10px 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: fadeInY 0.68s;
  @keyframes fadeInY {
    from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
const PopoverBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  border-radius: 8px;
  &:hover {
    background: ${({ theme }) => theme.accent + '22'};
    color: ${({ theme }) => theme.accent};
  }
`;

const MobileSpacer = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;
    flex: 1 1 0%;
  }
`;

const Header = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [popover, setPopover] = useState(false);
  React.useEffect(() => {
    if (!popover) return;
    const close = (e) => {
      if (!e.target.closest('.contact-popover') && !e.target.closest('.contact-btn')) setPopover(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [popover]);
  return (
    <HeaderWrap>
      <Container>
        <Logo href="#hero"><LogoImg src={logo} alt="logo" /> <span>Симбиоз</span></Logo>
        <Nav>
          <NavLink href="#services">Услуги</NavLink>
          <NavLink href="#prices">Тарифы</NavLink>
          <NavLink href="#reviews">Отзывы</NavLink>
        </Nav>
        <MobileSpacer />
        <Right>
          <ThemeBtn onClick={onToggleTheme} aria-label="Переключить тему">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </ThemeBtn>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <OutlineBtn
              as="button"
              className="contact-btn"
              onClick={() => setPopover((v) => !v)}
              aria-haspopup="true"
              aria-expanded={popover}
            >
              Связаться
              {popover && (
                <Popover className="contact-popover">
                  <PopoverBtn href="#tg" onClick={() => setPopover(false)}><FaTelegramPlane /> Telegram</PopoverBtn>
                  <PopoverBtn href="#wa" onClick={() => setPopover(false)}><FaWhatsapp /> WhatsApp</PopoverBtn>
                </Popover>
              )}
            </OutlineBtn>
          </div>
          <FillBtn href="#contact">Начать проект</FillBtn>
          <Burger onClick={() => setOpen(o => !o)} aria-label="Меню">
            {open ? <FaTimes /> : <FaBars />}
          </Burger>
        </Right>
      </Container>
      <MobileMenu open={open}>
        <MobileMenuHeader>
          <MobileLogo href="#hero" onClick={() => setOpen(false)}><MobileLogoImg src={logo} alt="logo" /> <span>Сибиоз</span></MobileLogo>
        </MobileMenuHeader>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, padding: '2px 8px 0 8px', boxSizing: 'border-box' }}>
          <NavLink href="#services" onClick={() => setOpen(false)}>Услуги</NavLink>
          <NavLink href="#prices" onClick={() => setOpen(false)}>Тарифы</NavLink>
          <NavLink href="#reviews" onClick={() => setOpen(false)}>Отзывы</NavLink>
        </div>
      </MobileMenu>
    </HeaderWrap>
  );
};

export default Header; 