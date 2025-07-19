import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Section = styled.section`
  padding: 64px 0 48px 0;
`;
const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 24px;
  text-align: center;
`;
const FormWrap = styled.form`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
  background: ${({ theme }) => theme.background === '#0a0a23' ? '#18193a' : '#fff'};
  box-shadow: 0 6px 32px 0 rgba(30,42,120,0.13);
  border-radius: 16px;
  padding: 40px 36px 32px 36px;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 4vw;
    align-items: center;
  }
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Label = styled.label`
  font-size: 1.04rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2px;
`;
const Input = styled.input`
  width: 100%;
  padding: 13px 13px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.22s, box-shadow 0.22s;
  box-shadow: 0 0 0 0 rgba(58,123,213,0);
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.accent + '33'};
    outline: none;
  }
`;
const SelectWrap = styled.div`
  width: 100%;
  position: relative;
`;
const Select = styled.select`
  width: 100%;
  padding: 13px 38px 13px 13px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  height: 48px;
  line-height: 1.2;
  transition: border-color 0.22s, box-shadow 0.22s;
  box-shadow: 0 0 0 0 rgba(58,123,213,0);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.accent + '33'};
    outline: none;
  }
  @media (max-width: 700px) {
    padding: 10px 32px 10px 8px;
    border-radius: 7px;
    font-size: 0.97rem;
    height: 40px;
  }
`;
const SelectArrow = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  width: 16px;
  height: 16px;
  pointer-events: none;
  transform: translateY(-50%);
  background: url('data:image/svg+xml;utf8,<svg fill="%237a88c9" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat center/contain;
  opacity: 0.7;
`;
const FileInputWrap = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 13px;
  border-radius: 10px;
  border: 1.5px dashed ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.22s, background 0.22s;
  &:hover {
    border-color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.card + 'cc'};
  }
  @media (max-width: 700px) {
    padding: 9px 6px;
    border-radius: 7px;
    font-size: 0.97rem;
  }
`;
const FileInput = styled.input`
  display: none;
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 13px 13px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 100px;
  transition: border-color 0.22s, box-shadow 0.22s;
  box-shadow: 0 0 0 0 rgba(58,123,213,0);
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.accent + '33'};
    outline: none;
  }
  @media (max-width: 700px) {
    padding: 10px 6px;
    font-size: 0.98rem;
    border-radius: 7px;
    min-height: 70px;
  }
`;
const CheckboxWrap = styled.label`
  display: flex;
  align-items: flex-start;
  font-size: 0.97rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0;
  cursor: pointer;
  gap: 8px;
  user-select: none;
  text-align: left;
  line-height: 1.3;
  width: 100%;
  @media (max-width: 700px) {
    font-size: 0.95rem;
    gap: 6px;
    flex-direction: column;
    align-items: flex-start;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 18px;
  width: 100%;
  justify-content: center;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 8px;
  }
`;
const Button = styled.button`
  flex: 1 1 0;
  padding: 18px 100px;
  border-radius: 32px;
  background: ${({ secondary }) => secondary ? 'transparent' : 'linear-gradient(90deg, #3a7bd5 0%, #1e2a78 100%)'};
  color: ${({ secondary }) => secondary ? '#fff' : '#fff'};
  font-weight: 700;
  font-size: 1.18rem;
  text-decoration: none;
  border: ${({ secondary, theme }) => secondary ? '2px solid ' + theme.border : 'none'};
  transition: background 0.22s, color 0.22s, box-shadow 0.18s, transform 0.18s;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.13);
  letter-spacing: 0.02em;
  cursor: pointer;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover {
    background: ${({ secondary }) => secondary ? '#23234a' : 'linear-gradient(90deg, #1e2a78 0%, #3a7bd5 100%)'};
    color: #fff;
    box-shadow: 0 8px 32px 0 rgba(30,42,120,0.18);
    transform: translateY(-2px) scale(1.04);
  }
  @media (max-width: 700px) {
    padding: 12px 0;
    font-size: 1rem;
    border-radius: 16px;
  }
`;
const Checkbox = styled.input`
  margin-right: 8px;
  width: 18px;
  height: 18px;
  accent-color: ${({ theme }) => theme.accent};
`;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '', fileName: '' });
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (!agree) {
      alert('Необходимо согласиться с политикой конфиденциальности.');
      return;
    }
    setLoading(true);
    emailjs.send('service_xxx', 'template_xxx', form, 'user_xxx')
      .then(() => {
        setSent(true);
        setLoading(false);
        setForm({ name: '', email: '', service: '', message: '', fileName: '' });
        setAgree(false);
      })
      .catch(() => {
        setLoading(false);
        alert('Ошибка отправки. Попробуйте позже.');
      });
  };

  return (
    <Section id="contact">
      <Container>
        <Title>Оставьте заявку на проект</Title>
        {sent ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', color: '#3a7bd5', fontWeight: 600, fontSize: '1.2rem' }}>
            Спасибо! Мы свяжемся с вами для обсуждения деталей.
          </motion.p>
        ) : (
          <FormWrap onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="name">Ваше имя *</Label>
              <Input id="name" name="name" type="text" placeholder="Иван Иванов" value={form.name} onChange={handleChange} required />
            </Field>
            <Field>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" placeholder="example@mail.com" value={form.email} onChange={handleChange} required />
            </Field>
            <Field>
              <Label htmlFor="service">Услуга *</Label>
              <SelectWrap>
                <Select id="service" name="service" value={form.service} onChange={handleChange} required>
                  <option value="">Выберите услугу</option>
                  <option value="Backend">Backend-решение</option>
                  <option value="ML/AI">ML/AI проект</option>
                  <option value="Интеграция">Интеграция сервисов</option>
                  <option value="DevOps">DevOps/CI-CD</option>
                  <option value="Консалтинг">Консалтинг/Аудит</option>
                  <option value="Другое">Другое</option>
                </Select>
                <SelectArrow />
              </SelectWrap>
            </Field>
            <Field>
              <Label htmlFor="file">Прикрепить файл (PDF, Word)</Label>
              <FileInputWrap>
                <FaUpload />
                <span>{form.fileName || 'Выберите файл'}</span>
                <FileInput id="file" type="file" accept=".pdf,.doc,.docx" onChange={e => setForm(f => ({ ...f, fileName: e.target.files[0]?.name || '' }))} />
              </FileInputWrap>
            </Field>
            <Field style={{ gridColumn: '1/3' }}>
              <Label htmlFor="message">Описание проекта *</Label>
              <Textarea id="message" name="message" placeholder="Расскажите о вашем проекте, целях и пожеланиях..." value={form.message} onChange={handleChange} required />
            </Field>
            <Field style={{ gridColumn: '1/3', alignItems: 'center' }}>
              <CheckboxWrap>
                <Checkbox type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} required />
                Я соглашаюсь с <a href="#" style={{ color: '#3a7bd5', textDecoration: 'underline' }}>политикой конфиденциальности</a> и даю согласие на обработку персональных данных
              </CheckboxWrap>
            </Field>
            <ButtonRow>
              <Button type="submit" disabled={loading}>
                {loading ? 'Отправка...' : 'Отправить заявку'}
                <span style={{ fontSize: 18, marginLeft: 4 }}>↗</span>
              </Button>
            </ButtonRow>
          </FormWrap>
        )}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          {/* <a href="mailto:info@simbioz.team" style={{ margin: '0 12px', color: '#3a7bd5' }}><FaEnvelope size={28} /></a> */}
          <a href="https://github.com/simbioz-tech" style={{ margin: '0 12px', color: '#3a7bd5' }}><FaGithub size={28} /></a>
          {/* <a href="#" style={{ margin: '0 12px', color: '#3a7bd5' }}><FaLinkedin size={28} /></a> */}
        </div>
      </Container>
    </Section>
  );
};

export default Contact; 