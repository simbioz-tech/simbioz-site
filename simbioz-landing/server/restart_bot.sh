#!/bin/bash

# Скрипт для перезапуска Telegram бота

echo "🔄 Перезапуск Telegram бота..."

# Останавливаем существующий процесс
pkill -f "python.*telegramBot.py" || echo "Процесс не найден"

# Ждем немного
sleep 2

# Запускаем бота заново
cd "$(dirname "$0")"
nohup python start_bot.py > bot.log 2>&1 &

echo "✅ Бот перезапущен!"
echo "📋 Логи: tail -f bot.log"
