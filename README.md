# PC Store Admin Panel

Система управління замовленнями для інтернет-магазину комплектуючих ПК.

Проект реалізований у рамках курсової роботи з використанням сучасної клієнт-серверної архітектури.

---

# Основний функціонал

- JWT авторизація
- Адміністративна панель
- CRUD товарів
- CRUD категорій
- Управління замовленнями
- Зміна статусів замовлень
- Автоматичне оновлення складських залишків
- Пошук, сортування та фільтрація товарів
- Завантаження зображень товарів
- Dashboard статистика
- Responsive UI

---

# Технології

## Frontend

- React.js
- React Router DOM
- Axios
- SCSS
- React Toastify
- Vite

## Backend

- Python
- Flask
- SQLAlchemy
- Flask-CORS
- JWT Authentication

## Database

- MySQL

---

# Архітектура проекту

```bash
course-work-oop-db/

├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── router/
│   │   └── styles/
│   │
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.py
│   │
│   ├── uploads/
│   ├── venv/
│   └── requirements.txt
│
└── README.md
```

---

# ER Diagram

Система використовує реляційну базу даних MySQL.

Основні сутності:
- Users
- Products
- Categories
- Orders
- OrderItems
- Carts
- CartItems

---

# Backend запуск

## 1. Перехід у backend

```bash
cd backend
```

## 2. Створення virtual environment

```bash
python -m venv venv
```

## 3. Активація venv

### Windows

```bash
venv\Scripts\activate
```

### Linux / MacOS

```bash
source venv/bin/activate
```

## 4. Встановлення залежностей

```bash
pip install -r requirements.txt
```

## 5. Створення .env

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pc_store_db

JWT_SECRET_KEY=pc_store_super_secret_jwt_key_2026
```

## 6. Запуск backend

```bash
cd app
python app.py
```

Backend запускається на:

```txt
http://127.0.0.1:5000
```

---

# Frontend запуск

## 1. Перехід у frontend

```bash
cd frontend
```

## 2. Встановлення залежностей

```bash
npm install
```

## 3. Запуск frontend

```bash
npm run dev
```

Frontend запускається на:

```txt
http://localhost:5173
```

---

# Основні API Routes

## Auth

```http
POST /auth/register
POST /auth/login
```

## Products

```http
GET /products
POST /products
PUT /products/:id
DELETE /products/:id
```

## Categories

```http
GET /categories
POST /categories
DELETE /categories/:id
```

## Orders

```http
GET /orders
POST /orders
PUT /orders/:id/status
```

---

# Бізнес-логіка системи

- При статусі `completed` товари автоматично списуються зі складу.
- При статусі `cancelled` товари повертаються на склад.
- JWT використовується для захисту API.
- Admin middleware обмежує доступ до критичних маршрутів.
- Зображення товарів завантажуються на сервер та зберігаються у файловій системі.

---

# Основні можливості Dashboard

- Кількість товарів
- Кількість категорій
- Кількість замовлень
- Швидка навігація по системі

---

# Автор

Курсова робота студента Міжрегіональної Академії Управлінням Персоналом,
Фостіка Андрія Богдановича 
---

# Ліцензія

Навчальний проект.
