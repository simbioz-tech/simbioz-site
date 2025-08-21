#!/bin/bash

# Скрипт развертывания Telegram бота для CI/CD

echo "🚀 Начинаем развертывание Telegram бота..."

# Проверяем наличие необходимых файлов
if [ ! -f "telegramBot.py" ]; then
    echo "❌ Ошибка: файл telegramBot.py не найден"
    exit 1
fi

if [ ! -f "requirements.txt" ]; then
    echo "❌ Ошибка: файл requirements.txt не найден"
    exit 1
fi

# Проверяем наличие переменных окружения
if [ -z "$VITE_TELEGRAM_TOKEN" ]; then
    echo "❌ Ошибка: переменная VITE_TELEGRAM_TOKEN не установлена"
    exit 1
fi

echo "✅ Переменные окружения настроены"

# Останавливаем существующий процесс бота
echo "🛑 Останавливаем существующий процесс бота..."
pkill -f "python.*telegramBot.py" || echo "Процесс не найден"

# Ждем завершения процесса
sleep 3

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
pip install -r requirements.txt

# Проверяем установку
if [ $? -ne 0 ]; then
    echo "❌ Ошибка при установке зависимостей"
    exit 1
fi

# Запускаем бота в фоне
echo "🤖 Запускаем Telegram бота..."
nohup python start_bot.py > bot.log 2>&1 &

# Ждем немного для запуска
sleep 5

# Проверяем, что бот запустился
if pgrep -f "python.*telegramBot.py" > /dev/null; then
    echo "✅ Telegram бот успешно запущен!"
    echo "📋 Логи: tail -f bot.log"
    echo "🔍 Статус: ./check_bot.sh"
else
    echo "❌ Ошибка: бот не запустился"
    echo "📋 Проверьте логи: cat bot.log"
    exit 1
fi
