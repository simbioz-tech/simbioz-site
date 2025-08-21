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

const FileIcon = styled(FaUpload)`
  font-size: 1.2rem;
  color: #00b4d8;
`;

const FileText = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  font-weight: 500;
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

const SubmitButton = styled(motion.button)`
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

const services = [
  'Выберите услугу',
  'Frontend и клиентская логика',
  'Backend и архитектура',
  'DevOps и инфраструктура',
  'Машинное обучение и AI',
  'Интеграции и поддержка',
  'Консалтинг и аудит'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    service: '',
    message: '',
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return;
    
    setIsSubmitting(true);
    
    try {
      // Здесь будет логика отправки формы
      await new Promise(resolve => setTimeout(resolve, 2000)); // Имитация отправки
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка отправки:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Section id="contact">
        <Container>
          <SuccessMessage
                          initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.0 }}
          >
            Спасибо! Ваша заявка отправлена
          </SuccessMessage>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 2.0 }}
            style={{ textAlign: 'center', color: 'var(--text)', opacity: 0.8 }}
          >
            Мы свяжемся с вами в ближайшее время
          </motion.p>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="contact" ref={sectionRef}>
      <Container>
        <Title>
          Оставьте заявку на проект
        </Title>
        <Subtitle>
          Расскажите о вашем проекте, и мы свяжемся с вами для обсуждения деталей
        </Subtitle>
        
        <FormWrap
          onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 2.0 }}
        >
          <Field data-area="name">
            <Label>Имя *</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Ваше имя"
            />
          </Field>
          
          <Field data-area="email">
            <Label>Email *</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your@email.com"
            />
          </Field>
          
          <Field data-area="telegram">
            <Label>Telegram</Label>
            <Input
              type="text"
              name="telegram"
              value={formData.telegram}
              onChange={handleInputChange}
              placeholder="@username"
            />
          </Field>
          
          <Field data-area="service">
            <Label>Услуга *</Label>
            <SelectWrap>
              <Select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
              >
                {services.map(service => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </Select>
              <SelectArrow />
            </SelectWrap>
          </Field>
          
          <Field data-area="message">
            <Label>Описание проекта *</Label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Опишите ваш проект, задачи и цели..."
            />
          </Field>
          
          <Field data-area="file">
            <Label>Прикрепить файлы</Label>
            <FileInputWrap className={formData.file ? 'has-file' : ''}>
              <FileInput
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.zip,.rar"
              />
              <FileIcon />
              <FileText>
                {formData.file ? formData.file.name : 'Выберите файл или перетащите сюда'}
              </FileText>
            </FileInputWrap>
          </Field>
          
          <Field data-area="checkbox">
            <CheckboxWrap>
              <Checkbox
                type="checkbox"
                id="agreement"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <CheckboxLabel htmlFor="agreement">
                Я согласен с <Link to="/privacy">политикой конфиденциальности</Link> *
              </CheckboxLabel>
            </CheckboxWrap>
          </Field>
          
          <Field data-area="button">
            <SubmitButton
              type="submit"
              disabled={isSubmitting || !agreed}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
            </SubmitButton>
          </Field>
        </FormWrap>
      </Container>
    </Section>
  );
};

export default Contact;