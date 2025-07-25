import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px 0;
`;

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 18px;
  background: ${({ theme }) => theme.card};
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(30,42,120,0.08);
  color: ${({ theme }) => theme.text};
  font-size: 1.08rem;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 700px) {
    padding: 24px 12px;
    margin: 0 12px;
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 24px;
  text-align: center;
  width: 100%;
  @media (max-width: 700px) {
    font-size: 1.8rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.3rem;
  margin-top: 32px;
  margin-bottom: 12px;
  text-align: center;
  width: 100%;
  @media (max-width: 700px) {
    font-size: 1.2rem;
  }
`;

const List = styled.ul`
  margin: 0 0 18px 0;
  padding-left: 20px;
  list-style-position: inside;
  text-align: left;
  width: 100%;
  max-width: 700px;
  @media (max-width: 700px) {
    padding-left: 15px;
  }
`;

const UpdateInfo = styled.div`
  display: inline-block;
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
  background: rgba(60,70,90,0.13);
  color: ${({ theme }) => theme.text};
  font-size: 0.98rem;
  border-radius: 7px;
  padding: 4px 12px;
  margin-bottom: 18px;
  margin-top: 0;
  box-shadow: 0 1px 4px 0 rgba(30,42,120,0.06);
  text-align: center;
  @media (max-width: 700px) {
    font-size: 0.9rem;
    padding: 4px 10px;
  }
`;

const BackButton = styled.button`
  padding: 9px 22px;
  border-radius: 24px;
  border: 2px solid ${({ theme }) => theme.background === '#0a0a23' ? '#3a7bd5' : theme.accent};
  background: transparent;
  color: ${({ theme }) => theme.background === '#0a0a23' ? '#b3c0f7' : theme.accent};
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  margin-bottom: 24px;
  transition: background 0.22s, color 0.22s, border-color 0.22s, box-shadow 0.18s, transform 0.18s;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 8px 0 rgba(30,42,120,0.06);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  align-self: center;
  @media (max-width: 700px) {
    padding: 8px 14px;
    font-size: 0.98rem;
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

export default function PrivacyPolicy({ theme, onToggleTheme }) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <PageWrapper>
            <Header theme={theme} onToggleTheme={onToggleTheme} />
            <MainContent>
                <Page>
                    <BackButton onClick={handleBack}>Назад</BackButton>
                    <Title>Политика конфиденциальности</Title>
                    <UpdateInfo>Последнее обновление: 21 июля 2025 г.</UpdateInfo>
                    <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта simbioz-tech (далее — «Сайт»).</p>

                    <SubTitle>1. Общие положения</SubTitle>
                    <List>
                        <li>Обработка персональных данных осуществляется в соответствии с Федеральным законом РФ №152-ФЗ «О персональных данных», а также с учетом требований GDPR (ЕС) и иных применимых законов.</li>
                        <li>Используя Сайт, вы выражаете согласие с настоящей Политикой.</li>
                    </List>

                    <SubTitle>2. Перечень персональных данных и иной информации</SubTitle>
                    <List>
                        <li>Достоверная персональная информация, которую Пользователь предоставляет о себе самостоятельно при заполнении форм на сайте: фамилия, имя, отчество, дата рождения, информация о документе, удостоверяющем личность, место регистрации, место обучения, номер телефона, адрес электронной почты, адрес страницы в социальных сетях (Telegram, Вконтакте и т.д.).</li>
                        <li>Данные, которые автоматически передаются сервисам Сайта в процессе их использования: IP-адрес, информация из Cookies, информация о браузере и устройстве, user-agent и др.</li>
                        <li>Файлы, прикреплённые к форме (например, резюме, ТЗ).</li>
                        <li>Оператор не проверяет достоверность персональных данных, предоставляемых Пользователем, но исходит из того, что они достоверны и актуальны.</li>
                    </List>

                    <SubTitle>3. Цели и способы обработки данных</SubTitle>
                    <List>
                        <li>Связь с вами по вопросам сотрудничества, отклика на вакансию или обратной связи.</li>
                        <li>Подготовка коммерческих предложений и договоров.</li>
                        <li>Выполнение договорных обязательств.</li>
                        <li>Аналитика и улучшение работы сайта и сервисов.</li>
                        <li>Соблюдение требований законодательства.</li>
                        <li>Обработка осуществляется на основании согласия пользователя, исполнения договора, выполнения требований закона.</li>
                        <li>В ходе обработки персональных данных совершаются следующие действия: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, блокирование, удаление, уничтожение.</li>
                        <li>Данные могут быть предоставлены госорганам РФ в случаях, предусмотренных законом.</li>
                    </List>

                    <SubTitle>4. Конфиденциальность и публичность информации</SubTitle>
                    <List>
                        <li>Условия конфиденциальности распространяются на всю информацию, которую Оператор может получить о Пользователе во время пребывания на Сайте.</li>
                        <li>Не является конфиденциальной информация, размещённая пользователем для общего доступа неограниченному кругу лиц, а также информация, которая может быть получена из открытых источников.</li>
                    </List>

                    <SubTitle>5. Сроки хранения данных</SubTitle>
                    <p>Ваши персональные данные хранятся до достижения целей обработки или до отзыва согласия, если иное не предусмотрено законодательством РФ. Персональные данные Пользователя хранятся и обрабатываются Оператором в течение всего срока осуществления деятельности Оператором.</p>

                    <SubTitle>6. Права пользователя (субъекта данных)</SubTitle>
                    <List>
                        <li>Запросить информацию о своих персональных данных, способах и целях их обработки, сроках хранения, источнике получения.</li>
                        <li>Требовать их исправления, блокирования или уничтожения, если данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки.</li>
                        <li>Ограничить обработку или возразить против обработки.</li>
                        <li>Перенести свои данные другому оператору (право на переносимость).</li>
                        <li>Отозвать согласие на обработку данных письменным уведомлением.</li>
                        <li>Подать жалобу в надзорный орган.</li>
                    </List>

                    <SubTitle>7. Порядок отзыва согласия и восстановление доступа</SubTitle>
                    <p>Вы можете в любой момент отозвать согласие на обработку персональных данных, направив письменный запрос на e-mail: simbioztech@yandex.ru. Восстановление доступа или смена e-mail осуществляется только по запросу пользователя через сервисы сайта или по письменному запросу.</p>

                    <SubTitle>8. Передача и трансграничная передача данных</SubTitle>
                    <List>
                        <li>Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законом или необходимых для выполнения ваших запросов (например, отправка резюме через форму).</li>
                        <li>В отдельных случаях возможна передача данных за пределы РФ/ЕАЭС (например, при использовании облачных сервисов, EmailJS, Telegram и др.). Такая передача осуществляется с соблюдением требований законодательства.</li>
                        <li>Передача персональных данных при реорганизации компании: при реорганизации Оператора права и обязанности по защите данных переходят к правопреемнику.</li>
                    </List>

                    <SubTitle>9. Хранение и защита данных</SubTitle>
                    <List>
                        <li>Данные хранятся на защищённых серверах и обрабатываются только сотрудниками компании «Симбиоз».</li>
                        <li>Мы принимаем все необходимые меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения, включая внутренние проверки, физическую безопасность и ограничение доступа сотрудников.</li>
                        <li>Пароли пользователей (если применимо) хранятся в зашифрованном виде и не запрашиваются по почте.</li>
                    </List>

                    <SubTitle>10. Использование файлов cookie</SubTitle>
                    <p>Сайт может использовать cookie для персонализации работы и аналитики. Вы можете отключить cookie в настройках браузера, но это может повлиять на функциональность сайта.</p>

                    <SubTitle>11. Обработка данных детей</SubTitle>
                    <p>Сайт не предназначен для лиц младше 18 лет, мы не собираем данные детей сознательно.</p>

                    <SubTitle>12. Изменения политики</SubTitle>
                    <p>Мы можем обновлять настоящую Политику. Актуальная версия всегда доступна на сайте. В случае существенных изменений мы уведомим пользователей посредством публикации новой редакции на сайте.</p>

                    <SubTitle>13. Контакты и ответственный за обработку</SubTitle>
                    <p>По вопросам обработки персональных данных обращайтесь:<br />
                        E-mail: simbioztech@yandex.ru<br />
                        Ответственный: Генеральный директор «Симбиоз»</p>
                </Page>
            </MainContent>
            <Footer />
        </PageWrapper>
    );
}