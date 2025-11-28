# React приложение для модерации объявлений

Веб-приложение для модерации объявлений Avito.

---

## Технические требования

- Node.js v20+
- bun

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

---

## Скрипты

```bash
bun run dev       # Запуск dev-сервера
bun run build     # Сборка приложения
bun run preview   # Просмотр production сборки
bun run lint      # Проверка кода ESLint
bun run lint:fix  # Фикс ошибок ESLint
bun run format    # Форматирование через Prettier
bun run pretty    # Форматирование через Prettier, фикс ошибок ESLint
```

---

## Технологический стек

- Vite 7.2 – сборщик и dev-сервер
- TypeScript 5.9 – Типизация
- React 19.2 – UI библиотека
- Effector + Patronum + Effector-Forms – управление состоянием и формами
- React Router 7 – маршрутизация
- Ky – HTTP клиент
- clsx – удобное управление классами
- dayjs + @mantine/dates – работа с датами
- Mantine – UI компоненты, модальные окна, уведомления, карусели, графики
- ESLint + Prettier – проверка и форматирование кода

---

# Структура проекта

```
frontend/
├── @types/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   └── index.tsx
│   ├── features/
│   │   ├── ad-actions/
│   │   │   ├── index.ts
│   │   │   ├── models.ts
│   │   │   └── ui.tsx
│   │   ├── ads-options/
│   │   │   ├── index.ts
│   │   │   ├── lib.ts
│   │   │   └── ui.tsx
│   │   └── index.ts
│   ├── pages/
│   │   ├── advertisement/
│   │   │   ├── ui/
│   │   │   ├── index.ts
│   │   │   └── models.ts
│   │   ├── home/
│   │   │   ├── ad-card.tsx
│   │   │   ├── ad-skeleton.tsx
│   │   │   ├── index.tsx
│   │   │   ├── lib.ts
│   │   │   └── models.ts
│   │   ├── not-found/
│   │   │   └── index.tsx
│   │   │── statistic/
│   │   │   ├── index.tsx
│   │   │   ├── models.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── shared/
│   │   ├── api/
│   │   │   ├── requests/
│   │   │   ├── index.ts
│   │   │   └── instance.ts
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── lib/
│   │   ├── constants/
│   │   └── index.ts
│   ├── ui/
│   │   ├── condition/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── icons/
│   │   ├── theme-switcher/
│   │   └── index.ts
│   │── widgets/
│   │   └── ad-modal/
│   │       ├── ui.tsx
│   │       ├── index.ts
│   │       └── model.ts
│   └── main.tsx
```
