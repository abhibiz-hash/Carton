# 📦 Carton API Documentation

**Base URL:** - Local: `http://localhost:3001/api`
- Production: `https://carton-z6mf.onrender.com`

**Authentication:**
All protected endpoints require a valid JWT token in the header:
`Authorization: Bearer <your_token_here>`

---

## 🔐 1. Authentication

- **Endpoint 1:** `POST /auth/register` — Register a new user
- **Endpoint 2:** `POST /auth/login` — Login and receive a JWT
---
## 👤 2. User Profile
- **Endpoint 1:** `GET /api/users/me` — Get current user's profile details
- **Endpoint 2:** `PUT /api/users/me` — Update name, bio, or avatar
---
## 📔 3. Journal Entries (Notes)
- **Endpoint 1:** `GET /api/notes` — Fetch all notes (supports ?search=query)
- **Endpoint 2:** `POST /api/notes` — Create a new note
- **Endpoint 3:** `PUT /api/notes/:id` — Update an existing note
- **Endpoint 4:** `DELETE /api/notes/:id` — Delete a note
---
