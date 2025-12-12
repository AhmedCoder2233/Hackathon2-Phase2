# Tasks: Todo Dashboard

**Input**: Design documents from `/specs/001-todo-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification does not explicitly request test tasks, so they will not be included in this task list.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/` (assuming Next.js `app` directory structure)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure. This assumes `frontend/` directory is already set up as a Next.js project.

- [x] T001 Ensure `.env.local` is correctly configured in `frontend/.env.local`
- [x] T002 Verify Next.js project setup in `frontend/` (package.json, next.config.ts, tsconfig.json)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Define `Todo` interface in `frontend/types/todo.d.ts`
- [x] T004 Create initial mock data `INITIAL_TODOS` in `frontend/lib/todo-data.ts`
- [x] T005 Implement client-side CRUD operations (`useState`, `addTodo`, `updateTodo`, `deleteTodo`, `toggleComplete`) in `frontend/lib/todo-client.ts`
- [x] T006 Implement protected route logic for `/dashboard` in `frontend/app/dashboard/page.tsx`
- [x] T007 Set up basic dashboard JSX structure in `frontend/app/dashboard/page.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Tasks (Priority: P1) 🎯 MVP

**Goal**: Users can log in to the dashboard and view a list of their tasks.

**Independent Test**: A user can log in, navigate to the dashboard, and see two pre-defined tasks.

### Implementation for User Story 1

- [x] T008 [P] [US1] Create `Header` component for user name and logout button in `frontend/components/Header.tsx`
- [x] T009 [P] [US1] Create `StatsCards` component for total, pending, completed counts in `frontend/components/StatsCards`.tsx`
- [x] T010 [P] [US1] Create `TodoItem` component for displaying single todo details in `frontend/components/TodoItem.tsx`
# After the above components are created, these can be integrated:
- [x] T011 [US1] Create `TodoList` component to render a list of `TodoItem`s in `frontend/components/TodoList.tsx`
- [x] T012 [US1] Integrate `Header`, `StatsCards`, and `TodoList` into `frontend/app/dashboard/page.tsx`
- [x] T013 [US1] Pass `INITIAL_TODOS` to `TodoList` for display in `frontend/app/dashboard/page.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Add Task (Priority: P1)

**Goal**: Users can add new tasks to their todo list via a modal form.

**Independent Test**: A user can click "Add Task", fill the form, save, and see the new task in the list.

### Implementation for User Story 2

- [x] T014 [P] [US2] Create `AddTaskButton` component in `frontend/components/AddTaskButton.tsx`
- [x] T015 [P] [US2] Create `TodoFormModal` component for adding/editing tasks in `frontend/components/TodoFormModal.tsx`
- [x] T016 [US2] Implement form state and input handling in `frontend/components/TodoFormModal.tsx`
- [x] T017 [US2] Integrate `AddTaskButton` and `TodoFormModal` into `frontend/app/dashboard/page.tsx`
- [x] T018 [US2] Connect `TodoFormModal` to `addTodo` function from `frontend/lib/todo-client.ts` in `frontend/app/dashboard/page.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Complete/Uncomplete Task (Priority: P2)

**Goal**: Users can mark tasks as complete or incomplete using a checkbox.

**Independent Test**: A user can click a checkbox next to a task, and its status changes visually (strikethrough) and functionally.

### Implementation for User Story 3

- [x] T019 [US3] Add checkbox to `TodoItem` component in `frontend/components/TodoItem.tsx`
- [x] T020 [US3] Integrate checkbox with `toggleComplete` function from `frontend/lib/todo-client.ts` in `frontend/components/TodoItem.tsx`
- [x] T021 [US3] Apply strikethrough styling for completed tasks in `frontend/components/TodoItem.tsx`

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Edit Task (Priority: P2)

**Goal**: Users can modify existing tasks using an edit modal.

**Independent Test**: A user can click "Edit" on a task, modify its details, save, and see the updated task.

### Implementation for User Story 4

- [x] T022 [US4] Add "Edit" button to `TodoItem` component in `frontend/components/TodoItem.tsx`
- [x] T023 [US4] Implement logic to open `TodoFormModal` pre-filled with task details when "Edit" is clicked in `frontend/components/TodoItem.tsx`
- [x] T024 [US4] Connect `TodoFormModal` to `updateTodo` function from `frontend/lib/todo-client.ts` in `frontend/app/dashboard/page.tsx`

**Checkpoint**: At this point, User Stories 1, 2, 3, AND 4 should all work independently

---

## Phase 7: User Story 5 - Delete Task (Priority: P2)

**Goal**: Users can remove tasks from their todo list.

**Independent Test**: A user can click "Delete" on a task, confirm, and the task is removed from the list.

### Implementation for User Story 5

- [x] T025 [US5] Add "Delete" button to `TodoItem` component in `frontend/components/TodoItem.tsx`
- [x] T026 [US5] Implement confirmation dialog before deleting a task in `frontend/components/TodoItem.tsx`
- [x] T027 [US5] Connect "Delete" button to `deleteTodo` function from `frontend/lib/todo-client.ts` in `frontend/components/TodoItem.tsx`

**Checkpoint**: At this point, User Stories 1, 2, 3, 4, AND 5 should all work independently

---

## Phase 8: User Story 6 - Filter Tasks (Priority: P3)

**Goal**: Users can filter tasks by their status (All, Pending, Completed).

**Independent Test**: A user can select a filter option, and only tasks matching that status are displayed.

### Implementation for User Story 6

- [x] T028 [P] [US6] Create `FilterOptions` component for status filtering in `frontend/components/FilterOptions.tsx`
- [x] T029 [US6] Implement filtering logic in `frontend/app/dashboard/page.tsx`
- [x] T030 [US6] Integrate `FilterOptions` with `frontend/app/dashboard/page.tsx` to apply filters.

**Checkpoint**: At this point, User Stories 1, 2, 3, 4, 5, AND 6 should all work independently

---

## Phase 9: User Story 7 - Search Tasks (Priority: P3)

**Goal**: Users can search for tasks by typing keywords in a search bar.

**Independent Test**: A user can type into the search bar, and the list updates to show only matching tasks.

### Implementation for User Story 7

- [x] T031 [P] [US7] Create `SearchBar` component for title search in `frontend/components/SearchBar.tsx`
- [x] T032 [US7] Implement search logic in `frontend/app/dashboard/page.tsx`
- [x] T033 [US7] Integrate `SearchBar` with `frontend/app/dashboard/page.tsx` to apply search queries.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T034 [P] Implement responsive design for all UI components using Tailwind CSS utility classes in `frontend/globals.css` and individual component files.
- [x] T035 [P] Add animations for card hover in `frontend/components/TodoItem.tsx`
- [x] T036 [P] Add animations for checkbox click effect in `frontend/components/TodoItem.tsx`
- [x] T037 [P] Add animations for modal fade in/out in `frontend/components/TodoFormModal.tsx`
- [x] T038 Implement accessibility: tab navigation, Enter to submit forms, Escape to close modal across `frontend/app/dashboard/page.tsx` and modal components.
- [x] T039 Implement client-side validation for empty title and invalid due date in `frontend/components/TodoFormModal.tsx`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 10)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 6 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 7 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tasks within a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members, especially those with same priority.

---

## Parallel Example: User Story 1

```bash
# All tasks below can be initiated in parallel:
- [ ] T008 [P] [US1] Create `Header` component for user name and logout button in `frontend/components/Header.tsx`
- [ ] T009 [P] [US1] Create `StatsCards` component for total, pending, completed counts in `frontend/components/StatsCards.tsx`
- [ ] T010 [P] [US1] Create `TodoItem` component for displaying single todo details in `frontend/components/TodoItem.tsx`

# After the above components are created, these can be integrated:
- [ ] T011 [US1] Create `TodoList` component to render a list of `TodoItem`s in `frontend/components/TodoList.tsx`
- [ ] T012 [US1] Integrate `Header`, `StatsCards`, and `TodoList` into `frontend/app/dashboard/page.tsx`
- [ ] T013 [US1] Pass `INITIAL_TODOS` to `TodoList` for display in `frontend/app/dashboard/page.tsx`
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2
5. **STOP and VALIDATE**: Test User Stories 1 and 2 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. ... and so on for all user stories.
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 & 2
   - Developer B: User Story 3, 4, 5
   - Developer C: User Story 6, 7
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
