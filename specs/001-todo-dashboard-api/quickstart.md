# Quickstart: Connect Dashboard to Backend Todo Service

**Feature Branch**: `001-todo-dashboard-api`  
**Date**: 2025-12-12  
**Spec**: [link to spec.md]
**Plan**: [link to plan.md]

This document outlines the steps to quickly set up and run the frontend application with the integrated backend todo service.

## Prerequisites

-   **Backend Running**: Ensure the FastAPI backend is running and accessible. Follow the backend's quickstart instructions if not already set up.
    -   Expected address: `http://localhost:8000`
-   **Node.js and npm**: Installed on your system.
-   **Git**: Installed on your system.

## Setup Steps

### 1. Clone the repository (if you haven't already)

```bash
git clone <repository-url>
cd HackathonPhase3 # Or your project root
```

### 2. Switch to the feature branch

```bash
git checkout 001-todo-dashboard-api
```

### 3. Backend Setup (if not already running)

Navigate to the `backend` directory and start the FastAPI application:

```bash
cd backend
# Make sure your Python environment is set up and dependencies are installed
# Example: uv pip install -r requirements.txt
uv run uvicorn app.main:app --reload --port 8000
# Ensure your database is connected (e.g., Neon PostgreSQL)
```

The backend should now be running on `http://localhost:8000`.

### 4. Frontend Setup and Configuration

Navigate to the `frontend` directory:

```bash
cd frontend
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env.local` file in the `frontend/` directory if it doesn't exist, and add the following:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

This ensures the frontend knows where to find the backend API.

### 5. Run the Frontend Application

```bash
npm run dev
```

The frontend application should now be running on `http://localhost:3000` (or another port if configured).

## Verification

1.  Open your browser and navigate to `http://localhost:3000`.
2.  Log in using valid user credentials.
3.  Upon successful login, you should be redirected to the dashboard.
4.  Verify that todo items are loaded from the backend (not mock data).
5.  Test creating, updating, deleting, and toggling completion of todo items. These changes should persist after page refreshes.

## Troubleshooting

-   **Frontend "Failed to fetch" errors**:
    -   Ensure the backend is running on `http://localhost:8000`.
    -   Check that `NEXT_PUBLIC_API_URL` in `frontend/.env.local` is correctly set.
    -   Verify that CORS is correctly configured in the backend to allow requests from `http://localhost:3000`.
-   **Authentication issues**:
    -   Ensure your JWT token is correctly being sent with requests.
    -   Check the backend logs for authentication errors.
-   **"Todo not found" or validation errors**:
    -   Review the network requests in your browser's developer tools to see the API response. These usually indicate issues with the data sent or an invalid todo ID.