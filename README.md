# 🌍 Visa Navigator

Visa Navigator is a modern web application that helps users manage visa-related data with ease. It allows authenticated users to **add**, **view**, **update**, and **delete** visa records, with a clean and responsive user interface.

- 🔐 **Firebase Authentication**
- 📂 **MongoDB Database**
- ⚡ **Fast & Responsive Interface**
- 🚀 **Deployed on Firebase & Vercel**

---

## 🌐 Live Site

🔗 Live Link: [https://assignment10-c1fcc.web.app](https://assignment10-c1fcc.web.app)
🔗 Backend API: [https://visa-navigator-six.vercel.app/]
---

## ✨ Features

- **User Authentication**
  - Sign up and login using Firebase Authentication.
- **Visa Management**

  - Add visa records with fields such as:
    - Country name
    - Visa type
    - Processing time
    - Fee, validity
    - Application method
    - Required documents
    - Description & age restriction
  - View only your own visa submissions.
  - Update visa details in a modal.
  - Delete visas with confirmation prompts.

- **Applications Handling**
  - Submit and delete visa applications.
- **Responsive UI**

  - Mobile-first design with Tailwind CSS.
  - Clean card grid layout for visas.

- **Notifications**
  - Instant user feedback using `react-toastify`.

---

## 🛠 Tech Stack

### 🖥 Frontend

- React + Vite
- Firebase Authentication
- Tailwind CSS
- React Toastify

### 🔧 Backend

- Node.js
- Express.js
- MongoDB (Atlas)
- CORS

### ☁ Deployment

- **Frontend**: Firebase Hosting
- **Backend**: Vercel

---

## ⚙️ Setup & Installation

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/your-username/visa-navigator.git
cd visa-navigator
```

---

### 📦 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```
PORT=3000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
```

Start the backend:

```bash
npm start
```

> Runs at: [http://localhost:3000](http://localhost:3000)

---

### 💻 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Start the development server:

```bash
npm run dev
```

> Runs at: [http://localhost:5173](http://localhost:5173)

---

### 🗃️ 4. MongoDB Setup

- Create a **MongoDB Atlas** cluster.
- Whitelist your IP or allow access from anywhere (`0.0.0.0/0`).
- Make sure your connection string uses `DB_USER` and `DB_PASS`.

---

### 🔐 5. Firebase Authentication Setup

- Go to the [Firebase Console](https://console.firebase.google.com/)
- Enable **Email/Password Authentication**
- Add a **Web App** and copy config to your frontend `.env`
- Confirm integration in `AuthContext.jsx`

---

## 🚀 Deployment

### ✅ Frontend (Firebase Hosting)

```bash
npm install -g firebase-tools
firebase login
cd client
firebase init hosting
npm run build
firebase deploy --only hosting
```

> Deployed to: [https://assignment10-c1fcc.web.app](https://assignment10-c1fcc.web.app)

---

### ⚙️ Backend (Vercel)

- Push backend (`server/`) to a GitHub repo.
- Go to [Vercel Dashboard](https://vercel.com/)
- Create a project from your GitHub repo.
- Set environment variables in **Project Settings**:
  - `DB_USER`, `DB_PASS`, `PORT`
- Set root directory to `server/`
- Deploy

> Update frontend `VITE_API_URL` to match deployed backend (e.g., `https://visa-navigator-six.vercel.app`)

---

## 👨‍💻 Usage Guide

- **Sign Up / Login** via Firebase Authentication
- **Add Visa**: Go to "Add Visa" and submit the form
- **View My Visas**: See your added records
- **Update/Delete**: Use the modal or delete button for edits/removals

---

## 📬 Feedback & Contributions

Pull requests and feedback are welcome! Feel free to fork this repo and propose improvements.
