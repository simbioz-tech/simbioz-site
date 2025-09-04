import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { createPortal } from 'react-dom';

const HeaderWrap = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: transparent;
  padding: 0;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 16px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 70px;
  background: ${({ theme }) => theme.card};
  border-radius: 35px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  
  /* Отключаем backdrop-filter для производительности */
  
  /* Hover эффект только для десктопа */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: 0 8px 24px rgba(0, 180, 216, 0.1);
      border-color: rgba(0, 180, 216, 0.2);
    }
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 12px 16px 0 16px;
    height: 56px;
    border-radius: 28px;
    
    /* Отключаем сложные анимации на мобильных */
    transition: none;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.4rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  outline: none;
  
  /* Простые переходы */
  transition: transform 0.1s ease;
  
  /* Hover эффект только для десктопа */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(1.02);
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 6px;
    font-weight: 700;
    
    /* Отключаем сложные анимации на мобильных */
    transition: transform 0.1s ease;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    gap: 5px;
  }
`;

const LogoImg = styled.img`
  width: 42px;
  height: 42px;
  object-fit: contain;
  border-radius: 10px;
  background: transparent;
  transition: transform 0.1s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 40px;
  flex: 1;
  justify-content: center;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  transition: color 0.1s ease;
  padding: 8px 16px;
  border-radius: 20px;
  outline: none;
  
  &:hover {
    background: rgba(0, 180, 216, 0.1);
    color: #00b4d8;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00b4d8, #e63946);
    transition: width 0.2s ease;
  }
  
  &:hover::after {
    width: 80%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const OutlineBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 20px;
  border: 2px solid transparent;
  background: linear-gradient(${({ theme }) => theme.card}, ${({ theme }) => theme.card}) padding-box,
              linear-gradient(135deg, #00b4d8, #e63946) border-box;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #00b4d8, #e63946);
    transition: left 0.2s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: scale(1.02);
    color: white;
    
    &::before {
      left: 0;
    }
  }
  
  &:active {
    transform: translateY(0px) scale(0.98);
  }
  
  @media (max-width: 768px) {
    display: none;
    
    /* Показываем в мобильном меню */
    .mobile-menu & {
      display: flex;
      width: 100%;
      padding: 12px 20px;
      font-size: 1rem;
    }
  }
`;

const FillBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 20px;
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
  outline: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e63946, #00b4d8);
    transition: left 0.2s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 180, 216, 0.4);
    
    &::before {
      left: 0;
    }
  }
  
  &:active {
    transform: translateY(0px) scale(0.98);
  }
  
  @media (max-width: 768px) {
    display: none;
    
    /* Показываем в мобильном меню */
    .mobile-menu & {
      display: flex;
      width: 100%;
      padding: 12px 20px;
      font-size: 1rem;
    }
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(${({ theme }) => theme.card}, ${({ theme }) => theme.card}) padding-box,
              linear-gradient(135deg, #00b4d8, #e63946) border-box;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  
  &:hover {
    transform: scale(1.1);
    color: #00b4d8;
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(${({ theme }) => theme.card}, ${({ theme }) => theme.card}) padding-box,
              linear-gradient(135deg, #00b4d8, #e63946) border-box;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  
  &:hover {
    transform: scale(1.1);
    color: #00b4d8;
  }
  
  @media (max-width: 900px) {
    display: flex;
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 900px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    max-width: 80vw;
    background: ${({ theme }) => theme.card};
    border-radius: 0 24px 24px 0;
    box-shadow: 8px 0 32px rgba(0, 0, 0, 0.2);
    z-index: 200;
    padding: 0 0 32px 0;
    gap: 32px;
    align-items: flex-start;
    animation: slideIn 0.2s ease;
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

const MobileMenuHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  min-height: 80px;
`;

const MobileLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  padding: 12px 0;
  min-height: 60px;
  outline: none;
`;

const MobileLogoImg = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 16px;
  background: transparent;
`;

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 180px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 12px 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: fadeInY 0.1s ease;
  pointer-events: all;
  
  @keyframes fadeInY {
    from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;

const PopoverBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 12px;
  position: relative;
  outline: none;
  
  &:hover {
    background: ${({ theme }) => theme.techBg};
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

const PortalPopover = ({ children, open, anchorRef }) => {
  if (!open || !anchorRef?.current) return null;
  const rect = anchorRef.current.getBoundingClientRect();
  const style = {
    position: 'fixed',
    top: rect.bottom + 8,
    left: rect.left + rect.width / 2,
    transform: 'translateX(-50%)',
    zIndex: 99999,
    minWidth: 180,
  };
  return createPortal(
    <Popover style={style} className="contact-popover">{children}</Popover>,
    document.body
  );
};

const Header = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [popover, setPopover] = useState(false);
  const contactBtnRef = React.useRef();
  
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
        <Logo href="#hero">
          <LogoImg src={logo} alt="logo" />
          <span>Симбиоз</span>
        </Logo>
        
        <Nav>
          <NavLink href="#services">Услуги</NavLink>
          <NavLink href="#prices">Тарифы</NavLink>
          <NavLink href="#reviews">Отзывы</NavLink>
        </Nav>
        
        <MobileSpacer />
        
        <ButtonGroup>
          <ThemeToggle onClick={onToggleTheme} aria-label="Переключить тему">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <OutlineBtn
              as="button"
              className="contact-btn"
              ref={contactBtnRef}
              onClick={() => setPopover((v) => !v)}
              aria-haspopup="true"
              aria-expanded={popover}
            >
              Связаться
            </OutlineBtn>
            <PortalPopover open={popover} anchorRef={contactBtnRef}>
              <PopoverBtn href="https://t.me/simbioz_tech_bot" onClick={() => setPopover(false)}>
                <FaTelegramPlane />
                Telegram
              </PopoverBtn>
            </PortalPopover>
          </div>
          
          <FillBtn as="a" href="#contact">
            Начать проект
          </FillBtn>
          
          <MobileMenuBtn onClick={() => setOpen(o => !o)} aria-label={open ? "Закрыть меню" : "Открыть меню"}>
            {open ? <FaTimes /> : <FaBars />}
          </MobileMenuBtn>
        </ButtonGroup>
      </Container>
      
      <MobileMenu open={open} className="mobile-menu">
        <MobileMenuHeader>
          <MobileLogo href="#hero" onClick={() => setOpen(false)}>
            <MobileLogoImg src={logo} alt="logo" />
            <span>Симбиоз</span>
          </MobileLogo>
        </MobileMenuHeader>
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, padding: '0 20px', boxSizing: 'border-box' }}>
          <NavLink href="#services" onClick={() => setOpen(false)}>Услуги</NavLink>
          <NavLink href="#prices" onClick={() => setOpen(false)}>Тарифы</NavLink>
          <NavLink href="#reviews" onClick={() => setOpen(false)}>Отзывы</NavLink>
          
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <OutlineBtn as="a" href="https://t.me/simbioz_tech_bot" style={{ display: 'flex', justifyContent: 'center' }}>
              <FaTelegramPlane />
              Связаться в Telegram
            </OutlineBtn>
          </div>
        </div>
      </MobileMenu>
    </HeaderWrap>
  );
};

export default Header;