# Quickstart Guide: Todo Dashboard Frontend

**Branch**: `001-todo-dashboard` | **Date**: December 7, 2025 | **Plan**: specs/001-todo-dashboard/plan.md

This guide provides instructions to set up and run the client-side Todo Dashboard application.

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm or Yarn package manager

## Setup Instructions

1.  **Clone the repository (if you haven't already)**:
    ```bash
    git clone [your-repository-url]
    cd [your-repository-name]
    ```

2.  **Switch to the feature branch**:
    ```bash
    git checkout 001-todo-dashboard
    ```

3.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

4.  **Install dependencies**:
    ```bash
    npm install
    # or if you use Yarn
    # yarn install
    ```

5.  **Configure environment variables**:
    Create a `.env.local` file in the `frontend/` directory if it doesn't exist, and add the following (replace with your actual values if different, especially for authentication setup):
    ```env
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    BETTER_AUTH_SECRET=your-secret-key-minimum-32-characters-long
    BETTER_AUTH_URL=http://localhost:3000
    ```
    *Note*: For a full authentication flow, ensure `BETTER_AUTH_SECRET` is a strong, random key (minimum 32 characters).

6.  **Run the development server**:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```

7.  **Access the application**:
    Open your web browser and navigate to `http://localhost:3000`.
    The login/signup page will be displayed. After logging in, you will be redirected to the Todo Dashboard (`/dashboard`).

## Initial Data

The application starts with static mock data. Any changes made to the todo list will reset upon page refresh.

## Key Files for Development

- `frontend/app/dashboard/page.tsx`: Main component for the Todo Dashboard UI.
- `frontend/lib/auth-client.ts`: Client-side authentication utilities.
- `frontend/components/`: Directory for reusable UI components (e.g., Header, Stats Cards, Todo List items). (To be implemented)
