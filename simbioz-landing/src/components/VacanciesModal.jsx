import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(10,16,40,0.55);
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(30,42,120,0.18);
  padding: 10px;
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 540px;
  min-width: 0;
  min-height: 0;
  max-height: 80vh;
  width: 98vw;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar { display: none; } /* Chrome, Safari */
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px; right: 18px;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:hover { color: #3a7bd5; }
`;

const VacanciesTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const VacanciesDesc = styled.p`
  font-size: 1.08rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 18px;
  text-align: center;
`;

const VacanciesIframe = styled.iframe`
  width: 100%;
  min-height: 600px;
  border: none;
  border-radius: 12px;
  background: #fff;
`;

export default function VacanciesModal({ open, onClose }) {
  if (!open) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={onClose} aria-label="Закрыть">×</CloseBtn>
        <VacanciesTitle>Вакансии</VacanciesTitle>
        <VacanciesDesc>
          Хотите работать с нами? Заполните короткую форму — мы всегда рады талантам!
        </VacanciesDesc>
        <VacanciesIframe
          src="https://forms.yandex.ru/u/684ee87902848f2f7f89af50/"
          title="Форма отклика на вакансию"
          allowFullScreen
        />
      </ModalContent>
    </ModalOverlay>
  );
}
