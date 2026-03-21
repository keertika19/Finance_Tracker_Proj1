# 💰 Personal Finance Tracker

A simple Personal Finance Tracker web app built using:

- **Frontend:** React (HTML + CSS + JSX)
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)

---

## 🚀 Features
- Add income and expense transactions
- View all transactions in a list
- Automatically calculate and display balance
- Delete transactions easily

---

## 🧩 Project Structure
```
finance-tracker/
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── Transaction.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── public/
    │   └── index.html
    └── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup
```bash
cd backend
npm install
npm start
```
➡️ By default, it connects to a local MongoDB at:
```
mongodb://localhost:27017/financeDB
```
Or, you can use MongoDB Atlas by updating the `.env` file:
```
MONGO_URI=your_mongodb_connection_string
```

---

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Then open:
👉 **http://localhost:5173**

---

## 📘 How It Works
1. Enter an amount, description, and select income or expense.
2. Click **Add** to store it in MongoDB.
3. The list below shows all transactions with delete options.
4. Balance updates automatically.

---

## 🎓 Ideal For
- College mini projects
- Learning full-stack development (React + Node + MongoDB)
- Simple personal finance tracking demo

---

**Author:** Keertika Acharya  
**Project Type:** College Mini Project  
**Tech Stack:** MERN (simplified)

