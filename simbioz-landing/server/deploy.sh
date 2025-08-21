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
pkill -f "$PYTHON_CMD.*start_bot.py" || echo "Процесс не найден"

# Ждем завершения процесса
sleep 3

# Проверяем наличие Python и pip
echo "🐍 Проверяем наличие Python и pip..."

# Проверяем Python (пробуем разные варианты)
PYTHON_CMD=""
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Ошибка: Python не найден"
    echo "💡 Установите Python: sudo apt-get install python3 python3-pip"
    exit 1
fi

echo "✅ Python найден: $($PYTHON_CMD --version)"

# Проверяем pip (пробуем разные варианты)
PIP_CMD=""
if command -v pip3 &> /dev/null; then
    PIP_CMD="pip3"
elif command -v pip &> /dev/null; then
    PIP_CMD="pip"
elif $PYTHON_CMD -m pip --version &> /dev/null; then
    PIP_CMD="$PYTHON_CMD -m pip"
else
    echo "❌ Ошибка: pip не найден"
    echo "💡 Установите pip: sudo apt-get install python3-pip"
    exit 1
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
nohup $PYTHON_CMD start_bot.py > bot.log 2>&1 &

# Ждем немного для запуска
sleep 5

# Проверяем, что бот запустился
if pgrep -f "$PYTHON_CMD.*start_bot.py" > /dev/null; then
    echo "✅ Telegram бот успешно запущен!"
    echo "📋 Логи: tail -f bot.log"
    echo "🔍 Статус: ./check_bot.sh"
else
    echo "❌ Ошибка: бот не запустился"
    echo "📋 Проверьте логи: cat bot.log"
    exit 1
fi
