# Secure Task Manager

A full-stack task management application with secure authentication, built using **React**, **Node.js**, **Express**, and **MongoDB**.

🔗 **Live Demo**

- Frontend: https://secure-task-manager-phi.vercel.app/
- Backend API: https://secure-task-manager-1.onrender.com/

---

## ✨ Features

- User signup & login (JWT authentication)
- Protected task APIs
- Create and delete tasks
- Tasks scoped per user
- Dark mode UI
- Mobile-friendly design
- Fully deployed (Vercel + Render)

---

## 🛠 Tech Stack

**Frontend**

- React, Vite, React Router
- CSS (Dark theme, responsive)

**Backend**

- Node.js, Express
- MongoDB, Mongoose
- JWT, bcrypt

---

## 🚀 Run Locally

### Backend

cd server
npm install

**Create .env:**

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

npm run dev

### Frontend

cd client
npm install

**Create .env:**

VITE_BACKEND_URL=http://localhost:5000/api

npm run dev

**📌 Future Improvements**

Task priority & ordering

Edit tasks

Drag-and-drop support

Refresh tokens
