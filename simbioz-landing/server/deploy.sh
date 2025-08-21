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
pkill -f "python3.*start_bot.py" || echo "Процесс не найден"

# Ждем завершения процесса
sleep 3

# Проверяем наличие Python и pip
echo "🐍 Проверяем наличие Python и pip..."

# Проверяем Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Ошибка: Python3 не найден"
    echo "💡 Установите Python3: sudo apt-get install python3 python3-pip"
    echo "💡 Или используйте legacy скрипт: ./deploy_legacy.sh"
    exit 1
fi

echo "✅ Python3 найден: $(python3 --version)"

# Проверяем pip
if ! command -v pip3 &> /dev/null; then
    echo "⚠️  pip3 не найден, пытаемся использовать python3 -m pip"
    if ! python3 -m pip --version &> /dev/null; then
        echo "❌ Ошибка: python3 -m pip тоже не работает"
        echo "💡 Установите pip: sudo apt-get install python3-pip"
        echo "💡 Или используйте legacy скрипт: ./deploy_legacy.sh"
        exit 1
    fi
    PIP_CMD="python3 -m pip"
else
    PIP_CMD="pip3"
fi

echo "✅ pip найден: $PIP_CMD"

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
$PIP_CMD install -r requirements.txt

# Проверяем установку
if [ $? -ne 0 ]; then
    echo "❌ Ошибка при установке зависимостей"
    echo "💡 Попробуйте установить вручную: $PIP_CMD install -r requirements.txt"
    exit 1
fi

# Запускаем бота в фоне
echo "🤖 Запускаем Telegram бота..."
nohup python3 start_bot.py > bot.log 2>&1 &

# Ждем немного для запуска
sleep 5

# Проверяем, что бот запустился
if pgrep -f "python3.*start_bot.py" > /dev/null; then
    echo "✅ Telegram бот успешно запущен!"
    echo "📋 Логи: tail -f bot.log"
    echo "🔍 Статус: ./check_bot.sh"
else
    echo "❌ Ошибка: бот не запустился"
    echo "📋 Проверьте логи: cat bot.log"
    exit 1
fi
