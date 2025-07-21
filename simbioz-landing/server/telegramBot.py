import os
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('VITE_TELEGRAM_TOKEN')
CREATOR_CHAT_ID = '8022779606'

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_chat.id
    welcome_message = (
        "Добрый день! Спасибо за ваш интерес. "
        "Пожалуйста, оставьте ваше сообщение ниже, и мы свяжемся с вами в ближайшее время."
    )
    await context.bot.send_message(chat_id=chat_id, text=welcome_message)

    user = update.effective_user
    user_info = (
        f"Новый пользователь начал взаимодействие:\n"
        f"ID: {chat_id}\n"
        f"Username: {f'@{user.username}' if user.username else 'Отсутствует'}\n"
        f"Имя: {user.first_name or ''} {user.last_name or ''}"
    )
    await context.bot.send_message(chat_id=CREATOR_CHAT_ID, text=user_info)

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.message.text != '/start':
        chat_id = update.effective_chat.id
        user = update.effective_user
        user_message = (
            f"Сообщение от {f'@{user.username}' if user.username else f'ID {chat_id}'}:\n"
            f"{update.message.text}"
        )
        await context.bot.send_message(chat_id=CREATOR_CHAT_ID, text=user_message)

def main():
    if not TOKEN:
        print("Ошибка: VITE_TELEGRAM_TOKEN не указан в .env")
        return

    application = Application.builder().token(TOKEN).build()

    # Register handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("Telegram bot is running...")
    application.run_polling()

if __name__ == '__main__':
    main()