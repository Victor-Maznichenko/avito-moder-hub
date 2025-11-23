# Frontend Системы модерации объявлений

Веб-приложение для модерации объявлений Avito.

---

## Быстрый старт

**Установка и запуск**

```bash
# Клонировать репозиторий
git clone https://github.com/Calcifer-02/avito-moder.git
cd client

# Установить зависимости через Bun
bun install

# Запуск dev-сервера
bun run dev
```

**Сборка для production**

```bash
bun run build
bun run preview
```

---

## Скрипты

```bash
bun run dev       # Запуск dev-сервера
bun run build     # Сборка приложения
bun run preview   # Просмотр production сборки
bun run lint      # Проверка кода ESLint
bun run format    # Форматирование через Prettier
bun run pretty    # Форматирование через Prettier, проверка кода ESLint
```

---

## Технологический стек

**Frontend**

* React 19.2 – UI библиотека
* TypeScript 5.9 – строгая типизация
* Vite 7.2 – сборщик и dev-сервер
* React Router 7 – маршрутизация
* Effector + Effector-Forms – управление состоянием и формами
* Mantine 8 – UI компоненты, модальные окна, уведомления, карусели, графики
* Recharts – визуализация статистики
* Ky – HTTP клиент
* Embla Carousel – карусели изображений
* Day.js – работа с датами
* clsx – удобное управление классами

**DevTools**

* Bun – пакетный менеджер и среда выполнения
* ESLint + Prettier – проверка и форматирование кода
* TypeScript – строгая типизация
* Sass – стилизация компонентов

---


