# Quickstart: Backend API for Todo with JWT Authentication

**Feature Branch**: `001-fastapi-todo-auth`
**Date**: 2025-12-12

This document provides a quick guide to set up and run the Backend API for the Todo application with JWT Authentication.

## 1. Setup

### 1.1. Install Dependencies (using UV)

Navigate to the `backend/` directory and install the required Python dependencies using `uv`:

```bash
cd backend/
uv init
uv add "fastapi[standard]" sqlalchemy psycopg2-binary pyjwt python-dotenv
```

### 1.2. Environment Variables (`.env`)

Create a `.env` file in the `backend/` directory with the following content. Replace the placeholder values with your actual database URL and a strong secret key.

```env
DATABASE_URL="postgresql://user:password@host:port/database"
BETTER_AUTH_SECRET="your-secret-key-minimum-32-characters-long"
```
**Note**: Ensure your `DATABASE_URL` points to a PostgreSQL instance (e.g., Neon). The `BETTER_AUTH_SECRET` is used for signing JWT tokens and should be kept confidential and strong.

## 2. Run Commands

### 2.1. Start Backend API

From the `backend/` directory, start the FastAPI application using `uvicorn`:

```bash
cd backend/
uv run uvicorn app.main:app --reload --port 8000
```
The API will be accessible at `http://localhost:8000`. The `--reload` flag enables auto-reloading on code changes, which is useful for development.

### 2.2. Start Frontend (if applicable)

If you have the corresponding frontend application (e.g., a Next.js app as mentioned in the feature spec), navigate to its directory and start it:

```bash
cd frontend/
npm install # if not already done
npm run dev
```
The frontend will typically run on `http://localhost:3000`. Ensure that the frontend is configured to communicate with the backend API at `http://localhost:8000`.

## 3. API Endpoints

Once the backend is running, you can access the interactive API documentation (Swagger UI) at `http://localhost:8000/docs` to test the endpoints.

**Example Authentication Flow**:
1.  Obtain a JWT token (e.g., from an authentication service, not part of this specific feature's scope).
2.  Include the token in the `Authorization` header of your requests: `Authorization: Bearer <YOUR_JWT_TOKEN>`.

For detailed API definitions, refer to the `specs/001-fastapi-todo-auth/contracts/openapi.yaml` file.