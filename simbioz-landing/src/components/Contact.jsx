import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaUpload } from 'react-icons/fa';
import * as emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: 100px 0 80px 0;
  background: ${({ theme }) => theme.background};
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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 30px;
  text-align: center;
  font-weight: 800;
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #00b4d8, #e63946);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const SuccessMessage = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: 24px;
  text-align: center;
  color: #00b4d8;
  font-weight: 700;
`;

const FormWrap = styled(motion.form)`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.border};
  
  // Glassmorphism эффект
  backdrop-filter: blur(8px);
  background: ${({ theme }) => 
    theme.background === '#ffffff' 
      ? 'rgba(248, 249, 250, 0.8)' 
      : 'rgba(26, 26, 26, 0.8)'
  };
  
  grid-template-areas:
    'name email'
    'telegram service'
    'message message'
    'file file'
    'checkbox checkbox'
    'button button';
    
  grid-template-rows: auto auto auto auto auto auto;
    
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 32px 24px;
    align-items: stretch;
    border-radius: 16px;
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
  &[data-area='button'] { 
    grid-area: button; 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const Label = styled(motion.label)`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  max-width: 100%;
  
  &:hover {
    border-color: rgba(0, 180, 216, 0.3);
  }
  
  &:focus {
    border: 2px solid #00b4d8;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
  }
  
  @media (max-width: 900px) {
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
  }
`;

const SelectWrap = styled.div`
  width: 100%;
  position: relative;
`;

const Select = styled(motion.select)`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  height: 48px;
  line-height: 1.2;
  transition: all 0.2s ease;
  appearance: none;
  box-sizing: border-box;
  max-width: 100%;
  
  &:hover {
    border-color: rgba(0, 180, 216, 0.3);
  }
  
  &:focus {
    border: 2px solid #00b4d8;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
  }
  
  option {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    padding: 10px;
    font-size: 1rem;
  }
  
  @media (max-width: 900px) {
    padding: 12px 36px 12px 12px;
    border-radius: 10px;
    font-size: 1rem;
    height: 48px;
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
  background: url('data:image/svg+xml;utf8,<svg fill="%2300b4d8" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat center/contain;
  opacity: 0.7;
  transition: transform 0.2s ease;
`;

const FileInputWrap = styled(motion.div)`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 2px dashed ${({ theme }) => theme.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #00b4d8;
    background: rgba(0, 180, 216, 0.05);
  }
  
  &.has-file {
    border-color: #00b4d8;
    background: rgba(0, 180, 216, 0.1);
  }
`;

const FileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const FileInputIcon = styled(motion.div)`
  font-size: 1.2rem;
  color: #00b4d8;
`;

const Textarea = styled(motion.textarea)`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;
  box-sizing: border-box;
  font-family: inherit;
  
  &:hover {
    border-color: rgba(0, 180, 216, 0.3);
  }
  
  &:focus {
    border: 2px solid #00b4d8;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
  }
  
  @media (max-width: 900px) {
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
  }
`;

const CheckboxWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #00b4d8;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  cursor: pointer;
  
  a {
    color: #00b4d8;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Button = styled(motion.button)`
  width: auto;
  min-width: 250px;
  padding: 16px 32px;
  border-radius: 24px;
  background: linear-gradient(135deg, #00b4d8 0%, #e63946 100%);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 180, 216, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 900px) {
    padding: 14px 24px;
    font-size: 1rem;
    width: 100%;
    min-width: unset;
  }
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
      if (value && !/^\w{5,}$/.test(value)) {
        console.warn('Telegram username должен содержать минимум 5 символов');
      }
      setForm({ ...form, [e.target.name]: value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const sendToTelegram = async () => {
    const TELEGRAM_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN;
    const CHAT_IDS = import.meta.env.VITE_CHAT_IDS?.split(',').map(id => id.trim()).filter(id => id) || [];

    console.log('Attempting to send to Telegram. Token exists:', !!TELEGRAM_TOKEN, 'Chat IDs:', CHAT_IDS);

    if (!TELEGRAM_TOKEN) {
      const error = 'Ошибка: VITE_TELEGRAM_TOKEN не указан в .env или недействителен';
      console.error(error);
      throw new Error(error);
    }
    if (CHAT_IDS.length === 0) {
      const error = 'Ошибка: VITE_CHAT_IDS пуст или не указан в .env';
      console.error(error);
      throw new Error(error);
    }

    const telegramLink = form.telegram ? `https://t.me/${form.telegram}` : 'Отсутствует';
    const text = `📩 Новая заявка на проект\n👤 Имя: ${form.name}\n📧 Email: ${form.email}\n📱 Telegram: ${telegramLink}\n🛠 Услуга: ${form.service}\n📄 Файл: ${form.fileName || 'Отсутствует'}\n💬 Сообщение: ${form.message}\n🕒 Дата: ${new Date().toLocaleString('ru-RU')}`;

    const errors = [];
    let successCount = 0;

    for (const chatId of CHAT_IDS) {
      try {
        console.log(`Sending message to chat_id: ${chatId}`);
        const textResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`
        );
        const textResult = await textResponse.json();
        console.log(`Telegram response for chat_id ${chatId}:`, textResult);
        if (!textResult.ok) {
          throw new Error(`Ошибка Telegram: ${textResult.description} (Код: ${textResult.error_code})`);
        }

        if (form.file) {
          console.log(`Sending file to chat_id: ${chatId}`);
          const formData = new FormData();
          formData.append('chat_id', chatId);
          formData.append('document', form.file);
          const fileResponse = await fetch(
              `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendDocument`,
              { method: 'POST', body: formData }
          );
          const fileResult = await fileResponse.json();
          console.log(`File response for chat_id ${chatId}:`, fileResult);
          if (!fileResult.ok) {
            throw new Error(`Ошибка отправки файла: ${fileResult.description} (Код: ${fileResult.error_code})`);
          }
        }
        successCount++;
      } catch (error) {
        console.error(`Ошибка для chat_id ${chatId}:`, error);
        errors.push(`chat_id ${chatId}: ${error.message}`);
      }
    }

    if (successCount === 0) {
      throw new Error(`Не удалось отправить уведомления: ${errors.join('; ')}`);
    } else if (errors.length > 0) {
      console.warn(`Частичные ошибки при отправке: ${errors.join('; ')}`);
    }
  };

  const sendToEmailJS = async () => {
    const telegramLink = form.telegram ? `https://t.me/${form.telegram}` : 'Отсутствует';
    const templateParams = {
      name: form.name,
      email: form.email,
      telegram: telegramLink,
      service: form.service,
      message: form.message,
      fileName: form.fileName || 'Отсутствует',
    };

    const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    console.log('EmailJS response:', response);
    if (response.status !== 200) throw new Error(`Ошибка EmailJS: ${response.text || 'Неизвестная ошибка'}`);
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
      await Promise.all([sendToEmailJS(), sendToTelegram()]);
      setSent(true);
      setForm({ name: '', email: '', telegram: '', service: '', message: '', fileName: '', file: null });
      setAgree(false);
      e.target.querySelector('#file').value = '';
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setErrorMessage(
          error.message.includes('VITE_TELEGRAM_TOKEN') ? 'Не настроены Telegram ключи в .env или токен недействителен' :
              error.message.includes('chat not found') ? 'Неверный chat_id в VITE_CHAT_IDS. Проверьте ID в .env' :
                  error.message.includes('EmailJS') ? 'Ошибка EmailJS: проверьте ключи или лимит' :
                      `Ошибка: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <Section id="contact">
          <Container>
            {!sent && (
                <Title
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                  Оставьте заявку на проект
                </Title>
            )}
            {sent ? (
                <SuccessMessage
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                  Спасибо! Мы свяжемся с вами для обсуждения деталей.
                </SuccessMessage>
            ) : (
                <FormWrap
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    onSubmit={handleSubmit}
                >
                  <Field data-area="name">
                    <Label
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        htmlFor="name"
                    >
                      Ваше имя *
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Иван Иванов"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                  </Field>
                  <Field data-area="email">
                    <Label
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        htmlFor="email"
                    >
                      Email *
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                  </Field>
                  <Field data-area="telegram">
                    <Label
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        htmlFor="telegram"
                    >
                      Telegram
                    </Label>
                    <Input
                        id="telegram"
                        name="telegram"
                        type="text"
                        placeholder="username (без @)"
                        value={form.telegram}
                        onChange={handleChange}
                    />
                  </Field>
                  <Field data-area="service">
                    <Label
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        htmlFor="service"
                    >
                      Услуга *
                    </Label>
                    <SelectWrap>
                      <Select
                          id="service"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          required
                      >
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
                    <Label
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        htmlFor="file"
                    >
                      Прикрепить файл (PDF, Word, до 50 МБ)
                    </Label>
                    <FileInputWrap
                        whileTap={{ scale: 0.98 }}
                    >
                      <FileInputIcon
                          animate={form.fileName ? { rotate: 360 } : { rotate: 0 }}
                          transition={{ duration: 0.5 }}
                      >
                        <FaUpload />
                      </FileInputIcon>
                      <span>{form.fileName || 'Выберите файл'}</span>
                      <FileInput
                          id="file"
                          name="file"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleChange}
                      />
                    </FileInputWrap>
                  </Field>
                  <Field data-area="message">
                    <Label
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        htmlFor="message"
                    >
                      Описание проекта *
                    </Label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Расскажите о вашем проекте, целях и пожеланиях..."
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                  </Field>
                  <Field data-area="checkbox">
                    <CheckboxWrap>
                      <Checkbox type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} required />
                      Я соглашаюсь с <Link to="/privacy" style={{ color: '#3a7bd5', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">политикой конфиденциальности</Link> и даю согласие на обработку персональных данных
                    </CheckboxWrap>
                  </Field>
                  <ButtonRow>
                    <Button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                      {loading ? 'Отправка...' : 'Отправить заявку'}
                      <span style={{ fontSize: 18, marginLeft: 4 }}>↗</span>
                    </Button>
                  </ButtonRow>
                  {errorMessage && (
                      <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ textAlign: 'center', color: '#ff4444', fontWeight: 600, fontSize: '1rem', marginTop: '16px' }}
                      >
                        {errorMessage}
                      </motion.p>
                  )}
                </FormWrap>
            )}
          </Container>
        </Section>
      </>
  );
};

export default Contact;