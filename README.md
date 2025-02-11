# 📌 Asset Management

An **Asset Management Dashboard** built with **React (Vite)** for the frontend and **Node.js with MongoDB** for the backend. The application helps users efficiently manage assets, including adding, editing, and deleting assets and categories.

---

## 🚀 Live Demo
### 🌐 Frontend: [Live App](https://inspacco-frontend.vercel.app/)
### 🔗 Backend API: [API Endpoint](https://insapcco-project.vercel.app/)

---

## 🛠️ Tech Stack
### Frontend:
- React (Vite)
- Tailwind CSS (for styling)
- Axios (for API requests)
- React Router (for navigation)
- DaisyUI (for UI components)

### Backend:
- Node.js (Express.js)
- MongoDB (Mongoose for ORM)
- JWT (JSON Web Token for authentication)
- Vercel Serverless Functions

---

## 📝 Features
✅ User Authentication (Login & Logout)
✅ Manage Assets (Add, Edit, Delete)
✅ Manage Categories
✅ Responsive UI with Dark Mode
✅ Serverless API with MongoDB

---

## 🔥 API Endpoints
### 🔹 Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### 🔹 Assets
- `POST /api/assets` - Fetch all assets
- `POST /api/assets` - Add a new asset
- `POST /api/assets/:id` - Edit asset
- `POST /api/assets/:id` - Delete asset

### 🔹 Categories
- `POST /api/categories` - Fetch all categories
- `POST /api/categories` - Add a new category
- `POST /api/categories/:id` - Delete category
