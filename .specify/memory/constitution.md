<!-- Sync Impact Report:
- Version change: old (template) → 1.0.0
- List of modified principles:
    - [PRINCIPLE_1_NAME] -> "I. Code Organization & Structure"
    - [PRINCIPLE_2_NAME] -> "II. Secure Development Practices"
    - [PRINCIPLE_3_NAME] -> "III. Comprehensive Testing"
    - [PRINCIPLE_4_NAME] -> "IV. Environment Configuration"
    - [PRINCIPLE_5_NAME] -> "V. Deployment & Operational Readiness"
    - [PRINCIPLE_6_NAME] -> "VI. Performance & Error Handling"
- Added sections:
    - "Additional Requirements"
    - "Development Practices"
    - "Governance"
- Removed sections: None
- Templates requiring updates:
    - .specify/templates/plan-template.md ⚠ pending
    - .specify/templates/spec-template.md ⚠ pending
    - .specify/templates/tasks-template.md ⚠ pending
    - All command files in .specify/templates/commands/*.md ⚠ pending
    - README.md ⚠ pending
- Follow-up TODOs: None
-->
# Todo Application Constitution

## Core Principles

### I. Code Organization & Structure
Adhere to defined backend and frontend directory structures. Maintain clear separation of concerns (e.g., models, routes, services) and use specified naming conventions for files and folders.

### II. Secure Development Practices
Implement robust authentication (e.g., strong password policies, JWT with refresh tokens) and authorization (user-specific data access, endpoint protection). Protect against common vulnerabilities (SQL injection, XSS, CSRF) and secure sensitive data (bcrypt for passwords).

### III. Comprehensive Testing
Mandate unit, integration, and E2E tests for both backend and frontend. Strive for a minimum of 80% code coverage for backend services. Ensure all API endpoints are tested and verified.

### IV. Environment Configuration
All sensitive data and environment-specific settings (e.g., database URLs, secret keys, API URLs) must be managed via environment variables (`.env` for backend, `.env.local` for frontend). Hardcoding sensitive information is strictly prohibited.

### V. Deployment & Operational Readiness
Adhere to specified deployment platforms (Railway/Render for backend, Vercel for frontend). Implement monitoring (Sentry, Vercel Analytics, Neon dashboard) and a robust backup strategy (daily automated backups, point-in-time recovery, 30-day retention).

### VI. Performance & Error Handling
Meet defined performance benchmarks for API response times and frontend load metrics (FCP, TTI, Lighthouse score). Implement standardized API error responses with appropriate HTTP status codes and detailed messages.

## Additional Requirements

**Security Requirements:** Password minimum 8 characters with uppercase, lowercase, number, special character. JWT tokens with 24-hour expiration and refresh token mechanism. Secure HTTP-only cookies. Users can only access their own todos. All API endpoints require authentication (except auth endpoints). CORS configured for frontend domain only. Passwords hashed using bcrypt (cost factor: 12). SQL injection prevention via SQLModel ORM. XSS protection in frontend. CSRF token validation.
**Deployment Specifications:** Backend deployed on Railway/Render (Production environment) with Neon Serverless PostgreSQL. Frontend deployed on Vercel (Production environment) using Static Site Generation (SSG) where possible.
**Performance Benchmarks:** API Performance: GET /todos < 100ms, POST /todos < 150ms, Authentication < 200ms. Frontend Performance: First Contentful Paint < 1.5s, Time to Interactive < 3s, Lighthouse Score > 90.
**Error Handling:** API error responses follow a standardized JSON format with `error`, `message`, `details`, and `timestamp` fields. HTTP Status Codes: 200, 201, 204, 400, 401, 403, 404, 500.

## Development Practices

**Code Organization:** Adhere to specified backend and frontend directory structures.
*   Backend: `app/main.py`, `models/`, `routes/`, `services/`, `database.py`, `config.py`.
*   Frontend: `app/`, `components/`, `lib/`.
**Environment Variables:** Backend (`.env`): `DATABASE_URL`, `SECRET_KEY`, `ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`. Frontend (`.env.local`): `NEXT_PUBLIC_API_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`.
**Testing Requirements:** Unit tests for all services and components. Integration tests for API endpoints and forms. E2E tests for critical flows (signup, login, CRUD). Database migration tests.

## Governance

The project follows a Git Workflow: `main` branch for production-ready code, `develop` for integration, and `feature` branches for new features. Commit messages adhere to Conventional Commits format. Monitoring tools include Sentry, Vercel Analytics, and Neon dashboard. Daily automated database backups with point-in-time recovery and 30-day retention are mandated.

**Version**: 1.0.0 | **Ratified**: 2025-12-07 | **Last Amended**: 2025-12-07