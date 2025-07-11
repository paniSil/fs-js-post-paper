# THE POST PAPER — Frontend

![image](https://github.com/user-attachments/assets/1f53b595-57f6-40e5-b75d-ce06c4fe1771)

Це клієнтська частина проєкту THE POST PAPER — платформи для блогів/статей, яка імітує верстку газети.

## Технології

- React + Vite
- TypeScript
- SCSS
- Context API
- React Router
- Axios
- Formik + Yup
- react-icons

## Запуск проєкту

1. Встановіть залежності:

```bash
yarn
```

2. Запустіть локальний сервер розробки:

```bash
yarn dev
```

3. Відкрийте http://localhost:5173 у браузері.

!Для коректної роботи API має бути запущений backend (server).

## Основні сторінка

- `/ ` Головна сторінка. Стрічка статей із виділеними найновішими публікаціями.
- `/articles` Відображення всіх статей.
- `/articles/:id` Перегляд статті. Повний перегляд статті з можливістю взаємодії (лайки, paperclips).
- `/users/:id` Профіль користувача. Інформація про користувача та його статті.
- `/paper` Мої статті. Персональний розділ зі статтями поточного користувача.
- `/paperclips` Закладки. Збережені користувачем статті.
- `/write` Створення нової статті
- `/articles/edit/:id` Редагування статті. Форми для створення та редагування контенту.
- `/myprofile ` Перегляд і редагування поточного профілю
- `/login та /register` Форми для входу та створення облікового запису.
- `/forgot` Відновлення паролю
- `/about` Інформація про сайт
- `/top-authors та /top-articles` - рейтинг юзерів і статей

## Cтруктура папок

```
client/
├── public/ # Статичні файли
├── src/
│ ├── components/ # UI-компоненти і провайдер
│ ├── context/ # Глобальні контексти
│ ├── pages/ # Сторінки
│ ├── scss/ # SCSS-стилі
│ ├── route/ # маршрути для навігації
│ ├── types/ # TypeScript типи
│ └── main.tsx # Точка входу
├── package.json
└── ...
```

## Основні можливості

- Авторизація та реєстрація: система користувачів з профілями
- Робота зі статтями: створення, редагування, видалення та перегляд
- Інтерактивні елементи: лайки, закладки (paperclips), рандомайзер статей (RandomArticle)
- Персоналізація: налаштування профілю та аватара
- Адаптивний дизайн: коректне відображення на різних пристроях

## Компоненти та архітектура

- Context API: глобальний стан додатку управляється через контексти
- Модульна структура SCSS: стилі організовані в окремі компоненти
- Типізація: повна підтримка TypeScript для безпечної розробки
- Компонентний підхід: UI розділений на багаторазові компоненти

## Реалізований функціонал

### 👤 Авторизація та користувачі

- Реєстрація нових користувачів
- Вхід в обліковий запис
- Вихід з облікового запису
- Захист приватних маршрутів для авторизованих користувачів

### 📝 Робота зі статтями

- Перегляд стрічки статей на головній сторінці
- Створення нових статей з заголовком, описом та текстом
- Редагування власних статей
- Видалення власних статей
- Пагінація статей з функцією "Load More"

### 🔍 Перегляд контенту

- Повний перегляд окремої статті
- Перегляд профілю автора
- Персональна сторінка "Paper" з власними статтями
- Рейтинги популярних авторів та статей

### 💫 Інтерактивні елементи

- Система лайків (збільшення рейтингу статей)
- Система закладок (paperclips) для збереження статей
- Персональна сторінка зі збереженими статтями
- Компонент RandomArticle для генерації випадкової статті в бічній панелі

### 👨‍💼 Профіль користувача

- Налаштування особистих даних (ім'я, вік)
- Додавання аватарки через URL
- Зміна паролю облікового запису
- Перегляд профілів інших користувачів

### 📱 Адаптивний дизайн

- Адаптивна сітка статей (різна кількість колонок залежно від розміру екрану)
- Мобільна адаптація всіх сторінок
- Адаптивна навігація

## Контекст та стан додатку

Додаток використовує Context API для управління глобальним станом:

- Provider.tsx — головний провайдер, який містить:
  - Авторизацію користувачів
  - Управління статтями
  - Закладинки (paperclips) та лайки
  - Інформацію про користувачів

## API взаємодія

Додаток взаємодіє з бекендом через Axios. Основні ендпоінти:

- /api/users — операції з користувачами
- /api/articles — операції зі статтями

## Стилізація

Проєкт використовує модульну SCSS структуру:

- Базові змінні та міксини в \_variables.scss
- Адаптивні брейкпоінти для різних пристроїв
- Компонентні стилі в окремих файлах

## WIP

Деякі функції спрощені чи знаходяться в процесі розробки. Для прикладу, обкладинки та аватарки наразі реалізовані через додавання лінків, а не завантаження файлів.
