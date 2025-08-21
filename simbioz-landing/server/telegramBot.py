import os
import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
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

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
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
        await context.bot.send_message(chat_id=chat_id, text=welcome_message)

        user = update.effective_user
        user_info = (
            f"🎉 Новый пользователь начал взаимодействие:\n"
            f"ID: {chat_id}\n"
            f"Username: {f'@{user.username}' if user.username else 'Отсутствует'}\n"
            f"Имя: {user.first_name or ''} {user.last_name or ''}"
        )
        await context.bot.send_message(chat_id=CREATOR_CHAT_ID, text=user_info)
        logger.info(f"New user started bot: {chat_id} - {user.username or 'No username'}")
    except Exception as e:
        logger.error(f"Error in start command: {e}")
        await context.bot.send_message(chat_id=chat_id, text="Произошла ошибка. Попробуйте позже.")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        if update.message.text != '/start':
            chat_id = update.effective_chat.id
            user = update.effective_user
            
            # Отправляем подтверждение пользователю
            await context.bot.send_message(
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
            await context.bot.send_message(chat_id=CREATOR_CHAT_ID, text=user_message)
            logger.info(f"Message received from {chat_id} - {user.username or 'No username'}")
    except Exception as e:
        logger.error(f"Error handling message: {e}")
        await context.bot.send_message(chat_id=chat_id, text="Произошла ошибка при отправке сообщения. Попробуйте позже.")

def main():
    if not TOKEN:
        logger.error("Ошибка: VITE_TELEGRAM_TOKEN не указан в .env")
        return

    try:
        application = Application.builder().token(TOKEN).build()

        # Register handlers
        application.add_handler(CommandHandler("start", start))
        application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

        logger.info("Telegram bot is starting...")
        print("🤖 Telegram bot is running...")
        application.run_polling()
    except Exception as e:
        logger.error(f"Error starting bot: {e}")
        print(f"❌ Error starting bot: {e}")

if __name__ == '__main__':
    main()