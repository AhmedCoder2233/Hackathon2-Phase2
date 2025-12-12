# Tasks: Connect Dashboard to Backend Todo Service

**Input**: Design documents from `/specs/001-todo-dashboard-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification did not explicitly request test tasks, so they are not included in this list.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume frontend context.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initial environment setup, configuration, and creating the new API client file.

- [X] T001 [P] Create API client file `frontend/lib/api.ts`
- [X] T002 [P] Add `NEXT_PUBLIC_API_URL` to `frontend/.env.local`
- [X] T003 Update API client to use `NEXT_PUBLIC_API_URL` in `frontend/lib/api.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented. Removing mock data and setting up basic API fetching.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Remove mock `INITIAL_TODOS` data from `frontend/app/dashboard/page.tsx`
- [X] T005 Define `Todo` interface in `frontend/lib/api.ts` based on `data-model.md`

---

## Phase 3: User Story 1 - View Todos (Priority: P1) 🎯 MVP

**Goal**: Users can see their list of to-do items when they access the dashboard. This includes handling unauthorized access.

**Independent Test**: Log in, navigate to the dashboard, and verify that todo items are loaded from the backend and displayed correctly. If not logged in, verify redirection to the login page.

### Implementation for User Story 1

- [X] T006 [P] [US1] Implement `getTodos` function in `frontend/lib/api.ts` to fetch todos from the backend, including JWT authentication.
- [X] T007 [US1] Integrate `useSession` and `useRouter` hooks in `frontend/app/dashboard/page.tsx`
- [X] T008 [US1] Implement redirection logic for unauthorized users in `frontend/app/dashboard/page.tsx`
- [X] T009 [US1] Implement `useEffect` to load todos using `getTodos` when the session token is available in `frontend/app/dashboard/page.tsx`
- [X] T010 [US1] Add state for `todos`, `loading`, and `error` in `frontend/app/dashboard/page.tsx`
- [X] T011 [US1] Display loading state and error messages in `frontend/app/dashboard/page.tsx`
- [X] T012 [US1] Render the fetched todos in the dashboard UI (`frontend/app/dashboard/page.tsx`).

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 5 - Toggle Todo Completion Status (Priority: P1)

**Goal**: Users can mark to-do items as complete or incomplete.

**Independent Test**: Log in, toggle the completion status of a todo item, and verify the change is reflected in the UI and persists after a refresh.

### Implementation for User Story 5

- [X] T013 [P] [US5] Implement `toggleTodoComplete` function in `frontend/lib/api.ts` to send PATCH request to backend.
- [X] T014 [US5] Add `handleToggleComplete` function in `frontend/app/dashboard/page.tsx` to call `toggleTodoComplete` and refresh the todo list.
- [X] T015 [US5] Connect `handleToggleComplete` to the UI element for toggling completion in `frontend/app/dashboard/page.tsx`.

**Checkpoint**: At this point, User Stories 1 AND 5 should both work independently

---

## Phase 5: User Story 2 - Create New Todo (Priority: P1)

**Goal**: Users can add new to-do items to their list.

**Independent Test**: Log in, create a new todo item, and verify it appears in the UI and persists after a refresh. Test with valid and invalid data.

### Implementation for User Story 2

- [X] T016 [P] [US2] Implement `createTodo` function in `frontend/lib/api.ts` to send POST request to backend.
- [X] T017 [US2] Add `handleCreateTodo` function in `frontend/app/dashboard/page.tsx` to call `createTodo` and refresh the todo list.
- [X] T018 [US2] Integrate `handleCreateTodo` with the UI form/modal for creating new todos in `frontend/app/dashboard/page.tsx`.

**Checkpoint**: At this point, User Stories 1, 5 AND 2 should all work independently

---

## Phase 6: User Story 3 - Update Existing Todo (Priority: P2)

**Goal**: Users can modify the details of their existing to-do items.

**Independent Test**: Log in, edit an existing todo item, and verify the changes are reflected in the UI and persist after a refresh. Test with valid and invalid data.

### Implementation for User Story 3

- [X] T019 [P] [US3] Implement `updateTodo` function in `frontend/lib/api.ts` to send PUT request to backend.
- [X] T020 [US3] Add `handleUpdateTodo` function in `frontend/app/dashboard/page.tsx` to call `updateTodo` and refresh the todo list.
- [X] T021 [US3] Integrate `handleUpdateTodo` with the UI for editing todos in `frontend/app/dashboard/page.tsx`.

**Checkpoint**: At this point, User Stories 1, 5, 2 AND 3 should all work independently

---

<h2>Phase 7: User Story 4 - Delete Todo (Priority: P2)</h2>

**Goal**: Users can remove to-do items they no longer need.

**Independent Test**: Log in, delete an existing todo item, and verify it is removed from the UI and persists after a refresh.

<h3>Implementation for User Story 4</h3>

- [X] T022 [P] [US4] Implement `deleteTodo` function in `frontend/lib/api.ts` to send DELETE request to backend.
- [X] T023 [US4] Add `handleDeleteTodo` function in `frontend/app/dashboard/page.tsx` to call `deleteTodo` and refresh the todo list.
- [X] T024 [US4] Integrate `handleDeleteTodo` with the UI element for deleting todos in `frontend/app/dashboard/page.tsx`.

**Checkpoint**: All user stories should now be independently functional

---

<h2>Phase 8: Polish & Cross-Cutting Concerns</h2>

**Purpose**: Improvements that affect multiple user stories, focusing on comprehensive error handling and environment configuration.

- [X] T025 Implement centralized error handling for 401 Unauthorized responses (redirect to login) in `frontend/lib/api.ts` or `frontend/app/dashboard/page.tsx` (if not already handled).
- [X] T026 Implement error handling for 404 Not Found responses for specific todos in `frontend/lib/api.ts` or `frontend/app/dashboard/page.tsx`.
- [X] T027 Implement error handling for 422 Validation Error responses in `frontend/lib/api.ts` or `frontend/app/dashboard/page.tsx`.
- [X] T028 Implement generic network error handling (`fetch` errors) in `frontend/lib/api.ts` or `frontend/app/dashboard/page.tsx`.
- [X] T029 Ensure consistent display of loading indicators across all API calls in `frontend/app/dashboard/page.tsx`.
- [X] T030 Validate proper use of `NEXT_PUBLIC_API_URL` in `frontend/lib/api.ts` (already covered by T003).

---

<h2>Dependencies & Execution Order</h2>

<h3>Phase Dependencies</h3>

-   **Setup (Phase 1)**: No dependencies - can start immediately
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
-   **User Stories (Phase 3-7)**: All depend on Foundational phase completion
    -   User stories can then proceed in parallel (if staffed)
    -   Or sequentially in priority order (P1 → P2 → P3)
-   **Polish (Final Phase)**: Depends on all desired user stories being complete

<h3>User Story Dependencies</h3>

-   **User Story 1 (P1 - View Todos)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
-   **User Story 5 (P1 - Toggle Completion)**: Can start after Foundational (Phase 2) - Depends on US1 for displaying todos.
-   **User Story 2 (P1 - Create Todo)**: Can start after Foundational (Phase 2) - Depends on US1 for displaying todos.
-   **User Story 3 (P2 - Update Todo)**: Can start after Foundational (Phase 2) - Depends on US1 for displaying todos.
-   **User Story 4 (P2 - Delete Todo)**: Can start after Foundational (Phase 2) - Depends on US1 for displaying todos.

<h3>Within Each User Story</h3>

-   Models/Interfaces before API functions.
-   API functions before integration into UI components.
-   Core implementation before specific error handling.

<h3>Parallel Opportunities</h3>

-   All Setup tasks marked [P] can run in parallel.
-   Tasks T006, T013, T016, T019, T022 (API client functions) are largely independent and can be developed in parallel after T005.
-   Different user stories can be worked on in parallel by different team members once the Foundational phase is complete. For example, after Phase 2, one developer can work on US1, another on US5, and so on.

---

<h2>Parallel Example: API Client Functions</h2>

```bash
# Implement API client functions in parallel:
- [ ] T006 [P] [US1] Implement `getTodos` function in `frontend/lib/api.ts`
- [ ] T013 [P] [US5] Implement `toggleTodoComplete` function in `frontend/lib/api.ts`
- [ ] T016 [P] [US2] Implement `createTodo` function in `frontend/lib/api.ts`
- [ ] T019 [P] [US3] Implement `updateTodo` function in `frontend/lib/api.ts`
- [ ] T022 [P] [US4] Implement `deleteTodo` function in `frontend/lib/api.ts`
```

---

<h2>Implementation Strategy</h2>

<h3>MVP First (User Story 1 Only)</h3>

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1
4.  **STOP and VALIDATE**: Test User Story 1 independently
5.  Deploy/demo if ready

<h3>Incremental Delivery</h3>

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3.  Add User Story 5 → Test independently → Deploy/Demo
4.  Add User Story 2 → Test independently → Deploy/Demo
5.  Add User Story 3 → Test independently → Deploy/Demo
6.  Add User Story 4 → Test independently → Deploy/Demo
7.  Complete Phase 8: Polish & Cross-Cutting Concerns
8.  Each story adds value without breaking previous stories

<h3>Parallel Team Strategy</h3>

With multiple developers:

1.  Team completes Setup + Foundational together
2.  Once Foundational is done:
    -   Developer A: User Story 1 (View Todos)
    -   Developer B: User Story 5 (Toggle Completion)
    -   Developer C: User Story 2 (Create New Todo)
    -   Developer D: User Story 3 (Update Existing Todo)
    -   Developer E: User Story 4 (Delete Todo)
3.  Stories complete and integrate independently. Phase 8 (Polish) can be done by one or more developers collaboratively.

---

<h2>Notes</h2>

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Verify changes after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
