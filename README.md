# tradingviewhook_backend

This project provides a basic member management REST API using **Fastify** running on **Node.js**.

## Features

- CRUD routes under `/members` storing data in memory
- Implemented with the Fastify framework
- Runs as a standard Node.js server

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. The API will be available at `http://localhost:3000` with routes:
   - `GET /members` – list members
   - `POST /members` – create member `{ "name": "A", "email": "a@example.com" }`
   - `GET /members/:id` – get member by id
   - `PUT /members/:id` – update member
   - `DELETE /members/:id` – delete member

Data is stored in memory and will reset when the server restarts. For persistent storage consider using a real database.
