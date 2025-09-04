"""
🤖 Simbioz Tech Telegram Bot

Современный бот для приема заявок и взаимодействия с клиентами.

Возможности:
✅ Интерактивное меню с кнопками
✅ Пошаговое создание заявок
✅ Обработка файлов и фото
✅ Админская панель со статистикой
✅ Детальная информация об услугах
✅ Контактная информация
✅ Уведомления о новых заявках для админов

Команды:
/start - Главное меню
/help - Справка
/admin - Админская панель (только для админов)

Автор: Simbioz Tech Team
"""

import os
import logging
import requests
from datetime import datetime
from telegram import Update, ParseMode, InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, KeyboardButton
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext, CallbackQueryHandler, ConversationHandler
from dotenv import load_dotenv

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Загружаем переменные окружения (если есть .env файл)
load_dotenv()

# Получаем токен из переменных окружения
TOKEN = os.getenv('VITE_TELEGRAM_TOKEN')
CREATOR_CHAT_ID = '8022779606'

# Состояния для ConversationHandler
CHOOSING_SERVICE, ENTERING_NAME, ENTERING_EMAIL, ENTERING_MESSAGE, CONFIRMING = range(5)

# Хранение данных пользователей (временное, без БД)
user_data = {}

# Хранение активных заявок для админской панели
active_applications = {}

# Счетчики для админов
stats = {
    'total_users': 0,
    'total_applications': 0,
    'applications_today': 0,
    'last_reset': datetime.now().date()
}

# Множество для отслеживания уникальных пользователей (без уведомлений админу)
unique_users = set()

def is_admin_chat(chat_id):
    """Проверяет, является ли чат админским"""
    return str(chat_id) == CREATOR_CHAT_ID

def cleanup_old_applications():
    """Очистка старых заявок (старше 7 дней)"""
    current_time = datetime.now()
    to_remove = []
    
    for app_id, app_data in active_applications.items():
        try:
            app_time = datetime.strptime(app_data['timestamp'], '%d.%m.%Y %H:%M')
            if (current_time - app_time).days > 7:
                to_remove.append(app_id)
        except:
            # Если не удается распарсить время, удаляем заявку
            to_remove.append(app_id)
    
    for app_id in to_remove:
        del active_applications[app_id]
    
    if to_remove:
        logger.info(f"Cleaned up {len(to_remove)} old applications")

def start(update: Update, context: CallbackContext):
    """Обработчик команды /start"""
    try:
        chat_id = update.effective_chat.id
        user = update.effective_user
        
        # Обновляем статистику только для новых пользователей
        if chat_id not in unique_users:
            unique_users.add(chat_id)
            stats['total_users'] += 1
        logger.info(f"New user started bot: {chat_id} - {user.username or 'No username'}")
        
        # Показываем главное меню
        show_main_menu(update, context)
        
    except Exception as e:
        logger.error(f"Error in start command: {e}")
        context.bot.send_message(chat_id=chat_id, text="Произошла ошибка. Попробуйте позже.")

def show_main_menu(update, context):
    """Показать главное меню"""
    try:
        # Определяем chat_id и user в зависимости от типа обновления
        if hasattr(update, 'callback_query') and update.callback_query:
            # Если это callback query (кнопка)
            chat_id = update.callback_query.from_user.id
            user = update.callback_query.from_user
            is_callback = True
        else:
            # Если это обычное сообщение
            chat_id = update.effective_chat.id
            user = update.effective_user
            is_callback = False
        
        # Проверяем, является ли это админским чатом
        if is_admin_chat(chat_id):
            # Для админского чата показываем только админскую панель
            keyboard = [
                [InlineKeyboardButton("📊 Статистика", callback_data='admin_stats')],
                [InlineKeyboardButton("📝 Последние заявки", callback_data='admin_applications')],
                [InlineKeyboardButton("🔄 Обновить", callback_data='admin_panel')]
            ]
            welcome_message = (
                "🔧 **Админская панель Simbioz Tech Bot**\n\n"
                "Добро пожаловать в панель управления ботом!\n\n"
                "Выберите действие для мониторинга и управления:"
            )
        else:
            # Для обычных пользователей показываем стандартное меню
            keyboard = [
                [InlineKeyboardButton("📝 Оставить заявку", callback_data='new_application')],
                [InlineKeyboardButton("ℹ️ О нас", callback_data='about_us')],
                [InlineKeyboardButton("🛠 Наши услуги", callback_data='services')],
                [InlineKeyboardButton("📞 Связаться", callback_data='contact')],
                [InlineKeyboardButton("🆘 Тех Поддержка", callback_data='tech_support')]
            ]
            
            welcome_message = (
                f"👋 Привет, {user.first_name or 'друг'}!\n\n"
                "Добро пожаловать в **Simbioz Tech** 🤖\n\n"
                "Мы — команда из Java-разработчика и ML-инженера. Создаём современные, надёжные и масштабируемые решения для бизнеса:\n"
                "• 💻 Frontend и клиентская логика\n"
                "• ⚙️ Backend и архитектура\n"
                "• 🔧 DevOps и инфраструктура\n"
                "• 🤖 Машинное обучение и AI\n"
                "• 🔌 Интеграции и поддержка\n"
                "• 📊 Консалтинг и аудит\n\n"
                "Выберите действие:"
            )
        
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        if is_callback:
            # Если это callback, редактируем сообщение
            update.callback_query.edit_message_text(
                text=welcome_message,
                reply_markup=reply_markup,
                parse_mode=ParseMode.MARKDOWN
            )
        else:
            # Если это обычное сообщение, отправляем новое
            context.bot.send_message(
                chat_id=chat_id, 
                text=welcome_message,
                reply_markup=reply_markup,
                parse_mode=ParseMode.MARKDOWN
            )
            
    except Exception as e:
        logger.error(f"Error in show_main_menu: {e}")
        try:
            if 'is_callback' in locals() and is_callback:
                update.callback_query.answer("Произошла ошибка. Попробуйте позже.")
            else:
                context.bot.send_message(chat_id=chat_id, text="Произошла ошибка. Попробуйте позже.")
        except:
            # Если и это не работает, просто логируем ошибку
            logger.error(f"Failed to send error message: {e}")

def button_handler(update: Update, context: CallbackContext):
    """Обработчик нажатий на кнопки"""
    query = update.callback_query
    query.answer()
    
    if query.data == 'new_application':
        show_services_menu(query, context)
    elif query.data == 'about_us':
        show_about_us(query, context)
    elif query.data == 'services':
        show_services_detailed(query, context)
    elif query.data == 'contact':
        show_contact_info(query, context)
    elif query.data == 'tech_support':
        show_tech_support(query, context)
    elif query.data.startswith('service_'):
        handle_service_selection(query, context)
    elif query.data == 'back_to_main':
        show_main_menu(update, context)
    elif query.data == 'confirm_application':
        confirm_application(query, context)
    elif query.data == 'admin_stats':
        show_admin_stats(query, context)
    elif query.data == 'admin_applications':
        show_admin_applications(query, context)
    elif query.data == 'admin_panel':
        show_admin_panel(query, context)
    elif query.data.startswith('delete_app_'):
        delete_application(query, context)

def show_admin_panel(query, context):
    """Показать админскую панель"""
    chat_id = query.from_user.id
    
    # Проверяем, является ли пользователь админом
    if not is_admin_chat(chat_id):
        query.answer("❌ Доступ запрещен")
        return
    
    keyboard = [
        [InlineKeyboardButton("📊 Статистика", callback_data='admin_stats')],
        [InlineKeyboardButton("📝 Последние заявки", callback_data='admin_applications')],
        [InlineKeyboardButton("🔄 Обновить", callback_data='admin_panel')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "🔧 **Админская панель Simbioz Tech Bot**\n\n"
        "Добро пожаловать в панель управления ботом!\n\n"
        "Выберите действие для мониторинга и управления:"
    )
    
    query.edit_message_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def show_admin_stats(query, context):
    """Показать статистику для админа"""
    chat_id = query.from_user.id
    
    # Проверяем, является ли пользователь админом
    if not is_admin_chat(chat_id):
        query.answer("❌ Доступ запрещен")
        return
    
    keyboard = [
        [InlineKeyboardButton("🔙 Назад к панели", callback_data='admin_panel')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Очищаем старые заявки перед подсчетом
    cleanup_old_applications()
    
    # Рассчитываем статистику
    total_users = stats['total_users']
    total_applications = stats['total_applications']
    applications_today = stats['applications_today']
    active_applications_count = len(active_applications)
    
    conversion_rate = (total_applications / total_users * 100) if total_users > 0 else 0
    
    message = (
        "📊 **Статистика бота**\n\n"
        f"👥 **Пользователи:** {total_users}\n"
        f"📝 **Всего заявок:** {total_applications}\n"
        f"📅 **Заявок сегодня:** {applications_today}\n"
        f"⏳ **Активных заявок:** {active_applications_count}\n"
        f"📈 **Конверсия:** {conversion_rate:.1f}%\n\n"
        f"🕒 **Обновлено:** {datetime.now().strftime('%d.%m.%Y %H:%M')}\n\n"
        "💡 Конверсия показывает процент пользователей, которые оставили заявку."
    )
    
    query.edit_message_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def show_admin_applications(query, context):
    """Показать последние заявки для админа"""
    chat_id = query.from_user.id
    
    # Проверяем, является ли пользователь админом
    if not is_admin_chat(chat_id):
        query.answer("❌ Доступ запрещен")
        return
    
    logger.info(f"Admin {chat_id} requested applications list. Total applications: {len(active_applications)}")
    
    # Очищаем старые заявки перед показом
    cleanup_old_applications()
    
    # Функция для экранирования Markdown символов
    def escape_markdown(text):
        if not text:
            return text
        # Экранируем специальные символы Markdown
        chars_to_escape = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
        for char in chars_to_escape:
            text = text.replace(char, f'\\{char}')
        return text
    
    # Показываем активные заявки
    if not active_applications:
        message = (
            "📝 **Активные заявки**\n\n"
            "Нет активных заявок.\n\n"
            "💡 Здесь отображаются заявки, которые еще не обработаны."
        )
        keyboard = [
            [InlineKeyboardButton("🔙 Назад к панели", callback_data='admin_panel')]
        ]
    else:
        # Сортируем заявки по времени (новые сверху)
        sorted_applications = sorted(
            active_applications.values(), 
            key=lambda x: x['timestamp'], 
            reverse=True
        )
        
        # Показываем последние 5 заявок
        recent_applications = sorted_applications[:5]
        
        message = f"📝 **Активные заявки** ({len(active_applications)})\n\n"
        
        # Создаем клавиатуру с кнопками удаления
        keyboard = []
        
        for i, app in enumerate(recent_applications, 1):
            # Экранируем данные заявки
            safe_name = escape_markdown(app['name'])
            safe_email = escape_markdown(app['email'])
            safe_service = escape_markdown(app['service'])
            safe_message = escape_markdown(app['message'][:50])
            safe_username = escape_markdown(app['username'] or 'Без username')
            
            message += (
                f"**#{i} {app['id']}** - {app['timestamp']}\n"
                f"👤 {safe_name} ({safe_email})\n"
                f"🛠 {safe_service}\n"
                f"💬 {safe_message}{'...' if len(app['message']) > 50 else ''}\n"
                f"📱 **@{safe_username}**\n\n"
            )
            
            # Добавляем кнопку удаления для каждой заявки
            keyboard.append([InlineKeyboardButton(f"🗑 Удалить {app['id']}", callback_data=f'delete_app_{app["id"]}')])
        
        if len(active_applications) > 5:
            message += f"💡 Показано последних 5 из {len(active_applications)} заявок.\n\n"
        
        message += "💡 Заявки автоматически очищаются при перезапуске бота."
        
        # Добавляем кнопку "Назад"
        keyboard.append([InlineKeyboardButton("🔙 Назад к панели", callback_data='admin_panel')])
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    try:
        query.edit_message_text(
            text=message,
            reply_markup=reply_markup,
            parse_mode=ParseMode.MARKDOWN
        )
        logger.info(f"Successfully showed applications list to admin {chat_id}")
    except Exception as e:
        logger.error(f"Error showing applications list to admin {chat_id}: {e}")
        # Пробуем отправить без Markdown
        try:
            query.edit_message_text(
                text=message.replace('*', '').replace('_', ''),
                reply_markup=reply_markup
            )
        except Exception as e2:
            logger.error(f"Failed to send applications list even without Markdown: {e2}")
            query.answer("❌ Ошибка при отображении заявок")

def show_services_menu(query, context):
    """Показать меню выбора услуг"""
    keyboard = [
        [InlineKeyboardButton("💻 Frontend и клиентская логика", callback_data='service_frontend')],
        [InlineKeyboardButton("⚙️ Backend и архитектура", callback_data='service_backend')],
        [InlineKeyboardButton("🔧 DevOps и инфраструктура", callback_data='service_devops')],
        [InlineKeyboardButton("🤖 Машинное обучение и AI", callback_data='service_ml')],
        [InlineKeyboardButton("🔌 Интеграции и поддержка", callback_data='service_integration')],
        [InlineKeyboardButton("📊 Консалтинг и аудит", callback_data='service_consulting')],
        [InlineKeyboardButton("🛠 Другое", callback_data='service_other')],
        [InlineKeyboardButton("🔙 Назад", callback_data='back_to_main')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "🛠 **Выберите интересующую вас услугу:**\n\n"
        "Полный спектр IT-решений для цифровой трансформации вашего бизнеса."
    )
    
    query.edit_message_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def show_about_us(query, context):
    """Показать информацию о компании"""
    keyboard = [[InlineKeyboardButton("🔙 Назад", callback_data='back_to_main')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "🏢 **О компании Simbioz Tech**\n\n"
        "Мы — команда инженеров. Создаём современные, надёжные и масштабируемые решения для бизнеса: от фронта с беком до искусственного интеллекта.\n\n"
        "**Наши принципы:**\n"
        "✅ Работаем быстро и прозрачно\n"
        "✅ Гарантируем результат\n"
        "✅ Используем современные технологии\n"
        "✅ Обеспечиваем надёжность и масштабируемость\n\n"
        "**Специализация:**\n"
        "• Fronted разработка\n"
        "• Backend разработка на Java\n"
        "• Машинное обучение и AI\n"
        "• Микросервисная архитектура\n"
        "• Интеграции и автоматизация\n"
        "• DevOps решения и инфраструктура\n\n"
        "Готовы обсудить ваш проект! 🚀"
    )
    
    query.edit_message_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def show_services_detailed(query, context):
    """Показать детальную информацию об услугах"""
    keyboard = [
        [InlineKeyboardButton("📝 Оставить заявку", callback_data='new_application')],
        [InlineKeyboardButton("🔙 Назад", callback_data='back_to_main')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "🛠 **Наши услуги**\n\n"
        "**💻 Frontend и клиентская логика**\n"
        "• Создание адаптивных интерфейсов на React, Vue, TypeScript\n"
        "• Интеграция с backend, настройка клиентской логики\n"
        "• Оптимизация производительности\n\n"
        "**⚙️ Backend и архитектура**\n"
        "• Проектирование микросервисов\n"
        "• Разработка REST/gRPC API\n"
        "• Работа с базами данных, интеграции\n"
        "• Построение отказоустойчивых систем\n\n"
        "**🔧 DevOps и инфраструктура**\n"
        "• Автоматизация развёртывания\n"
        "• Настройка CI/CD, Docker, Kubernetes\n"
        "• Мониторинг и обеспечение стабильной работы систем\n\n"
        "**🤖 Машинное обучение и AI**\n"
        "• Внедрение ML-моделей\n"
        "• Автоматизация процессов\n"
        "• Предиктивная аналитика\n"
        "• Чат-боты и Telegram-боты для бизнеса\n\n"
        "**🔌 Интеграции и поддержка**\n"
        "• Интеграции с API, платёжными системами, CRM\n"
        "• Сопровождение, развитие решений\n"
        "• Реакция на инциденты\n\n"
        "**📊 Консалтинг и аудит**\n"
        "• Анализ архитектуры, код-ревью\n"
        "• Оптимизация производительности\n"
        "• Помощь в выборе технологий\n\n"
        "Готовы обсудить ваш проект! 🚀"
    )
    
    query.edit_message_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def show_tech_support(query, context):
    """Показать форму тех поддержки"""
    chat_id = query.from_user.id
    
    # Проверяем, является ли пользователь админом
    if is_admin_chat(chat_id):
        # Для админа показываем сообщения поддержки
        show_admin_support_messages(query, context)
        return
    
    # Для обычных пользователей показываем форму поддержки
    keyboard = [
        [InlineKeyboardButton("🔙 Назад", callback_data='back_to_main')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "🆘 **Техническая поддержка**\n\n"
        "Опишите вашу проблему или вопрос, и мы свяжемся с вами в ближайшее время.\n\n"
        "💡 **Что можно описать:**\n"
        "• Технические проблемы\n"
        "• Вопросы по услугам\n"
        "• Консультации\n"
        "• Любые другие вопросы\n\n"
        "📝 **Просто напишите ваше сообщение:**"
    )
    
    # Устанавливаем состояние для получения сообщения поддержки
    context.user_data['state'] = 'tech_support'
    
    query.edit_message_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def show_admin_support_messages(query, context):
    """Показать сообщения поддержки для админа"""
    keyboard = [
        [InlineKeyboardButton("🔙 Назад к панели", callback_data='admin_panel')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Здесь можно добавить логику для показа сообщений поддержки
    # Пока что просто показываем заглушку
    message = (
        "🆘 **Сообщения поддержки**\n\n"
        "Здесь будут отображаться сообщения от пользователей, обратившихся в техподдержку.\n\n"
        "💡 Функция в разработке."
    )
    
    query.edit_message_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def handle_support_message(update, context):
    """Обработка сообщения поддержки"""
    chat_id = update.effective_chat.id
    user = update.effective_user
    message_text = update.message.text
    
    # Очищаем состояние
    context.user_data.clear()
    
    # Отправляем подтверждение пользователю
    keyboard = [[InlineKeyboardButton("🏠 Главное меню", callback_data='back_to_main')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    success_message = (
        "✅ **Сообщение отправлено!**\n\n"
        "Спасибо за обращение в техподдержку. Мы свяжемся с вами в ближайшее время.\n\n"
        "🕒 **Время ответа:** до 24 часов"
    )
    
    update.message.reply_text(
        text=success_message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )
    
    # Отправляем сообщение админу
    admin_message = (
        f"🆘 **Новое сообщение поддержки**\n\n"
        f"👤 **От:** {f'@{user.username}' if user.username else f'ID {chat_id}'}\n"
        f"📝 **Имя:** {user.first_name or ''} {user.last_name or ''}\n"
        f"💬 **Сообщение:**\n{message_text}\n\n"
        f"🕒 **Время:** {datetime.now().strftime('%d.%m.%Y %H:%M')}"
    )
    
    context.bot.send_message(
        chat_id=CREATOR_CHAT_ID,
        text=admin_message
    )
    
    logger.info(f"Support message from {chat_id} - {user.username or 'No username'}")

def delete_application(query, context):
    """Удаление заявки админом"""
    chat_id = query.from_user.id
    
    # Проверяем, является ли пользователь админом
    if not is_admin_chat(chat_id):
        query.answer("❌ Доступ запрещен")
        return
    
    # Получаем ID заявки из callback_data
    app_id = query.data.replace('delete_app_', '')
    
    if app_id in active_applications:
        # Удаляем заявку
        deleted_app = active_applications.pop(app_id)
        
        # Отправляем подтверждение
        query.answer(f"✅ Заявка {app_id} удалена")
        
        # Показываем обновленный список заявок
        show_admin_applications(query, context)
        
        logger.info(f"Application {app_id} deleted by admin {chat_id}")
    else:
        query.answer("❌ Заявка не найдена")

def show_contact_info(query, context):
    """Показать контактную информацию"""
    keyboard = [
        [InlineKeyboardButton("📝 Оставить заявку", callback_data='new_application')],
        [InlineKeyboardButton("🔙 Назад", callback_data='back_to_main')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "📞 **Свяжитесь с нами**\n\n"
        "**🌐 Веб-сайт:** [simbioz.tech](https://simbioz-tech.ru)\n"
        "**📧 Email:** simbioztech@yandex.ru\n"
        "**🐙 GitHub:** [github.com/simbioz](https://github.com/simbioz-tech)\n\n"
        "**⏰ Время работы:**\n"
        "Пн-Пт: 9:00 - 19:00 (МСК)\n"
        "Сб-Вс: По договоренности\n\n"
        "**🚀 Быстрый старт:**\n"
        "Оставьте заявку прямо сейчас, и мы свяжемся с вами в течение 2 часов!\n\n"
        "**💡 Процесс работы:**\n"
        "1. Знакомство и анализ (1-2 дня)\n"
        "2. Проектирование решения (3-5 дней)\n"
        "3. Разработка (2-4 недели)\n"
        "4. Интеграция и автоматизация (1-2 недели)\n"
        "5. Запуск и внедрение (3-7 дней)\n"
        "6. Поддержка и развитие (постоянно)"
    )
    
    query.edit_message_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def handle_service_selection(query, context):
    """Обработка выбора услуги"""
    chat_id = query.from_user.id
    service = query.data.replace('service_', '')
    
    # Сохраняем выбранную услугу
    if chat_id not in user_data:
        user_data[chat_id] = {}
    user_data[chat_id]['service'] = service
    
    # Показываем форму для ввода имени
    keyboard = [[InlineKeyboardButton("🔙 Назад к услугам", callback_data='new_application')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    service_names = {
        'frontend': '💻 Frontend и клиентская логика',
        'backend': '⚙️ Backend и архитектура',
        'devops': '🔧 DevOps и инфраструктура',
        'ml': '🤖 Машинное обучение и AI',
        'integration': '🔌 Интеграции и поддержка',
        'consulting': '📊 Консалтинг и аудит',
        'other': '🛠 Другое'
    }
    
    message = (
        f"✅ Выбрана услуга: **{service_names.get(service, service)}**\n\n"
        "📝 Теперь введите ваше **имя**:\n\n"
        "Пример: Иван"
    )
    
    query.edit_message_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )
    
    # Переводим в состояние ввода имени
    context.user_data['state'] = ENTERING_NAME
def handle_message(update: Update, context: CallbackContext):
    """Обработчик текстовых сообщений"""
    try:
        chat_id = update.effective_chat.id
        user = update.effective_user
        message_text = update.message.text
        
        # Проверяем состояние пользователя
        current_state = context.user_data.get('state')
        
        if current_state == ENTERING_NAME:
            # Сохраняем имя
            if chat_id not in user_data:
                user_data[chat_id] = {}
            user_data[chat_id]['name'] = message_text
            
            # Переходим к вводу email
            keyboard = [[InlineKeyboardButton("🔙 Назад", callback_data='new_application')]]
            reply_markup = InlineKeyboardMarkup(keyboard)
            
            message = (
                f"✅ Имя: **{message_text}**\n\n"
                "📧 Теперь введите ваш **email**:\n\n"
                "Пример: example@mail.com"
            )
            
            update.message.reply_text(
                text=message,
                reply_markup=reply_markup,
                parse_mode=ParseMode.MARKDOWN
            )
            context.user_data['state'] = ENTERING_EMAIL
            
        elif current_state == ENTERING_EMAIL:
            # Сохраняем email
            user_data[chat_id]['email'] = message_text
            
            # Переходим к вводу сообщения
            keyboard = [[InlineKeyboardButton("🔙 Назад", callback_data='new_application')]]
            reply_markup = InlineKeyboardMarkup(keyboard)
            
            message = (
                f"✅ Email: **{message_text}**\n\n"
                "💬 Теперь опишите ваш проект или задачу:\n\n"
                "Расскажите о целях, требованиях, сроках и любых других важных деталях."
            )
            
            update.message.reply_text(
                text=message,
                reply_markup=reply_markup,
                parse_mode=ParseMode.MARKDOWN
            )
            context.user_data['state'] = ENTERING_MESSAGE
            
        elif current_state == ENTERING_MESSAGE:
            # Сохраняем сообщение
            user_data[chat_id]['message'] = message_text
            
            # Показываем подтверждение
            show_application_confirmation(update, context)
            
        elif current_state == 'tech_support':
            # Обрабатываем сообщение поддержки
            handle_support_message(update, context)
            
        else:
            # Обычное сообщение (не в процессе создания заявки)
            handle_general_message(update, context)
            
    except Exception as e:
        logger.error(f"Error handling message: {e}")
        update.message.reply_text("Произошла ошибка. Попробуйте позже.")

def show_application_confirmation(update, context):
    """Показать подтверждение заявки"""
    chat_id = update.effective_chat.id
    user = update.effective_user
    
    if chat_id not in user_data:
        update.message.reply_text("❌ Ошибка: данные заявки не найдены. Начните заново.")
        return
    
    data = user_data[chat_id]
    service_names = {
        'frontend': '💻 Frontend и клиентская логика',
        'backend': '⚙️ Backend и архитектура',
        'devops': '🔧 DevOps и инфраструктура',
        'ml': '🤖 Машинное обучение и AI',
        'integration': '🔌 Интеграции и поддержка',
        'consulting': '📊 Консалтинг и аудит',
        'other': '🛠 Другое'
    }
    
    keyboard = [
        [InlineKeyboardButton("✅ Отправить заявку", callback_data='confirm_application')],
        [InlineKeyboardButton("✏️ Изменить", callback_data='new_application')],
        [InlineKeyboardButton("🔙 Главное меню", callback_data='back_to_main')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    confirmation_message = (
        "📋 **Подтвердите данные заявки:**\n\n"
        f"👤 **Имя:** {data.get('name', 'Не указано')}\n"
        f"📧 **Email:** {data.get('email', 'Не указан')}\n"
        f"🛠 **Услуга:** {service_names.get(data.get('service', ''), data.get('service', 'Не выбрана'))}\n"
        f"💬 **Сообщение:**\n{data.get('message', 'Не указано')}\n\n"
        "Всё верно? Нажмите 'Отправить заявку' для отправки."
    )
    
    update.message.reply_text(
        text=confirmation_message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )
    context.user_data['state'] = CONFIRMING

def handle_general_message(update, context):
    """Обработка обычных сообщений"""
    chat_id = update.effective_chat.id
    user = update.effective_user
    
    # Отправляем сообщение с предложением использовать кнопки
    keyboard = [
        [InlineKeyboardButton("📝 Оставить заявку", callback_data='new_application')],
        [InlineKeyboardButton("🆘 Тех Поддержка", callback_data='tech_support')],
        [InlineKeyboardButton("🏠 Главное меню", callback_data='back_to_main')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "🤖 **Используйте кнопки для навигации**\n\n"
        "Для взаимодействия с ботом используйте кнопки меню:\n\n"
        "• 📝 **Оставить заявку** - для подачи заявки на проект\n"
        "• 🆘 **Тех Поддержка** - для связи с поддержкой\n"
        "• 🏠 **Главное меню** - для возврата в основное меню\n\n"
        "Выберите нужное действие:"
    )
    
    update.message.reply_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def confirm_application(query, context):
    """Подтверждение и отправка заявки"""
    chat_id = query.from_user.id
    user = query.from_user
    
    if chat_id not in user_data:
        query.answer("❌ Ошибка: данные заявки не найдены")
        return
    
    data = user_data[chat_id]
    
    # Обновляем статистику
    stats['total_applications'] += 1
    if datetime.now().date() == stats['last_reset']:
        stats['applications_today'] += 1
    else:
        stats['applications_today'] = 1
        stats['last_reset'] = datetime.now().date()
    
    # Отправляем подтверждение пользователю
    keyboard = [[InlineKeyboardButton("🏠 Главное меню", callback_data='back_to_main')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    success_message = (
        "🎉 **Заявка успешно отправлена!**\n\n"
        "✅ Мы получили вашу заявку и свяжемся с вами в течение **2 часов**.\n\n"
        "📞 Если у вас есть срочные вопросы, можете написать нам напрямую.\n\n"
        "Спасибо за доверие! 🚀"
    )
    
    query.edit_message_text(
        text=success_message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )
    
    # Отправляем заявку админу
    service_names = {
        'frontend': '💻 Frontend и клиентская логика',
        'backend': '⚙️ Backend и архитектура',
        'devops': '🔧 DevOps и инфраструктура',
        'ml': '🤖 Машинное обучение и AI',
        'integration': '🔌 Интеграции и поддержка',
        'consulting': '📊 Консалтинг и аудит',
        'other': '🛠 Другое'
    }
    
    # Функция для экранирования Markdown символов
    def escape_markdown(text):
        if not text:
            return text
        # Экранируем специальные символы Markdown
        chars_to_escape = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
        for char in chars_to_escape:
            text = text.replace(char, f'\\{char}')
        return text
    
    # Экранируем данные заявки
    safe_name = escape_markdown(data.get('name', 'Не указано'))
    safe_email = escape_markdown(data.get('email', 'Не указан'))
    safe_service = escape_markdown(service_names.get(data.get('service', ''), data.get('service', 'Не выбрана')))
    safe_message = escape_markdown(data.get('message', 'Не указано'))
    safe_username = escape_markdown(user.username or 'Отсутствует')
    safe_user_name = escape_markdown(f"{user.first_name or ''} {user.last_name or ''}".strip())
    
    admin_message = (
        f"📝 **Новая заявка #{stats['total_applications']}**\n\n"
        f"👤 **Пользователь:**\n"
        f"• ID: `{chat_id}`\n"
        f"• Username: {f'@{safe_username}' if user.username else 'Отсутствует'}\n"
        f"• Имя: {safe_user_name}\n\n"
        f"📋 **Данные заявки:**\n"
        f"• Имя: {safe_name}\n"
        f"• Email: {safe_email}\n"
        f"• Услуга: {safe_service}\n"
        f"• Сообщение:\n{safe_message}\n\n"
        f"📊 **Статистика:**\n"
        f"• Всего заявок: {stats['total_applications']}\n"
        f"• Заявок сегодня: {stats['applications_today']}\n"
        f"• Время: {datetime.now().strftime('%d.%m.%Y %H:%M')}"
    )
    
    context.bot.send_message(
        chat_id=CREATOR_CHAT_ID,
        text=admin_message,
        parse_mode=ParseMode.MARKDOWN
    )
    
    # Сохраняем заявку в активные для админской панели
    application_id = f"app_{stats['total_applications']}"
    active_applications[application_id] = {
        'id': application_id,
        'user_id': chat_id,
        'username': user.username,
        'user_name': f"{user.first_name or ''} {user.last_name or ''}".strip(),
        'name': data.get('name', 'Не указано'),
        'email': data.get('email', 'Не указан'),
        'service': service_names.get(data.get('service', ''), data.get('service', 'Не выбрана')),
        'message': data.get('message', 'Не указано'),
        'timestamp': datetime.now().strftime('%d.%m.%Y %H:%M'),
        'status': 'new'
    }
    
    # Очищаем данные пользователя
    if chat_id in user_data:
        del user_data[chat_id]
    context.user_data.clear()
    
    logger.info(f"Application submitted: {chat_id} - {user.username or 'No username'}")

def handle_file(update: Update, context: CallbackContext):
    """Обработчик файлов"""
    try:
        chat_id = update.effective_chat.id
        user = update.effective_user
        
        # Получаем информацию о файле
        if update.message.document:
            file_info = update.message.document
            file_name = file_info.file_name
            file_size = file_info.file_size
            file_id = file_info.file_id
        elif update.message.photo:
            file_info = update.message.photo[-1]  # Берем самое большое фото
            file_name = "photo.jpg"
            file_size = file_info.file_size
            file_id = file_info.file_id
        else:
            return
        
        # Отправляем подтверждение пользователю
        context.bot.send_message(
            chat_id=chat_id, 
            text="✅ Спасибо за ваш файл! Мы получили его и свяжемся с вами в ближайшее время."
        )
        
        # Отправляем информацию о файле создателю
        file_message = (
            f"📎 Новый файл:\n"
            f"От: {f'@{user.username}' if user.username else f'ID {chat_id}'}\n"
            f"Имя: {user.first_name or ''} {user.last_name or ''}\n"
            f"Файл: {file_name}\n"
            f"Размер: {file_size} байт"
        )
        context.bot.send_message(chat_id=CREATOR_CHAT_ID, text=file_message)
        
        # Пересылаем файл создателю
        context.bot.forward_message(
            chat_id=CREATOR_CHAT_ID,
            from_chat_id=chat_id,
            message_id=update.message.message_id
        )
        
        logger.info(f"File received from {chat_id} - {user.username or 'No username'}: {file_name}")
    except Exception as e:
        logger.error(f"Error handling file: {e}")
        context.bot.send_message(chat_id=chat_id, text="Произошла ошибка при отправке файла. Попробуйте позже.")

def error_handler(update: Update, context: CallbackContext):
    """Обработчик ошибок"""
    logger.error(f"Update {update} caused error {context.error}")

def admin_command(update: Update, context: CallbackContext):
    """Команда для доступа к админской панели"""
    chat_id = update.effective_chat.id
    
    if not is_admin_chat(chat_id):
        update.message.reply_text("❌ Доступ запрещен")
        return
    
    # Создаем админскую панель
    keyboard = [
        [InlineKeyboardButton("📊 Статистика", callback_data='admin_stats')],
        [InlineKeyboardButton("📝 Последние заявки", callback_data='admin_applications')],
        [InlineKeyboardButton("🔄 Обновить", callback_data='admin_panel')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = (
        "🔧 **Админская панель Simbioz Tech Bot**\n\n"
        "Добро пожаловать в панель управления ботом!\n\n"
        "Выберите действие для мониторинга и управления:"
    )
    
    update.message.reply_text(
        text=message,
        reply_markup=reply_markup,
        parse_mode=ParseMode.MARKDOWN
    )

def help_command(update: Update, context: CallbackContext):
    """Команда помощи"""
    chat_id = update.effective_chat.id
    
    help_message = (
        "🤖 **Simbioz Tech Bot - Помощь**\n\n"
        "**Основные команды:**\n"
        "• `/start` - Главное меню\n"
        "• `/help` - Эта справка\n\n"
        "**Для пользователей:**\n"
        "• Оставьте заявку через главное меню\n"
        "• Узнайте о наших услугах\n"
        "• Свяжитесь с нами\n\n"
        "**Для админов:**\n"
        "• `/admin` - Админская панель\n\n"
        "💡 Используйте кнопки в меню для навигации!"
    )
    
    update.message.reply_text(
        text=help_message,
        parse_mode=ParseMode.MARKDOWN
    )

def main():
    """Основная функция запуска бота"""
    if not TOKEN:
        logger.error("Ошибка: VITE_TELEGRAM_TOKEN не указан в .env")
        return

    try:
        # Создаем updater
        updater = Updater(token=TOKEN, use_context=True)
        dispatcher = updater.dispatcher

        # Регистрируем обработчики команд
        dispatcher.add_handler(CommandHandler("start", start))
        dispatcher.add_handler(CommandHandler("help", help_command))
        dispatcher.add_handler(CommandHandler("admin", admin_command))
        
        # Регистрируем обработчики сообщений
        dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_message))
        dispatcher.add_handler(MessageHandler(Filters.document | Filters.photo, handle_file))
        
        # Регистрируем обработчик кнопок
        dispatcher.add_handler(CallbackQueryHandler(button_handler))
        
        # Обработчик ошибок
        dispatcher.add_error_handler(error_handler)

        logger.info("Telegram bot is starting...")
        print("🤖 Telegram bot is running...")
        print("📊 Статистика будет доступна через /admin")
        
        # Запускаем бота
        updater.start_polling()
        updater.idle()
        
    except Exception as e:
        logger.error(f"Error starting bot: {e}")
        print(f"❌ Error starting bot: {e}")

if __name__ == '__main__':
    main()