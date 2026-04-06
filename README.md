# 📝 BlogApp

A full-featured personal blog application built with **React** and **Appwrite** — supporting rich text editing, authentication, and global state management.

---

## 🚀 Features

- 🔐 User Authentication — Login & Signup powered by Appwrite
- ✍️ Rich Text Editor — Write posts using the TinyMCE editor
- 📄 Create, Read, Update & Delete blog posts
- 🗃️ Global State Management with Redux Toolkit
- 📋 Form handling with React Hook Forms
- 📦 Backend-as-a-Service via Appwrite (database, auth, storage)
- 📱 Responsive design for mobile and desktop

---

## 🛠️ Tech Stack

| Layer            | Technology           |
|------------------|----------------------|
| Frontend         | React                |
| Backend / BaaS   | Appwrite             |
| State Management | Redux Toolkit        |
| Forms            | React Hook Form      |
| Rich Text Editor | TinyMCE              |
| Routing          | React Router DOM     |

---

## 📁 Project Structure
```
blogApp/
├── public/
├── src/
│   ├── appwrite/          # Appwrite config & service files
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── store/             # Redux Toolkit store & slices
│   ├── config/             # Accessing env variables
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/hundal-simar/blogApp.git
cd blogApp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add:
```env
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""
```

### 4. Start the dev server
```bash
npm run dev
```
