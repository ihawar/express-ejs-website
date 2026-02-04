# Doctor Reservation System

<p align="center">
  <img src="docs/media/banner.png" alt="express js fullstack website" />
</p>
A full-stack web application for managing doctor reservations, built with a clear server-rendered architecture and a focus on correctness, simplicity, and maintainability.

## ✨ Features

### Public Side

- Doctor homepage with basic information
- Reservation request form
- Server-side validation
- Visit logging (IP-based, rate-limited)

### Admin Panel

- Secure admin authentication (session-based)
- View and manage reservation requests
- Filter reservations by:
  - Status (Pending / Accepted / Declined)
  - Time range
  - Search by patient name

- Pagination for large datasets
- View logged site visits (IP, user agent, URL, timestamp)

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (via `better-sqlite3`)
- **Templating:** EJS (server-side rendering)
- **Styling:** Tailwind CSS
- **Architecture:** Server-rendered MVC-style flow

This is a full-stack application without relying on client-side frameworks.
Most logic lives on the server, keeping the frontend simple and predictable.

---

## 🧠 Architecture Overview

The project follows a clear and intentional request flow:

```
Route → Controller Logic → View (EJS)
```

- **Routes** handle request validation and HTTP concerns
- **Controllers** contain business logic and database interaction
- **Views (EJS)** are responsible only for presentation

This approach is similar to frameworks like Django or Laravel and avoids mixing concerns between layers.

Frontend JavaScript is used **only when necessary**, mainly for:

- Updating URL query parameters
- Improving usability (filters, search)

---

## 📊 Visit Logging

- Client IP addresses are logged in the database
- A visit is recorded **at most once per IP per hour**
- Requests to static assets are ignored
- Useful for lightweight analytics without external services

---

## 🚀 Getting Started (Production)

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file:

```env
SESSION_SECRET="helloworld"
HOST="0.0.0.0"
PORT="3000"
```

### 3. Initialize the database

```bash
node src/database/init.js
```

### 4. Create an admin user

```bash
node src/database/createAdmin.js
```

### 5. Start the application

```bash
npm start
```

---

## 🧪 Development Mode

### Run the server in development

```bash
npm run dev
```

### Compile Tailwind CSS (watch mode)

```bash
npx @tailwindcss/cli \
  -i ./src/input.css \
  -o ./src/public/css/styles.css \
  --watch
```

## 🎯 Purpose of This Project

This project was built to demonstrate:

- Backend and frontend integration
- Clean architectural thinking
- Practical database usage
- Real-world admin workflows
- Attention to correctness and edge cases

It intentionally avoids unnecessary complexity and external dependencies.
