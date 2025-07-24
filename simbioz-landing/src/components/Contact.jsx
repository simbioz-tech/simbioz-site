import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaUpload } from 'react-icons/fa';
import * as emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: 64px 0 48px 0;
  background: ${({ theme }) => theme.background === '#0a0a23'
    ? 'linear-gradient(180deg, #0a0a23 0%, #1e2a78 100%)'
    : theme.background};
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  @media (max-width: 900px) {
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

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 24px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

const SuccessMessage = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 24px;
  text-align: center;
  color: #3a7bd5;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

const FormWrap = styled(motion.form)`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
  background: ${({ theme }) => theme.background === '#0a0a23' ? '#18193a' : '#fff'};
  box-shadow: 0 6px 32px 0 rgba(30, 42, 120, 0.2);
  border-radius: 16px;
  padding: 40px 36px 32px 36px;
  grid-template-areas:
    'name email'
    'telegram service'
    'message message'
    'file file'
    'checkbox checkbox'
    'button button';
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 12px 4vw;
    align-items: stretch;
    border-radius: 12px;
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

const Label = styled(motion.label)`
  font-size: 1.04rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2px;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 13px 13px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 0 rgba(58, 123, 213, 0);
  box-sizing: border-box;
  max-width: 100%;
  &:hover {
    transform: scale(1.02);
  }
  &:focus {
    border: 1.5px solid transparent;
    background: linear-gradient(${({ theme }) => theme.card}, ${({ theme }) => theme.card}) 
                padding-box,
                linear-gradient(45deg, #3a7bd5, #1e2a78) border-box;
    box-shadow: 0 0 8px rgba(58, 123, 213, 0.5);
    outline: none;
    transform: scale(1.02);
  }
  @media (max-width: 900px) {
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
  }
`;

const SelectWrap = styled.div`
  width: 100%;
  position: relative;
`;

const Select = styled(motion.select)`
  width: 100%;
  padding: 13px 38px 13px 13px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text || '#0a0a23'};
  font-size: 1rem;
  height: 48px;
  line-height: 1.2;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 0 rgba(58, 123, 213, 0);
  appearance: none;
  box-sizing: border-box;
  max-width: 100%;
  &:hover {
    transform: scale(1.02);
  }
  &:focus {
    border: 1.5px solid transparent;
    background: linear-gradient(${({ theme }) => theme.card}, ${({ theme }) => theme.card}) 
                padding-box,
                linear-gradient(45deg, #3a7bd5, #1e2a78) border-box;
    box-shadow: 0 0 8px rgba(58, 123, 213, 0.5);
    outline: none;
    transform: scale(1.02);
  }
  option {
    background: #1e2a78;
    color: #fff;
    padding: 10px;
    font-size: 1rem;
  }
  @media (max-width: 900px) {
    padding: 10px 32px 10px 8px;
    border-radius: 8px;
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
  transition: transform 0.3s ease;
`;

const FileInputWrap = styled(motion.div)`
  width: 100%;
  padding: 13px 13px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 0 rgba(58, 123, 213, 0);
  box-sizing: border-box;
  max-width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  &:hover {
    border: 1.5px solid transparent;
    background: linear-gradient(${({ theme }) => theme.card}, ${({ theme }) => theme.card}) 
                padding-box,
                linear-gradient(45deg, #3a7bd5, #1e2a78) border-box;
    box-shadow: 0 0 8px rgba(58, 123, 213, 0.5);
    transform: scale(1.02);
  }
  @media (max-width: 900px) {
    padding: 10px 8px;
    border-radius: 8px;
    font-size: 0.97rem;
    width: 100%;
    box-sizing: border-box;
  }
`;

const FileInputIcon = styled(motion.div)`
  display: inline-flex;
`;

const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Textarea = styled(motion.textarea)`
  width: 100%;
  padding: 13px 13px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 100px;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 0 rgba(58, 123, 213, 0);
  resize: none;
  box-sizing: border-box;
  max-width: 100%;
  &:hover {
    transform: scale(1.02);
  }
  &:focus {
    border: 1.5px solid transparent;
    background: linear-gradient(${({ theme }) => theme.card}, ${({ theme }) => theme.card}) 
                padding-box,
                linear-gradient(45deg, #3a7bd5, #1e2a78) border-box;
    box-shadow: 0 0 8px rgba(58, 123, 213, 0.5);
    outline: none;
    transform: scale(1.02);
  }
  @media (max-width: 900px) {
    padding: 10px 6px;
    font-size: 0.98rem;
    border-radius: 8px;
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
  @media (max-width: 900px) {
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
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
`;

const Button = styled(motion.button)`
  flex: 1 1 0;
  padding: 18px 0;
  border-radius: 32px;
  background: linear-gradient(45deg, #3a7bd5, #1e2a78, #3a7bd5);
  background-size: 200% 100%;
  animation: gradientShift 5s ease infinite;
  color: #fff;
  font-weight: 700;
  font-size: 1.18rem;
  border: none;
  transition: background 0.3s, box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 4px 24px 0 rgba(30, 42, 120, 0.3);
  letter-spacing: 0.02em;
  cursor: pointer;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  &:hover {
    background-position: 100% 0;
    box-shadow: 0 8px 32px 0 rgba(58, 123, 213, 0.5);
    transform: translateY(-2px) scale(1.05) rotate(2deg);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
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
  @media (max-width: 900px) {
    padding: 28px 0;
    font-size: 1rem;
    border-radius: 20px;
    width: 100%;
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
  width: 18px;
  height: 18px;
  accent-color: ${({ theme }) => theme.accent};
`;

const GithubLink = styled(motion.a)`
  display: inline-flex;
  margin: 0 12px;
  color: #3a7bd5;
  position: relative;
  overflow: hidden;
  &:hover {
    color: #2e3a8c;
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
  );
};

export default Contact;