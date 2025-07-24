import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { createPortal } from 'react-dom';

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
height: 80px;
background: ${({ theme }) => theme.background === '#0a0a23' ? theme.card : theme.background};
border-radius: 36px;
border: 1.5px solid ${({ theme }) => theme.border};
box-shadow: 0 2px 16px 0 rgba(30,42,120,0.06);
transition: background 0.4s, border-color 0.4s;
@media (max-width: 700px) {
  padding: 0 2vw;
  margin: 10px 2vw 0 2vw;
  height: 64px;
  border-radius: 18px;
  gap: 0;
  justify-content: flex-start;
}
`;
const Logo = styled.a`
display: flex;
align-items: center;
margin-bottom: 2px;    
gap: 10px;
font-size: 1.25rem;
font-weight: 800;
color: ${({ theme }) => theme.text};
text-decoration: none;
//letter-spacing: 1px;
transition: color 0.3s;
@media (max-width: 700px) {
  font-size: 1.05rem;
  gap: 6px;
}
`;
const LogoImg = styled.img`
width: 64px;
height: 64px;
object-fit: contain;
border-radius: 8px;
background: transparent;
@media (max-width: 700px) {
  width: 48px;
  height: 48px;
}
`;
const Nav = styled.nav`
display: flex;
gap: 32px;
flex: 1;
justify-content: center;
@media (max-width: 900px) {
    display: none;
}
`;
const NavLink = styled.a`
color: ${({ theme }) => theme.text};
font-size: 1.22rem;
font-weight: 700;
text-decoration: none;
position: relative;
transition: color 0.3s ease-out, transform 0.2s ease-out;
overflow: hidden;
&:hover {
  color: ${({ theme }) => theme.accent};
  transform: translateY(-2px) scale(1.04);
}
&::after {
  content: '';
  display: block;
  width: 100%;
  height: 2.5px;
  background: linear-gradient(90deg, #3a7bd5 60%, #1e2a78 100%);
  opacity: 0.7;
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(.4,0,.2,1);
}
&:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
@media (max-width: 700px) {
  width: 100%;
  box-sizing: border-box;
  font-size: 1.22rem;
  padding: 18px 0 18px 18px;
  margin: 0;
}
`;
const Right = styled.div`
display: flex;
align-items: center;
gap: 14px;
@media (max-width: 700px) {
    //margin-top: 5px;
  gap: 8px;
}
`;
const ThemeBtn = styled.button`
width: 32px;
height: 32px;
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
padding: 9px 22px;
border-radius: 24px;
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
position: relative;
overflow: hidden;
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
const FillBtn = styled.a`
padding: 10px 22px;
border-radius: 28px;
background: linear-gradient(45deg, #3a7bd5, #1e2a78, #3a7bd5);
background-size: 200% 100%;
animation: gradientShift 5s ease infinite;
color: #fff;
font-weight: 700;
font-size: 1.08rem;
text-decoration: none;
border: none;
transition: background 0.22s, color 0.22s, box-shadow 0.18s, transform 0.18s;
box-shadow: 0 4px 24px 0 rgba(30,42,120,0.13);
letter-spacing: 0.02em;
cursor: pointer;
position: relative;
overflow: hidden;
@media (max-width: 700px) {
  display: none;
}
&:hover {
  background-position: 100% 0;
  box-shadow: 0 8px 32px 0 rgba(58,123,213,0.5);
  transform: translateY(-2px) scale(1.04);
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
`;
const Burger = styled.button`
width: 32px;
height: 32px;
border-radius: 50%;
display: none;
@media (max-width: 900px) {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
    svg {
        margin-left: 0.5px;
    }  
&:hover {
    background: ${({ theme }) => theme.accent};
    color: #fff;
    border-color: ${({ theme }) => theme.accent};
  }
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
  width: 300px;
  max-width: 90vw;
  background: ${({ theme }) => theme.background === '#0a0a23' ? theme.card : theme.background};
  border-radius: 0 22px 22px 0;
  box-shadow: 8px 0 40px 0 rgba(30,42,120,0.18);
  z-index: 200;
  padding: 0 0 28px 0;
  gap: 32px;
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
justify-content: flex-start;
box-sizing: border-box;
padding: 12px 8px 0px;
border-bottom: 1.5px solid ${({ theme }) => theme.border};
min-height: 64px;
`;
const MobileLogo = styled.a`
display: flex;
align-items: center;
gap: 14px;
width: 100%;
font-size: 1.35rem;
font-weight: 900;
color: ${({ theme }) => theme.text};
text-decoration: none;
letter-spacing: 1.5px;
word-break: break-word;
padding: 10px 0 10px 2px;
min-height: 56px;
`;
const MobileLogoImg = styled.img`
width: 72px;
height: 72px;
object-fit: contain;
border-radius: 12px;
background: transparent;
@media (max-width: 500px) {
  width: 56px;
  height: 56px;
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
z-index: 99999;
display: flex;
flex-direction: column;
gap: 2px;
animation: fadeInY 0.68s;
pointer-events: all;
@keyframes fadeInY {
  from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
`;
const PopoverBtn = styled.a`
display: flex;
align-items: center;
gap: 10px;
padding: 7px 12px;
color: ${({ theme }) => theme.text};
text-decoration: none;
font-size: 0.98rem;
font-weight: 600;
border: none;
background: none;
cursor: pointer;
transition: background 0.18s, color 0.18s;
border-radius: 20px;
position: relative;
overflow: hidden;
&:hover {
  background: ${({ theme }) => theme.accent + '22'};
  color: ${({ theme }) => theme.accent};
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
        minWidth: 170,
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
                            ref={contactBtnRef}
                            onClick={() => setPopover((v) => !v)}
                            aria-haspopup="true"
                            aria-expanded={popover}
                        >
                            Связаться
                        </OutlineBtn>
                        <PortalPopover open={popover} anchorRef={contactBtnRef}>
                            <PopoverBtn href="https://t.me/simbioz_tech_bot" onClick={() => setPopover(false)}><FaTelegramPlane /> Telegram</PopoverBtn>
                        </PortalPopover>
                    </div>
                    <FillBtn href="#contact">Начать проект</FillBtn>
                    <Burger onClick={() => setOpen(o => !o)} aria-label={open ? "Закрыть меню" : "Открыть меню"}>
                        {open ? <FaTimes /> : <FaBars />}
                    </Burger>
                </Right>
            </Container>
            <MobileMenu open={open}>
                <MobileMenuHeader>
                    <MobileLogo href="#hero" onClick={() => setOpen(false)}><MobileLogoImg src={logo} alt="logo" /> <span>Симбиоз</span></MobileLogo>
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