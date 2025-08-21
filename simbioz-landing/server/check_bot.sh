#!/bin/bash

# Скрипт для проверки статуса Telegram бота

echo "🔍 Проверка статуса Telegram бота..."

# Проверяем, запущен ли процесс
if pgrep -f "python.*start_bot.py" > /dev/null || pgrep -f "python.*telegramBot.py" > /dev/null; then
    echo "✅ Бот запущен"
    echo "📊 Информация о процессе:"
    ps aux | grep "python.*start_bot.py\|python.*telegramBot.py" | grep -v grep
else
    echo "❌ Бот не запущен"
fi

# Показываем последние логи
echo ""
echo "📋 Последние логи (последние 10 строк):"
tail -n 10 bot.log 2>/dev/null || echo "Файл логов не найден"

echo ""
echo "💡 Для запуска: ./start_bot.py"
echo "💡 Для перезапуска: ./restart_bot.sh"
