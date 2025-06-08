# tradingviewhook_backend

This project provides a basic member management REST API using **Hono** running on **Cloudflare Workers**.

## Features

- CRUD routes under `/members` storing data in memory
- Written in TypeScript using the Hono framework
- Can be deployed using Cloudflare Workers and `wrangler`

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start a development server (requires `wrangler`):

   ```bash
   npx wrangler dev
   ```

3. The API will be available at `http://localhost:8787` with routes:
   - `GET /members` – list members
   - `POST /members` – create member `{ "name": "A", "email": "a@example.com" }`
   - `GET /members/:id` – get member by id
   - `PUT /members/:id` – update member
   - `DELETE /members/:id` – delete member

Data is stored in memory and will reset when the worker restarts. For persistent storage consider using Cloudflare D1 or KV.
