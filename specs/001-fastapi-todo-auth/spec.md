# Feature Specification: Backend API for Todo with JWT Authentication

**Feature Branch**: `001-fastapi-todo-auth`  
**Created**: 2025-12-12  
**Status**: Draft  
**Input**: User description: "# Backend API Specification - FastAPI Todo **Feature**: Backend API with JWT Authentication **Stack**: FastAPI + SQLAlchemy + Neon PostgreSQL --- ## Setup ### Install Dependencies (using UV) ```bash cd backend uv init uv add "fastapi[standard]" uv add sqlalchemy psycopg2-binary pyjwt python-dotenv ``` ### Environment Variables (`.env`) ```env DATABASE_URL=postgresql://username:password@host/database BETTER_AUTH_SECRET=your-secret-key-minimum-32-characters-long ``` --- ## Project Structure ``` backend/ ├── app/ │ ├── main.py # FastAPI app + CORS │ ├── models.py # SQLAlchemy Todo model │ ├── schemas.py # Pydantic schemas │ ├── database.py # DB connection │ ├── auth.py # JWT verification │ └── routes/ │ └── todos.py # 5 API endpoints └── .env ``` --- ## Requirements ### Database Model (SQLAlchemy) ```python class Todo: id: UUID (primary key) user_id: String (from JWT token) title: String(500) description: String(2000) status: Enum("pending", "completed") priority: Enum("low", "medium", "high") due_date: String (ISO date) created_at: DateTime updated_at: DateTime completed_at: DateTime (nullable) ``` ### JWT Authentication - Extract token from `Authorization: Bearer <token>` header - Verify using `BETTER_AUTH_SECRET` from `.env` - Decode JWT to get `user_id` (from `sub` claim) - Return 401 if token invalid/expired - All 5 endpoints require authentication ### 5 API Endpoints #### 1. Get All Todos ``` GET /todos/ Headers: Authorization: Bearer <token> Response: List of todos for authenticated user ``` #### 2. Add Todo ``` POST /todos/ Headers: Authorization: Bearer <token> Body: { "title": "string", "description": "string", "priority": "low|medium|high", "due_date": "2025-12-10" } Response: Created todo object ``` #### 3. Update Todo ``` PUT /todos/{todo_id} Headers: Authorization: Bearer <token> Body: { "title": "string" (optional), "description": "string" (optional), "priority": "low|medium|high" (optional), "due_date": "2025-12-10" (optional), "status": "pending|completed" (optional) } Response: Updated todo object ``` #### 4. Delete Todo ``` DELETE /todos/{todo_id} Headers: Authorization: Bearer <token> Response: 204 No Content ``` #### 5. Mark as Done/Undone ``` PATCH /todos/{todo_id}/complete Headers: Authorization: Bearer <token> Response: Updated todo (toggles status) ``` ### Security Rules - User can only access their own todos (filter by `user_id` from token) - Return 404 if todo not found or belongs to another user - Return 401 if token missing/invalid - Return 422 for validation errors --- ## Frontend Integration ### API Client (Next.js) ```typescript // Get token from Better Auth session const token = session?.session?.token; // Example: Get all todos const response = await fetch("http://localhost:8000/todos/", { headers: { "Authorization": `Bearer ${token}`, }, }); // Example: Add todo await fetch("http://localhost:8000/todos/", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, }, body: JSON.stringify({ title: "New task", description: "Description", priority: "high", due_date: "2025-12-10", }), }); // Example: Toggle complete await fetch(`http://localhost:8000/todos/${id}/complete`, { method: "PATCH", headers: { "Authorization": `Bearer ${token}`, }, }); ``` ### CORS Setup (Backend) ```python # In main.py app.add_middleware( CORSMiddleware, allow_origins=["http://localhost:3000"], # Next.js allow_credentials=True, allow_methods=["*"], allow_headers=["*"], ) ``` --- ## Run Commands ```bash # Start backend cd backend uv run uvicorn app.main:app --reload --port 8000 # Start frontend cd frontend npm run dev ``` --- ## Success Checklist - [ ] FastAPI installed with UV - [ ] SQLAlchemy models created - [ ] JWT authentication working - [ ] 5 endpoints implemented - [ ] CORS configured for Next.js - [ ] Token verification from Better Auth - [ ] User-specific data isolation - [ ] Database connected to Neon - [ ] Frontend can call all APIs - [ ] Error handling (401, 404, 422) --- **Time Estimate**: 3-4 hours **Priority**: JWT auth + user data isolation **Database**: Neon PostgreSQL (from .env)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Authenticated User Manages Their Todos (Priority: P1)

As an authenticated user, I want to view, add, update, and delete my personal todo items so that I can effectively manage my tasks.

**Why this priority**: This is the core functionality of a todo application and requires authentication for user-specific data management, making it fundamental.

**Independent Test**: Can be fully tested by creating a user, logging in, performing all CRUD operations on todo items, and observing the changes.

**Acceptance Scenarios**:

1.  **Given** I am an authenticated user, **When** I request my todos, **Then** I receive a list of only my todos.
2.  **Given** I am an authenticated user, **When** I add a new todo with a title, description, priority, and due date, **Then** the todo is created and associated with my user ID.
3.  **Given** I am an authenticated user with an existing todo, **When** I update its title, description, priority, or due date, **Then** the todo's details are updated.
4.  **Given** I am an authenticated user with an existing todo, **When** I delete the todo, **Then** the todo is removed from my list.
5.  **Given** I am an authenticated user with an existing todo, **When** I try to modify or delete a todo that belongs to another user, **Then** I receive an unauthorized access error (404 Not Found or 401 Unauthorized).

---

### User Story 2 - User Marks Todo as Complete/Incomplete (Priority: P1)

As an authenticated user, I want to mark my todo items as complete or incomplete so that I can track my progress.

**Why this priority**: This is a critical interaction for task management and directly affects user perception of the application's utility.

**Independent Test**: Can be fully tested by creating a user, logging in, adding a todo, marking it complete, and then marking it incomplete.

**Acceptance Scenarios**:

1.  **Given** I am an authenticated user with an existing todo that is pending, **When** I mark the todo as complete, **Then** the todo's status changes to 'completed' and `completed_at` is set.
2.  **Given** I am an authenticated user with an existing todo that is completed, **When** I mark the todo as incomplete, **Then** the todo's status changes to 'pending' and `completed_at` is nulled.

---

### User Story 3 - API Client Handles Authentication (Priority: P1)

As an API client (e.g., Next.js frontend), I want to securely authenticate with the backend using JWT tokens so that I can access user-specific todo data.

**Why this priority**: Essential for the frontend to interact with the protected backend API and ensure a secure user experience.

**Independent Test**: Can be tested by attempting to access protected endpoints with valid and invalid tokens, and observing appropriate responses (e.g., 200 OK, 401 Unauthorized).

**Acceptance Scenarios**:

1.  **Given** I have a valid JWT token, **When** I include it in the `Authorization` header for a protected endpoint, **Then** my request is successfully processed and authorized.
2.  **Given** I have an invalid or missing JWT token, **When** I try to access a protected endpoint, **Then** I receive a 401 Unauthorized error.
3.  **Given** I have an expired JWT token, **When** I try to access a protected endpoint, **Then** I receive a 401 Unauthorized error.

---

### Edge Cases

-   **Authentication Failure**: What happens when a user provides an invalid or expired JWT token? System MUST return a 401 Unauthorized response.
-   **Resource Not Found/Unauthorized Access**: How does the system handle requests for a todo item that does not exist or belongs to another user? System MUST return a 404 Not Found error if the todo doesn't exist or isn't owned by the authenticated user.
-   **Validation Errors**: What happens when a user tries to create or update a todo with invalid data (e.g., empty title, invalid date format)? System MUST return a 422 Unprocessable Entity response with details on the validation errors.
-   **CORS Issues**: How does the system ensure the frontend application can communicate with the backend? Backend MUST be configured with appropriate CORS headers to allow requests from the frontend's origin.

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: The system MUST provide an API endpoint to retrieve all todo items belonging to the authenticated user.
-   **FR-002**: The system MUST provide an API endpoint to create a new todo item for the authenticated user, accepting title, description, priority, and due date.
-   **FR-003**: The system MUST provide an API endpoint to update an existing todo item by its ID, allowing modification of title, description, priority, due date, and status.
-   **FR-004**: The system MUST provide an API endpoint to delete a todo item by its ID, ensuring only the owner can delete it.
-   **FR-005**: The system MUST provide an API endpoint to toggle the completion status of a specific todo item by its ID.
-   **FR-006**: All API endpoints related to todo management MUST require JWT authentication.
-   **FR-007**: The system MUST extract the `user_id` from the JWT token and associate it with newly created todo items.
-   **FR-008**: The system MUST ensure that a user can only access, modify, or delete todo items that are associated with their `user_id`.
-   **FR-009**: The system MUST return a 401 Unauthorized response if a request to a protected endpoint lacks a valid JWT token.
-   **FR-010**: The system MUST return a 404 Not Found response if a user attempts to access a todo item that does not exist or does not belong to them.
-   **FR-011**: The system MUST return a 422 Unprocessable Entity response for requests with invalid data (e.g., missing required fields, incorrect data types).
-   **FR-012**: The system MUST implement Cross-Origin Resource Sharing (CORS) to allow specified frontend origins (e.g., `http://localhost:3000`) to access its API.

### Key Entities *(include if feature involves data)*

-   **Todo**: Represents a single task item.
    -   `id`: A unique identifier for the todo (UUID).
    -   `user_id`: Identifier of the user who owns the todo.
    -   `title`: A brief title for the todo.
    -   `description`: A detailed description of the todo.
    -   `status`: The current state of the todo (e.g., "pending", "completed").
    -   `priority`: The importance level of the todo (e.g., "low", "medium", "high").
    -   `due_date`: The date by which the todo should be completed (ISO date string).
    -   `created_at`: Timestamp when the todo was created.
    -   `updated_at`: Timestamp when the todo was last updated.
    -   `completed_at`: Timestamp when the todo was marked as completed (nullable).

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: Authenticated users can successfully perform all CRUD operations (create, read, update, delete) on their todo items.
-   **SC-002**: Frontend applications can successfully make authenticated requests to all protected todo API endpoints.
-   **SC-003**: Unauthorized attempts to access, modify, or delete another user's todo items consistently result in a 404 Not Found or 401 Unauthorized response.
-   **SC-004**: The backend API correctly handles and responds with 422 Unprocessable Entity for all invalid data submissions to todo endpoints.
-   **SC-005**: The FastAPI backend API is accessible from the Next.js frontend running locally (`http://localhost:3000`) without CORS issues.