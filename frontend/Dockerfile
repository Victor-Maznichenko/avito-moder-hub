# Dockerfile
FROM oven/bun:1-alpine

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install

# Копируем исходный код
COPY . .

# Открываем порт
EXPOSE 3001

# Запускаем в режиме разработки с hot reload
CMD ["bun", "run", "dev"]