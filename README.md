# CARTON.

> An archival journal system for the modern researcher.
> Built with strict TypeScript, Node.js, and a custom Tailwind v4 design system.

![Project Status](https://img.shields.io/badge/status-production--ready-2F4F4F?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/stack-PERN-E6DED5?style=for-the-badge&labelColor=2C2C2C)

## 📦 Project Overview

Carton is a full-stack journaling application designed with a unique "Archival/Field Log" aesthetic. It moves away from generic SaaS styling to offer a tactile, notebook-like experience.

**Core Features:**
- **Secure Identity:** JWT-based authentication with bcrypt hashing.
- **The Archive:** CRUD operations for journal entries with search & category filtering.
- **Personnel Record:** User profile management with avatar selection.
- **Visual System:** A custom "No-Config" Tailwind v4 theme engine.

---

## 📸 Interface Preview

### 1. Researcher Access (Login)
*Secure entry point featuring the "Archival Log" aesthetic and custom input fields.*
<img src="./screenshots/login.png" width="600" alt="Login Screen">

<br>

### 2. The Archive Dashboard
*The central command center. Features a custom sidebar, brutalist card grid, and real-time search filtering.*
<img src="./screenshots/dashboard.png" width="600" alt="Dashboard Interface">

<br>

### 3. Data Entry Log (Modal)
*A "File Folder" overlay for creating notes without leaving the context of the dashboard.*
<img src="./screenshots/modal.png" width="600" alt="Create Note Modal">

<br>

### 4. Personnel Record (Profile)
*User management screen allowing researchers to update their bio and select visual identification stamps.*
<img src="./screenshots/profile.png" width="600" alt="User Profile Page">

---
## 🛠 Tech Stack

**Frontend:**
- **Framework:** React 18 + Vite
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **State:** Context API + Custom Hooks
- **HTTP:** Axios with Interceptors

**Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Auth:** JSON Web Tokens (JWT) + Bcrypt

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or Cloud)

### 1. Backend Setup

```bash
cd backend
npm install

# Setup Environment
# Create a .env file with:
# DATABASE_URL="postgresql://user:pass@localhost:5432/carton_db"
# JWT_SECRET="your-secret-key"

# Initialize Database
npx prisma migrate dev --name init

# Run Server
npm run dev
```
### 2. Frontend Setup

```bash
cd frontend
npm install

# Run Server
npm run dev
```