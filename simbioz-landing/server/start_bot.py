#!/usr/bin/env python3
"""
Alternative startup script for Telegram bot on reg.ru hosting
"""
import os
import sys
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()

# Добавляем путь к модулям
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# Импортируем и запускаем бота
from telegramBot import main

if __name__ == '__main__':
    print("Starting Telegram bot...")
    main()
