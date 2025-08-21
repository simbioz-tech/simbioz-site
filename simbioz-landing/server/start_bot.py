#!/usr/bin/env python3
"""
Startup script for Telegram bot compatible with older library versions
"""
import os
import sys
import logging
from dotenv import load_dotenv

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Загружаем переменные окружения
load_dotenv()

# Добавляем путь к модулям
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# Проверяем наличие токена
TOKEN = os.getenv('VITE_TELEGRAM_TOKEN')
if not TOKEN:
    print("❌ Ошибка: VITE_TELEGRAM_TOKEN не указан в переменных окружения")
    sys.exit(1)

try:
    # Импортируем и запускаем бота
    from telegramBot import main
    print("🤖 Starting Telegram bot...")
    main()
except ImportError as e:
    print(f"❌ Ошибка импорта: {e}")
    print("💡 Убедитесь, что установлены все зависимости: pip install -r requirements.txt")
    sys.exit(1)
except Exception as e:
    print(f"❌ Ошибка запуска бота: {e}")
    sys.exit(1)
