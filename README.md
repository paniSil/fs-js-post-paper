# THE POST PAPER

THE POST PAPER — це Fullstack JavaScript проект, присвячений створенню простої платформи для блогів/статей, що імітує макет газети.

Репозиторій складається з двох частин (кожна має свій README):

- **client** (frontend)
- **server** (backend)

---

## Структура проєкту

```
fs-js-post-paper/
│
├── client/      # React frontend (Vite, SCSS, Context API)
    └── README.md    # Інструкції і опис frontend частини
├── server/      # Node.js backend (Express, MongoDB)
├── README.md
    └── README.md    # Інструкції і опис backend частини
└── ...
```

---

## Конфігурація та запуск

### 1. Клонування репозиторію

```bash
git clone https://github.com/your-username/fs-js-post-paper.git
cd fs-js-post-paper
```

### 2. Запуск backend

Приклад запуску:

```bash
cd server
npm install
node src/server.mjs
```

> Сервер стартує на http://localhost:3000

### 3. Запуск frontend

Приклад запуску:

```bash
cd client
yarn
yarn dev
```

> Клієнт стартує на http://localhost:5173

### 4. Налаштування змінних середовища

- Для backend створіть `.env`, який буде містити SESSION_SECRET, MONGO_URI, PORT тощо.
- Для frontend можна відкорегувати проксі у `vite.config.js` для API-запитів.

---

## Основний стек

- **Frontend:** React, TypeScript, SCSS, Context API, Formik, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Інше:** Axios, bcrypt

---

## Основні можливості

- Реєстрація та авторизація користувачів
- CRUD для статей (створення, редагування, видалення)
- Система лайків, закладок (paperclips)
- Профілі користувачів
- Адаптивний дизайн

---

## Інше

- Дизайн створювався у Figma з використанням зображень з Unsplash.
- Основна ідея — простий, читабельний інтерфейс у стилі газети.
