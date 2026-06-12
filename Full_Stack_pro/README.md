# 🚀 Full Stack Notes App (MERN)

🔗 **Live Demo:** https://cohort-2-0-cllb.onrender.com
🔗 **Live Demo:** http://51.20.67.178:3000/
  
 

---

## 📌 Overview

A full-stack Notes application built using the MERN stack.
Users can create, update, and delete notes with real-time UI updates and toast notifications.

The frontend is built with React and served directly from the backend (single deployment setup).

---

## 🧱 Tech Stack

### Frontend

* React (Hooks)
* Axios
* React Toastify
* CSS (custom styling)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## ⚙️ Features

* ✅ Create notes
* ✅ Edit notes (inline form update)
* ✅ Delete notes
* ✅ Form validation (frontend + backend)
* ✅ Toast notifications (success/error)
* ✅ REST API architecture
* ✅ Single-server deployment (frontend + backend together)

---

## 🏗️ Architecture

* React app is built using `npm run build`
* Generated `/dist` folder is served via Express
* Backend handles:

  * API routes (`/api/notes`)
  * Static frontend files

```bash
Frontend (React build)
        ↓
dist folder
        ↓
Express static middleware
        ↓
Served from same server
```

---
 
 
**Infrastructure:**

* Deployed on **AWS EC2 (Linux server)**
* Node.js server running on custom port (3000)
* Managed backend services and deployment manually

---

## 📁 Project Structure

```bash
project-root/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── dist/   # build output
│
└── README.md
```

---

## 🔌 API Endpoints

### 📌 Get Notes

```http
GET /notes
```

### 📌 Create Note

```http
POST /api/notes
```

### 📌 Update Note

```http
PUT /api/notes/:id
```

### 📌 Delete Note

```http
DELETE /api/notes/:id
```

---

## 🛠️ Installation & Setup

### 1. Clone repo

```bash
git clone <your-repo-url>
cd project
```

### 2. Install dependencies

```bash
npm install
cd frontend && npm install
```

### 3. Environment variables

Create `.env` in backend:

```env
MONGO_URI=your_mongodb_connection
PORT=3000
```

### 4. Run project

#### Development

```bash
npm run dev
```

#### Production (build + serve)

```bash
cd frontend
npm run build
```

---

## 🚀 Deployment

* Hosted on **Render**
* Frontend + backend served from same Node server
* Static build served using:

```js
app.use(express.static("dist"))
```

---

## ⚠️ Challenges Solved

* Handling async state updates in React
* Preventing empty form submissions
* Managing edit vs create logic
* Fixing API race conditions
* Serving React build from Express

---

## 📸 Screenshots

(Add screenshots here if needed)

---

## 📌 Future Improvements

* Authentication (JWT)
* User-specific notes
* Pagination
* Search & filter
* Optimistic UI updates

---

## 👨‍💻 Author

**Aditya Mishra**

---

## ⭐ If you like this project

Give it a star on GitHub ⭐
