# Tasks: Backend API for Todo with JWT Authentication

**Input**: Design documents from `/specs/001-fastapi-todo-auth/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No explicit request for tests. Implementation tasks are prioritized.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

-   **[P]**: Can run in parallel (different files, no dependencies)
-   **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
-   Include exact file paths in descriptions

## Path Conventions

-   Paths shown below assume the `backend/` directory at the repository root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for the backend.

- [x] T001 Create backend project directory `backend/`
- [x] T002 Initialize Python project with UV in `backend/`
- [x] T003 Install dependencies `fastapi[standard]`, `sqlalchemy`, `psycopg2-binary`, `pyjwt`, `python-dotenv` in `backend/`
- [x] T004 Create `.env` file in `backend/` with `DATABASE_URL` and `BETTER_AUTH_SECRET` placeholders
- [x] T005 Create core `app/` directory structure in `backend/app/`
- [x] T006 Create `app/main.py` for FastAPI app instance in `backend/app/main.py`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Setup database connection and session management in `backend/app/database.py`
- [x] T008 Define SQLAlchemy ORM `Todo` model in `backend/app/models.py`
- [x] T009 Define Pydantic schemas for `Todo` requests and responses in `backend/app/schemas.py`
- [x] T010 Implement JWT token creation, decoding, and verification logic in `backend/app/auth.py`
- [x] T011 Configure CORS middleware in `backend/app/main.py`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 3 - API Client Handles Authentication (Priority: P1) 🎯 MVP (Authentication)

**Goal**: Enable secure authentication with the backend using JWT tokens so that client applications can make authenticated requests.

**Independent Test**: An API client can successfully send a request with a valid JWT token to a protected endpoint and receive an authorized response, and requests with invalid/missing tokens receive a 401 Unauthorized response.

### Implementation for User Story 3

- [x] T012 [US3] Implement dependency for current authenticated user (e.g., `get_current_user`) in `backend/app/auth.py`
- [x] T013 [US3] Protect an example endpoint (e.g., a dummy `/protected-test`) with JWT authentication in `backend/app/routes/todos.py`

**Checkpoint**: User Story 3 (Authentication) should be independently functional and testable.

---

## Phase 4: User Story 1 - Authenticated User Manages Their Todos (Priority: P1) 🎯 MVP (CRUD)

**Goal**: Allow authenticated users to view, add, update, and delete their personal todo items.

**Independent Test**: An authenticated user can perform all CRUD operations (create, read, update, delete) on their own todo items, and attempts to access/modify other users' todos result in appropriate error responses (404/401).

### Implementation for User Story 1

- [x] T014 [P] [US1] Create API endpoint `GET /todos/` to retrieve all todo items for authenticated user in `backend/app/routes/todos.py`

- [x] T015 [P] [US1] Create API endpoint `POST /todos/` to add a new todo item for authenticated user in `backend/app/routes/todos.py`

- [x] T016 [P] [US1] Create API endpoint `PUT /todos/{todo_id}` to update an existing todo item by its ID for authenticated user in `backend/app/routes/todos.py`

- [x] T017 [P] [US1] Create API endpoint `DELETE /todos/{todo_id}` to delete a todo item by its ID for authenticated user in `backend/app/routes/todos.py`
- [x] T018 [US1] Implement user ownership check for GET/PUT/DELETE operations on todo items in `backend/app/routes/todos.py` (ensure 404 for non-existent/unowned)

**Checkpoint**: User Story 1 (Core CRUD) should be independently functional and testable.

---

## Phase 5: User Story 2 - User Marks Todo as Complete/Incomplete (Priority: P1) 🎯 MVP (Toggle Complete)

**Goal**: Allow authenticated users to mark their todo items as complete or incomplete.

**Independent Test**: An authenticated user can successfully toggle the completion status of their own todo items via the API, and the `completed_at` timestamp is updated correctly.

### Implementation for User Story 2

- [x] T019 [US2] Create API endpoint `PATCH /todos/{todo_id}/complete` to toggle completion status of a todo item in `backend/app/routes/todos.py`

**Checkpoint**: User Story 2 (Toggle Complete) should be independently functional and testable.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [x] T020 Review and implement comprehensive error handling for 401, 404, 422 responses across all API endpoints in `backend/app/routes/todos.py`
- [x] T021 Ensure all validation rules from data model are rigorously applied in `backend/app/schemas.py` and `backend/app/routes/todos.py`
- [x] T022 Update `backend/app/main.py` to include all routes from `backend/app/routes/todos.py`
- [x] T023 Verify quickstart instructions in `specs/001-fastapi-todo-auth/quickstart.md`
- [x] T024 Final review of `openapi.yaml` for consistency with implementation `specs/001-fastapi-todo-auth/contracts/openapi.yaml`

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
-   **User Stories (Phase 3-5)**: All depend on Foundational phase completion
    -   User Story 3 (Authentication) is a prerequisite for US1 and US2.
    -   User Story 1 (Core CRUD) can proceed after Foundational and US3.
    -   User Story 2 (Toggle Complete) can proceed after Foundational and US3.
-   **Polish (Final Phase)**: Depends on all user stories (Phase 3-5) being complete.

### User Story Dependencies

-   **User Story 3 (P1) - API Client Handles Authentication**: Can start after Foundational (Phase 2).
-   **User Story 1 (P1) - Authenticated User Manages Their Todos**: Depends on Foundational (Phase 2) and User Story 3 (Phase 3).
-   **User Story 2 (P1) - User Marks Todo as Complete/Incomplete**: Depends on Foundational (Phase 2) and User Story 3 (Phase 3).

### Within Each User Story

-   Core implementation before integration.

### Parallel Opportunities

-   Within Phase 4 (User Story 1), tasks T014, T015, T016, and T017 are marked as `[P]` and can be implemented in parallel as they primarily involve defining separate API endpoints.

---

## Parallel Example: User Story 1 (Core CRUD Endpoints)

```bash
# Launch all core CRUD endpoints for User Story 1 together:
- [ ] T014 [P] [US1] Create API endpoint GET /todos/ to retrieve all todo items for authenticated user in `backend/app/routes/todos.py`
- [ ] T015 [P] [US1] Create API endpoint POST /todos/ to add a new todo item for authenticated user in `backend/app/routes/todos.py`
- [ ] T016 [P] [US1] Create API endpoint PUT /todos/{todo_id} to update an existing todo item by its ID for authenticated user in `backend/app/routes/todos.py`
- [ ] T017 [P] [US1] Create API endpoint DELETE /todos/{todo_id} to delete a todo item by its ID for authenticated user in `backend/app/routes/todos.py`
```

---

## Implementation Strategy

### MVP First (User Story 3 + User Story 1 + User Story 2)

All three user stories are P1, meaning they are critical for the initial MVP. They will be delivered sequentially after foundational setup.

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 3 (Authentication)
4.  Complete Phase 4: User Story 1 (Core CRUD)
5.  Complete Phase 5: User Story 2 (Toggle Complete)
6.  **STOP and VALIDATE**: Test all user stories independently and as an integrated system.
7.  Proceed to Final Phase: Polish & Cross-Cutting Concerns

### Incremental Delivery

This plan supports incremental delivery:

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 3 (Authentication) → Test independently → Deploy/Demo authentication capabilities.
3.  Add User Story 1 (Core CRUD) → Test independently → Deploy/Demo core todo management.
4.  Add User Story 2 (Toggle Complete) → Test independently → Deploy/Demo full todo management.
5.  Proceed to Final Phase for polish and overall system health.

---

## Notes

-   `[P]` tasks = different files, no direct code dependencies, can be worked on in parallel.
-   `[Story]` label maps task to specific user story for traceability.
-   Each user story is designed to be independently completable and testable, allowing for focused development and validation.
-   Verify quickstart instructions for setup and running the application.
-   Review `openapi.yaml` to ensure it accurately reflects the implemented API.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate a user story or phase independently.
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence.
