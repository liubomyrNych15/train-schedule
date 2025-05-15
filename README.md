# 🚆 Train Schedule Application

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![Deploy on Vercel](https://vercel.com/button)](#)

> A robust full-stack application to manage and visualize train schedules, featuring authentication, CRUD operations, search, sorting, and responsive design.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠 Technologies](#-technologies)
- [📐 Architecture](#-architecture)
- [🖼 Screenshots](#-screenshots)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [⚡ Usage](#-usage)
- [📦 Project Structure](#-project-structure)
- [🔗 API Endpoints](#-api-endpoints)
- [🧪 Testing](#-testing)
- [☁️ Deployment](#️-deployment)
- [🤝 Contributing](#-contributing)
- [✉️ Contact](#-contact)

---

## ✨ Features

- **Authentication**: Secure login/signup with JWT.
- **CRUD Operations**: Create, Read, Update, Delete train schedules.
- **Search & Sort**: Filter and order schedules by departure, arrival, origin, destination.
- **Responsive Design**: Mobile-first layout using Next.js and Tailwind CSS.
- **Validation & Error Handling**: Backend DTO validation and global exception filters.
- **Docker Support**: Ready for containerized deployment.
- **CI/CD**: Example GitHub Actions workflow for automated testing & deployment.

---

## 🛠 Technologies

- **Backend**: Nest.js, Node.js, TypeScript, TypeORM, PostgreSQL  
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Axios  
- **Auth**: Passport.js, JWT  
- **DevOps**: Docker, GitHub Actions, Vercel, Heroku  

---

## 📐 Architecture

```mermaid
graph LR
  client[Next.js Client] -->|HTTP/HTTPS| api[Backend API (Nest.js)]
  api --> db[(PostgreSQL Database)]
  auth[Auth Module] --> api
  trains[Trains Module] --> api
```

---

## 🖼 Screenshots

![Login Page](./screenshots/login.png)  
![Schedule Dashboard](./screenshots/dashboard.png)  

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 16.x  
- **npm**  
- **PostgreSQL** >= 12.x  
- **Docker** (optional)

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/liubomyrNych15/train-schedule.git
   cd train-schedule
   ```

2. **Install dependencies**  
   ```bash
   # Backend
   cd backend && npm install

   # Frontend
   cd ../frontend && npm install
   ```

### Environment Variables

Create a `.env` in `backend/` and `.env.local` in `frontend/` with:

| Variable                | Description                      |
|-------------------------|----------------------------------|
| `DB_HOST`               | PostgreSQL host                  |
| `DB_PORT`               | PostgreSQL port                  |
| `DB_USER`               | PostgreSQL username              |
| `DB_PASS`               | PostgreSQL password              |
| `DB_NAME`               | PostgreSQL database name         |
| `JWT_SECRET`            | Secret key for JWT signing       |
| `NEXT_PUBLIC_API_URL`   | URL of backend API (e.g., localhost:3000) |

### Running the Application

```bash
# Start backend (watch mode)
cd backend
npm run start:dev

# Start frontend
cd ../frontend
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## ⚡ Usage

1. Register or login using valid credentials.
2. Create new train entries with departure & arrival times.
3. Use the search bar to filter by train name or route.
4. Click column headers to sort schedules ascending/descending.
5. Edit or delete entries via the action buttons.

---

## 📦 Project Structure

```
train-schedule/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── trains/
│   │   ├── common/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── package.json
└── frontend/
    ├── pages/
    ├── components/
    ├── services/
    ├── context/
    ├── public/
    ├── .env.local
    └── package.json
```

---

## 🔗 API Endpoints

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| POST   | `/auth/login`      | Authenticate user         |
| POST   | `/auth/register`   | Register new user         |
| GET    | `/trains`          | List all train schedules  |
| GET    | `/trains/:id`      | Get schedule by ID        |
| POST   | `/trains`          | Create a new schedule     |
| PATCH  | `/trains/:id`      | Update schedule           |
| DELETE | `/trains/:id`      | Delete schedule           |

---

## 🧪 Testing

- **Backend**: `npm run test` (Jest)  
- **Frontend**: `npm run test` (if configured with Jest/React Testing Library)  

---

## ☁️ Deployment

- **Backend**: Deploy to Heroku  
- **Frontend**: Deploy to Vercel  

Example GitHub Actions workflow available in `.github/workflows/ci.yml`.

---

## 🤝 Contributing

1. Fork the repo  
2. Create a branch (`git checkout -b feature/XYZ`)  
3. Commit your changes (`git commit -m 'Add feature'`)  
4. Push (`git push origin feature/XYZ`)  
5. Open a Pull Request  

---

## ✉️ Contact

Created by [Liubomyr Nych](mailto:liubomyr.nych@gmail.com). Feel free to reach out!