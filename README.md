# 🗨️ Social Media MERN Application

A **full-stack real-time social media application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** with **Redux Toolkit**, **Socket.IO**, and **Material UI (MUI)**.
It supports **authentication**, **real-time chat**, **posts, comments, profile management**, and **responsive UI** for both desktop and mobile devices.

---

## 🚀 Features

### 👤 Authentication

* User **Sign Up / Login / Logout**
* Protected routes using JWT tokens
* Secure cookie-based authentication

### 💬 Real-time Chat

* Instant messaging using **Socket.IO**
* Displays online/offline user status
* Chat page with responsive layout
* Message persistence via MongoDB

### 📰 Social Feed

* Create, edit, and delete posts
* Like and comment on posts
* View posts from other users
* Auto-update feed on new content

### 👥 User System

* Suggested users list
* View profiles and follow users
* Update profile picture and details

### 📱 Responsive Design

* Fully responsive using **Material UI** and **Flexbox**
* Collapsible sidebar for small screens
* Smooth user experience across devices

---

## 🏗️ Folder Structure

```
social-media/
│
├── backend/
│   ├── controllers/       # Logic for routes
│   ├── middlewares/       # Auth & error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── socket/            # Socket.IO setup for chat
│   ├── utils/             # Utility functions
│   ├── index.js           # Express app entry point
│
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images & icons
│   │   ├── components/
│   │   │   ├── ui/        # UI components (ChatPage, Feed, Profile, etc.)
│   │   ├── hooks/         # Custom React hooks (API, socket)
│   │   ├── lib/           # Utility JS files
│   │   ├── redux/         # Redux store, slices
│   │   ├── App.jsx        # Root component
│   │   ├── main.jsx       # React entry file
│   │   ├── index.css      # Global styles
│   │
│   ├── vite.config.js     # Frontend build config
│
├── .env                   # Environment variables
├── package.json           # Root dependencies
├── README.md              # Project documentation
```

---

## ⚙️ Tech Stack

### Frontend

* **React.js**
* **Redux Toolkit**
* **Material UI**
* **Axios**
* **Vite** (for fast builds)

### Backend

* **Node.js**
* **Express.js**
* **MongoDB with Mongoose**
* **Socket.IO**
* **CORS / dotenv / cookie-parser**

---

## 🧩 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/prem1kr/Full-stack-social-media-app.git
cd Full-stack-social-media-app
```

---

## 🔌 Environment Variables
| Variable     | Description                       |
| ------------ | --------------------------------- |
| `PORT`       | Backend server port               |
| `MONGO_URI`  | MongoDB connection string         |
| `SECRET_KEY` | Secret key for JWT authentication |
| `URL`        | Frontend origin (for CORS)        |
| `API_KEY`    | Cloudinary API Key                |
| `API_SECRET` | Cloudinary API Secret             |
| `CLOUD_NAME` | Cloudinary Cloud Name             |

---

## 💬 Real-time Messaging

* Built using **Socket.IO**
* Automatically connects on login
* Updates message threads instantly
* Displays online status dynamically

---

## 🧠 Redux State Management

Redux slices:

* `authSlice` → handles login, logout, current user
* `chatSlice` → handles messages, online users

---

## 🧪 API Endpoints (Sample)

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| `POST` | `/api/v1/auth/register`    | Register new user   |
| `POST` | `/api/v1/auth/login`       | Login user          |
| `GET`  | `/api/v1/user/suggested`   | Get suggested users |
| `POST` | `/api/v1/message/send/:id` | Send message        |
| `GET`  | `/api/v1/message/:id`      | Get chat messages   |

---

## 🧰 Scripts

### Backend

```bash
npm run dev       # Start server in development
npm run start         # Start production server
```

### Frontend

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🧑‍💻 Author

**Pre Kumar**
💼 Full-Stack Developer
📧 [prem78334@gmail.com]



