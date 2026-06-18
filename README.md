# 🎯 Interview Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-Build-purple?style=for-the-badge&logo=vite)

**A Modern Full Stack Coding Interview & Assessment Platform**

Built with React, Express, MongoDB and designed with scalable production architecture.

</div>

---

# 📖 Overview

Interview Platform is a full-stack web application that provides an online environment for coding interviews, technical assessments, and DSA practice.

The platform is being developed using modern web technologies while following industry-standard software architecture and deployment practices.

It consists of:

- A React frontend for an interactive user experience
- An Express backend exposing REST APIs
- MongoDB for persistent storage
- Production-ready deployment on Render

The project follows a modular folder structure to ensure maintainability and scalability as new features are introduced.

---

# ✨ Planned Features

## 👤 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing
- Protected Routes
- Role Based Access

---

## 💻 Coding Environment

- Browse Coding Problems
- View Problem Details
- Online Code Editor
- Submit Solutions
- Test Case Evaluation
- Execution Result
- Submission History

---

## 📊 Dashboard

- User Profile
- Solved Problems
- Total Submissions
- Acceptance Rate
- Recent Activity

---

## 👨‍💼 Admin Panel

- Create Problems
- Update Problems
- Delete Problems
- Manage Test Cases
- Manage Users

---

## 🏆 Leaderboard

- Global Ranking
- Problem Wise Ranking
- Contest Ranking
- Score Tracking

---

# 🏗️ Project Architecture

```
                    Browser
                        │
                        │
                React Frontend
                        │
                        │ REST API
                        ▼
                Express Backend
                        │
                        │
                Business Logic
                        │
                        ▼
                   MongoDB Database
```

---

# 📂 Folder Structure

```
InterviewPlatform
│
├── backend
│   │
│   ├── src
│   │   │
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── lib
│   │   │    └── env.js
│   │   │
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   │
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── services
│   │   └── App.jsx
│   │
│   ├── dist
│   ├── package.json
│   └── vite.config.js
│
├── package.json
└── README.md
```

---

# ⚙️ Technology Stack

## Frontend

- React.js
- Vite
- JavaScript (ES6+)
- CSS

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB
- Mongoose

---

## Version Control

- Git
- GitHub

---

## Deployment

- Render

---

# 🔄 Application Flow

```
User
 │
 │
 ▼
React Frontend
 │
 │ HTTP Request
 ▼
Express Server
 │
 │
 ├── Authentication
 ├── Controllers
 ├── Middleware
 ├── Routes
 └── Models
 │
 ▼
MongoDB
 │
 ▼
Response
 │
 ▼
Frontend UI Update
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/02ayush02/Interview-Platform.git

cd Interview-Platform
```

---

# 📦 Install Dependencies

## Backend

```bash
cd backend

npm install
```

---

## Frontend

```bash
cd frontend

npm install
```

---

# ▶️ Running Locally

## Start Backend

```bash
cd backend

npm run dev
```

Runs on

```
http://localhost:3000
```

---

## Start Frontend

```bash
cd frontend

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🌐 Environment Variables

Create a `.env` file inside backend directory.

```
PORT=3000

DB_URL=your_mongodb_connection_string

NODE_ENV=development
```

---

# 📡 API Routes

## Health Check

```
GET /health
```

Response

```json
{
    "message":"Hello World"
}
```

---

## Books Endpoint

```
GET /books
```

Response

```json
{
    "message":"Again Working"
}
```

---

# 📌 Development Roadmap

### Phase 1

- [x] Project Initialization
- [x] Frontend Setup
- [x] Backend Setup
- [x] Deployment Configuration

---

### Phase 2

- [ ] MongoDB Integration
- [ ] Authentication
- [ ] JWT Authorization
- [ ] User Management

---

### Phase 3

- [ ] Problem CRUD
- [ ] Code Submission
- [ ] Test Case Evaluation
- [ ] Submission History

---

### Phase 4

- [ ] Dashboard
- [ ] Leaderboard
- [ ] Contest Mode
- [ ] Performance Analytics

---

### Phase 5

- [ ] AI Interview Assistant
- [ ] Video Interview Module
- [ ] Real-Time Collaboration

---

# 🎯 Design Principles

- Modular Architecture
- Separation of Concerns
- RESTful API Design
- Environment Based Configuration
- Scalable Folder Structure
- Production Ready Deployment
- Maintainable Codebase

---

# 📈 Future Improvements

- Docker Support
- CI/CD Pipeline
- Redis Caching
- WebSocket Integration
- Monaco Code Editor
- Piston API Integration
- AI Powered Interview Feedback
- Dark Theme
- Multi-language Code Execution

---

# 🤝 Contributing

```bash
Fork Repository

↓

Create Feature Branch

↓

Implement Feature

↓

Commit Changes

↓

Push Branch

↓

Open Pull Request
```

---

# 👨‍💻 Author

### Ayush Kumar Bhinde

GitHub

**https://github.com/02ayush02/Interview-Platform**

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star.

**Built with ❤️ using the MERN Stack**

</div>
