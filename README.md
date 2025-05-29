# Visa Navigator

Visa Navigator is a web application for managing visa information, enabling users to add, view, update, and delete visa records. It includes user authentication, personalized visa filtering, and a responsive interface. The frontend is built with **React** and uses **Firebase Authentication**, while the backend is powered by **Node.js/Express** with **MongoDB** for data persistence. The application is deployed on Firebase Hosting (frontend) and Vercel (backend).

## Features
- **User Authentication**: Login/signup using Firebase Authentication.
- **Visa Management**:
  - Add new visas with fields like country name, visa type, processing time, fee, validity, application method, required documents, description, and age restriction.
  - View visas created by the logged-in user.
  - Update visa details via a modal interface.
  - Delete visas with confirmation prompts.
- **Responsive UI**: Grid layout for visa cards, optimized for mobile and desktop.
- **Real-Time Feedback**: Notifications using `react-toastify`.
- **MongoDB Backend**: Handles CRUD operations for visas and applications.

## Live Link
**https://assignment10-c1fcc.web.app**

## Tech Stack
- **Frontend**:
  - React
  - Vite (build tool)
  - Firebase Authentication
  - react-toastify (notifications)
  - Tailwind CSS (styling)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (via MongoDB Atlas)
  - CORS middleware
- **Deployment**:
  - Frontend: Firebase Hosting
  - Backend: Vercel

## Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Firebase project with Authentication enabled
- Vercel account (for backend deployment)
- Firebase CLI (for frontend deployment)
- npm or yarn

## Installation
### 1. Clone the Repository
```bash
git clone https://github.com/your-username/visa-navigator.git
cd visa-navigator

2. Backend Setup

Navigate to the backend directory (e.g., server/):cd server


Install dependencies:npm install


Create a .env file in the backend directory:PORT=3000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password


Replace your_mongodb_username and your_mongodb_password with your MongoDB Atlas credentials.


Start the backend server:npm start

The backend will run at http://localhost:3000.

3. Frontend Setup

Navigate to the frontend directory (e.g., client/):cd client


Install dependencies:npm install


Create a .env file in the frontend directory:VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging
VITE_FIREBASE_APP_ID=your_firebase_app_id


Replace Firebase variables with your Firebase project credentials (Firebase Console > Project Settings).
Update VITE_API_URL to https://visa-navigator-six.vercel.app for production.


Start the frontend development server:npm run dev

The frontend runs at http://localhost:5173 (default Vite port).

4. MongoDB Setup

Create a MongoDB Atlas cluster and obtain the connection string.
Ensure the connection string in the backend (uri in index.js) uses DB_USER and DB_PASS from .env.
Whitelist your IP or allow access from anywhere (0.0.0.0/0) in MongoDB Atlas Network Access settings.

5. Firebase Authentication Setup

Create a Firebase project and enable Authentication (Email/Password).
Add a web app to the Firebase project and copy the configuration to the frontend .env file.
Verify integration in AuthContext.jsx.

Deployment
Frontend (Firebase Hosting)

Install Firebase CLI:npm install -g firebase-tools


Login to Firebase:firebase login


Initialize Firebase in the frontend directory:cd client
firebase init hosting


Select your Firebase project.
Set the build directory to dist (Vite output).


Build the frontend:npm run build


Deploy to Firebase Hosting:firebase deploy --only hosting

The frontend will be deployed to https://assignment10-c1fcc.web.app.

Backend (Vercel Deployment)

Push the backend code to a GitHub repository (e.g., server/ directory).
In Vercel Dashboard:
Create a new project and link it to the backend repository.
Add environment variables (DB_USER, DB_PASS, PORT) in Settings > Environment Variables.
Set the root directory to server/ and configure for Node.js.


Deploy the backend. The URL (e.g., https://visa-navigator-six.vercel.app) is used in the frontend .env.

Usage

Sign Up/Login: Authenticate using Firebase Authentication.
Add Visa: Navigate to the "Add Visa" page to create a visa record.
View My Visas: Visit the "My Visas" page to see user-specific visas.
Update/Delete Visa: Use the "Update" button to edit via a modal or "Delete" to remove a visa.

