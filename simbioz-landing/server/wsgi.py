#!/usr/bin/env python3
"""
WSGI entry point for Telegram bot on reg.ru hosting
"""
import os
import sys
from telegramBot import main

# Добавляем путь к модулям
sys.path.insert(0, os.path.dirname(__file__))

# Запускаем бота
if __name__ == '__main__':
    main()
