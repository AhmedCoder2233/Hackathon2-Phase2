# Implementation Plan: Connect Dashboard to Backend Todo Service

**Branch**: `001-todo-dashboard-api` | **Date**: 2025-12-12 | **Spec**: specs/001-todo-dashboard-api/spec.md
**Input**: Feature specification from `/specs/001-todo-dashboard-api/spec.md`

## Summary

The primary requirement is to replace mock data in the frontend dashboard with real API calls to a backend todo service, enabling users to view, create, update, delete, and toggle completion of their to-do items securely. The technical approach involves creating an API client in the frontend to interact with the backend, handling authentication, and managing various error scenarios.

## Technical Context

**Language/Version**: The frontend is a Next.js application, so TypeScript/JavaScript. The backend is already built with FastAPI (Python). The plan focuses on frontend integration.  
**Primary Dependencies**: React, Next.js, FastAPI (backend already exists), a JWT handling library on the frontend (e.g., `next-auth` or similar for session management).  
**Storage**: PostgreSQL (backend already configured).  
**Testing**: Frontend: Jest/React Testing Library (for unit/integration), Cypress/Playwright (for E2E). Backend: Pytest (already configured).  
**Target Platform**: Web (browser-based application).
**Project Type**: Web application (frontend + backend).  
**Performance Goals**:
-   API Performance (as per constitution): GET /todos < 100ms, POST /todos < 150ms, Authentication < 200ms.
-   Frontend Performance (as per constitution): First Contentful Paint < 1.5s, Time to Interactive < 3s, Lighthouse Score > 90.  
**Constraints**:
-   Secure communication between frontend and backend.
-   User-specific data access.
-   Responsive UI with loading states.
-   Robust error handling.  
**Scale/Scope**: Manage user-specific todo lists; typical application user base.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**I. Code Organization & Structure**: Adhere to defined backend and frontend directory structures. Maintain clear separation of concerns (e.g., models, routes, services) and use specified naming conventions for files and folders.
    - **Status**: PASSED. The plan involves creating a new API client in `app/lib/api.ts` and modifying `app/dashboard/page.tsx`, adhering to the `frontend/` `app/` and `lib/` structure.

**II. Secure Development Practices**: Implement robust authentication (e.g., strong password policies, JWT with refresh tokens) and authorization (user-specific data access, endpoint protection). Protect against common vulnerabilities (SQL injection, XSS, CSRF) and secure sensitive data (bcrypt for passwords).
    - **Status**: PASSED. The plan explicitly mentions using JWT for authentication and ensuring users only access their own todos. It also covers handling authentication failures.

**III. Comprehensive Testing**: Mandate unit, integration, and E2E tests for both backend and frontend. Strive for a minimum of 80% code coverage for backend services. Ensure all API endpoints are tested and verified.
    - **Status**: PASSED (for planning stage). The plan outlines various testing scenarios in the spec's "Testing Checklist" and "Success Criteria", which will guide testing implementation.

**IV. Environment Configuration**: All sensitive data and environment-specific settings (e.g., database URLs, secret keys, API URLs) must be managed via environment variables (`.env` for backend, `.env.local` for frontend). Hardcoding sensitive information is strictly prohibited.
    - **Status**: PASSED. The plan explicitly states adding `NEXT_PUBLIC_API_URL` to `.env.local` and using it in the API client, aligning with this principle.

**V. Deployment & Operational Readiness**: Adhere to specified deployment platforms (Railway/Render for backend, Vercel for frontend). Implement monitoring (Sentry, Vercel Analytics, Neon dashboard) and a robust backup strategy (daily automated backups, point-in-time recovery, 30-day retention).
    - **Status**: PASSED (for planning stage). The plan is for a frontend component that will be deployed on Vercel, integrating with an existing backend. The specific deployment and monitoring aspects will be handled at a higher level but the integration aligns with the operational readiness.

**VI. Performance & Error Handling**: Meet defined performance benchmarks for API response times and frontend load metrics (FCP, TTI, Lighthouse score). Implement standardized API error responses with appropriate HTTP status codes and detailed messages.
    - **Status**: PASSED. The plan includes displaying loading indicators during API calls and robust error handling for various scenarios (authentication failure, service unavailability, network errors, validation errors, item not found), which contributes to meeting these principles.

## Project Structure

**Structure Decision**: The project uses an Option 2: Web application structure with separate `backend/` and `frontend/` directories. This plan primarily focuses on modifications within the `frontend/` directory.

```text
backend/ (already exists)
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── app/
│   ├── dashboard/
│   │   └── page.tsx      # Modified to integrate API calls
│   └── lib/
│       └── api.ts        # New file for API client functions
├── components/
├── lib/
│   ├── auth-client.ts
│   ├── auth.ts
│   ├── todo-client.ts    # Might be replaced/merged with new api.ts
│   └── todo-data.ts      # Likely to be removed/refactored
├── public/
├── types/
│   └── todo.ts           # Existing type definition to be used
└── .env.local            # Modified to add NEXT_PUBLIC_API_URL
```