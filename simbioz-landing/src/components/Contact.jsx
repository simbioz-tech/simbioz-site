import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaUpload } from 'react-icons/fa';
import * as emailjs from '@emailjs/browser';

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
    width: 100vw;
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0 2vw;
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
  grid-template-areas:
    'name email'
    'telegram service'
    'message message'
    'file file'
    'checkbox checkbox'
    'button button';
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 12px 4vw;
    align-items: stretch;
  }
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  &[data-area='name'] { grid-area: name; }
  &[data-area='email'] { grid-area: email; }
  &[data-area='telegram'] { grid-area: telegram; }
  &[data-area='service'] { grid-area: service; }
  &[data-area='file'] { grid-area: file; }
  &[data-area='message'] { grid-area: message; }
  &[data-area='checkbox'] { grid-area: checkbox; }
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
  box-sizing: border-box;
  max-width: 100%;
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.accent + '33'};
    outline: none;
  }
  @media (max-width: 700px) {
    width: 100%;
    box-sizing: border-box;
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
  box-sizing: border-box;
  max-width: 100%;
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
    width: 100%;
    box-sizing: border-box;
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
  box-sizing: border-box;
  max-width: 100%;
  &:hover {
    border-color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.card + 'cc'};
  }
  @media (max-width: 700px) {
    padding: 9px 6px;
    border-radius: 7px;
    font-size: 0.97rem;
    width: 100%;
    box-sizing: border-box;
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
  resize: none;
  box-sizing: border-box;
  max-width: 100%;
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
    width: 100%;
    box-sizing: border-box;
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
  grid-area: button;
  @media (min-width: 701px) {
    max-width: 340px;
    margin: 0 auto;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
`;
const Button = styled.button`
  flex: 1 1 0;
  padding: 18px 0;
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
    width: 100%;
  }
`;
const Checkbox = styled.input`
  margin-right: 8px;
  width: 18px;
  height: 18px;
  accent-color: ${({ theme }) => theme.accent};
`;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', telegram: '', service: '', message: '', fileName: '', file: null });
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = e => {
    if (e.target.name === 'file') {
      const file = e.target.files[0];
      if (file && file.size > 50 * 1024 * 1024) {
        alert('Файл слишком большой для Telegram (макс. 50 МБ).');
        return;
      }
      setForm(f => ({ ...f, fileName: file?.name || '', file }));
    } else if (e.target.name === 'telegram') {
      const value = e.target.value;
      if (value && !/^@[\w]{5,}$/.test(value)) {
        console.warn('Telegram должен начинаться с @ и содержать минимум 5 символов');
      }
      setForm({ ...form, [e.target.name]: value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const sendToTelegram = async () => {
    const TELEGRAM_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN;
    const CHAT_IDS = import.meta.env.VITE_CHAT_IDS?.split(',').filter(id => id.trim());

    console.log('TELEGRAM_TOKEN:', TELEGRAM_TOKEN);
    console.log('CHAT_IDS:', CHAT_IDS);

    if (!TELEGRAM_TOKEN || !CHAT_IDS || CHAT_IDS.length === 0) {
      const error = 'Ошибка: Не настроены VITE_TELEGRAM_TOKEN или VITE_CHAT_IDS в файле .env';
      console.error(error);
      throw new Error(error);
    }

    const text = `📩 Новая заявка на проект\n👤 Имя: ${form.name}\n📧 Email: ${form.email}\n📱 Telegram: ${form.telegram || 'Отсутствует'}\n🛠 Услуга: ${form.service}\n📄 Файл: ${form.fileName || 'Отсутствует'}\n💬 Сообщение: ${form.message}\n🕒 Дата: ${new Date().toLocaleString('ru-RU')}`;

    let successCount = 0;
    const errors = [];

    for (const chatId of CHAT_IDS) {
      try {
        const textResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`
        );
        const textResult = await textResponse.json();
        if (!textResult.ok) {
          throw new Error(`Ошибка Telegram: ${textResult.description} (Код: ${textResult.error_code})`);
        }

        if (form.file) {
          const formData = new FormData();
          formData.append('chat_id', chatId);
          formData.append('document', form.file);
          const fileResponse = await fetch(
              `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendDocument`,
              { method: 'POST', body: formData }
          );
          const fileResult = await fileResponse.json();
          if (!fileResult.ok) {
            throw new Error(`Ошибка отправки файла в Telegram: ${fileResult.description} (Код: ${fileResult.error_code})`);
          }
        }
        successCount++;
      } catch (error) {
        console.error(`Ошибка Telegram для chat_id ${chatId}:`, String(error));
        errors.push(`chat_id ${chatId}: ${String(error)}`);
      }
    }

    if (successCount === 0 && errors.length > 0) {
      throw new Error(errors.join('; '));
    }
  };

  const sendToEmailJS = async () => {
    const templateParams = {
      name: form.name,
      email: form.email,
      telegram: form.telegram || 'Отсутствует',
      service: form.service,
      message: form.message,
      fileName: form.fileName || 'Отсутствует',
    };

    const response = await emailjs.send('service_59s2dmm', 'template_pw6tm97', templateParams, 'KxtJzTzRKUHJ1pswJ');
    if (response.status !== 200) throw new Error(`Ошибка EmailJS: ${response.text || 'Неизвестная ошибка'} (Код: ${response.status})`);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!agree) {
      alert('Необходимо согласиться с политикой конфиденциальности.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      await sendToEmailJS();
      await sendToTelegram();
      setSent(true);
      setForm({ name: '', email: '', telegram: '', service: '', message: '', fileName: '', file: null });
      setAgree(false);
      e.target.querySelector('#file').value = '';
    } catch (error) {
      const errorMsg = String(error);
      console.error('Ошибка отправки:', errorMsg);
      setErrorMessage(
          `Ошибка отправки: ${
              errorMsg.includes('VITE_TELEGRAM_TOKEN') ? 'Не настроены Telegram ключи в .env' :
                  errorMsg.includes('EmailJS') ? 'Ошибка EmailJS (проверьте ключи, шаблон или лимит писем)' :
                      errorMsg.includes('chat not found') ? 'Ошибка Telegram: Неверный chat_id в VITE_CHAT_IDS' :
                          errorMsg
          }. Попробуйте позже.`
      );
    } finally {
      setLoading(false);
    }
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
                <Field data-area="name">
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input id="name" name="name" type="text" placeholder="Иван Иванов" value={form.name} onChange={handleChange} required />
                </Field>
                <Field data-area="email">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="example@mail.com" value={form.email} onChange={handleChange} required />
                </Field>
                <Field data-area="telegram">
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input id="telegram" name="telegram" type="text" placeholder="@username" value={form.telegram} onChange={handleChange} />
                </Field>
                <Field data-area="service">
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
                <Field data-area="file">
                  <Label htmlFor="file">Прикрепить файл (PDF, Word, до 50 МБ)</Label>
                  <FileInputWrap>
                    <FaUpload />
                    <span>{form.fileName || 'Выберите файл'}</span>
                    <FileInput id="file" name="file" type="file" accept=".pdf,.doc,.docx" onChange={handleChange} />
                  </FileInputWrap>
                </Field>
                <Field data-area="message">
                  <Label htmlFor="message">Описание проекта *</Label>
                  <Textarea id="message" name="message" placeholder="Расскажите о вашем проекте, целях и пожеланиях..." value={form.message} onChange={handleChange} required />
                </Field>
                <Field data-area="checkbox">
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
                {errorMessage && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', color: '#ff4444', fontWeight: 600, fontSize: '1rem', marginTop: '16px' }}>
                      {errorMessage}
                    </motion.p>
                )}
              </FormWrap>
          )}
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a href="https://github.com/simbioz-tech" style={{ margin: '0 12px', color: '#3a7bd5' }}><FaGithub size={28} /></a>
          </div>
        </Container>
      </Section>
  );
};

export default Contact;