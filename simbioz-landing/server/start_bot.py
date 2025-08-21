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

# Добавляем путь к локально установленным пакетам
user_site_packages = os.path.expanduser('~/.local/lib/python3.6/site-packages')
if os.path.exists(user_site_packages):
    sys.path.insert(0, user_site_packages)

# Импортируем и запускаем бота
from telegramBot import main

if __name__ == '__main__':
    print("Starting Telegram bot...")
    main()
