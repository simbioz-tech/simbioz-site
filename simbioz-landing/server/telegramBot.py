import os
import logging
import requests
from telegram import Update, ParseMode
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext
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

def start(update: Update, context: CallbackContext):
    """Обработчик команды /start"""
    try:
        chat_id = update.effective_chat.id
        welcome_message = (
            "Добрый день! Спасибо за ваш интерес к Simbioz Tech. "
            "Пожалуйста, оставьте ваше сообщение ниже, и мы свяжемся с вами в ближайшее время.\n\n"
            "Мы специализируемся на:\n"
            "• Веб-разработке\n"
            "• Автоматизации бизнеса\n"
            "• Интеграциях API\n"
            "• Машинном обучении\n"
            "• DevOps\n"
            "• Поддержке и сопровождении"
        )
        context.bot.send_message(chat_id=chat_id, text=welcome_message)

        user = update.effective_user
        user_info = (
            f"🎉 Новый пользователь начал взаимодействие:\n"
            f"ID: {chat_id}\n"
            f"Username: {f'@{user.username}' if user.username else 'Отсутствует'}\n"
            f"Имя: {user.first_name or ''} {user.last_name or ''}"
        )
        context.bot.send_message(chat_id=CREATOR_CHAT_ID, text=user_info)
        logger.info(f"New user started bot: {chat_id} - {user.username or 'No username'}")
    except Exception as e:
        logger.error(f"Error in start command: {e}")
        context.bot.send_message(chat_id=chat_id, text="Произошла ошибка. Попробуйте позже.")

def handle_message(update: Update, context: CallbackContext):
    """Обработчик текстовых сообщений"""
    try:
        if update.message.text != '/start':
            chat_id = update.effective_chat.id
            user = update.effective_user
            
            # Отправляем подтверждение пользователю
            context.bot.send_message(
                chat_id=chat_id, 
                text="✅ Спасибо за ваше сообщение! Мы получили его и свяжемся с вами в ближайшее время."
            )
            
            # Отправляем сообщение создателю
            user_message = (
                f"💬 Новое сообщение:\n"
                f"От: {f'@{user.username}' if user.username else f'ID {chat_id}'}\n"
                f"Имя: {user.first_name or ''} {user.last_name or ''}\n"
                f"Сообщение:\n{update.message.text}"
            )
            context.bot.send_message(chat_id=CREATOR_CHAT_ID, text=user_message)
            logger.info(f"Message received from {chat_id} - {user.username or 'No username'}")
    except Exception as e:
        logger.error(f"Error handling message: {e}")
        context.bot.send_message(chat_id=chat_id, text="Произошла ошибка при отправке сообщения. Попробуйте позже.")

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

def main():
    """Основная функция запуска бота"""
    if not TOKEN:
        logger.error("Ошибка: VITE_TELEGRAM_TOKEN не указан в .env")
        return

    try:
        # Создаем updater
        updater = Updater(token=TOKEN, use_context=True)
        dispatcher = updater.dispatcher

        # Регистрируем обработчики
        dispatcher.add_handler(CommandHandler("start", start))
        dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_message))
        dispatcher.add_handler(MessageHandler(Filters.document | Filters.photo, handle_file))
        
        # Обработчик ошибок
        dispatcher.add_error_handler(error_handler)

        logger.info("Telegram bot is starting...")
        print("🤖 Telegram bot is running...")
        
        # Запускаем бота
        updater.start_polling()
        updater.idle()
        
    except Exception as e:
        logger.error(f"Error starting bot: {e}")
        print(f"❌ Error starting bot: {e}")

if __name__ == '__main__':
    main()