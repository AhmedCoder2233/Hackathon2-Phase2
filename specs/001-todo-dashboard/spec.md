# Feature Specification: Todo Dashboard

**Feature Branch**: `001-todo-dashboard`  
**Created**: December 7, 2025  
**Status**: Draft

---

## File Structure

```
app/
├── api/auth/[...all]/route.ts
├── lib/
│   ├── auth.ts
│   └── auth-client.ts
├── page.tsx              # Login/Signup page (already done)
└── dashboard/page.tsx    # Todo Dashboard (to create)
```

---

## 1. Auth Files (Already Setup)

### `app/api/auth/[...all]/route.ts`
```typescript
import { auth } from "../../../lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

### `app/lib/auth.ts`
```typescript
import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database connected:", res.rows[0]);
  }
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  logger: {
    level: "debug",
  },
});
```

### `app/lib/auth-client.ts`
```typescript
"use client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

### `.env.local`
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key-minimum-32-characters-long
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@host/database
```

---

## 2. Todo Dashboard (`app/dashboard/page.tsx`)

### Requirements

#### Must Build:
1. **Header** - User name, logout button
2. **Stats Cards** - Total, Pending, Completed counts
3. **Add Todo Button** - Open modal to create new task
4. **Todo List** - Show all tasks with:
   - Checkbox (mark complete/incomplete)
   - Title and description
   - Priority badge (Low/Medium/High)
   - Due date
   - Edit and Delete buttons
5. **Create/Edit Modal** - Form to add or edit todo
6. **Filter & Search** - Filter by status, search by title

#### Features:
- ✅ Login redirect (if not logged in → go to `/`)
- ✅ Logout (click button → go to `/`)
- ✅ **Add Task** - Title, description, priority, due date
- ✅ **View Tasks** - See all todos in list
- ✅ **Update Task** - Click edit → modify → save
- ✅ **Delete Task** - Click delete → remove from list
- ✅ **Complete Task** - Click checkbox → mark done (strikethrough)
- ✅ **Uncomplete Task** - Click checkbox again → mark pending
- ✅ Filter: All | Pending | Completed
- ✅ Search: Type to filter by title

### Mock Data (Static Todos)
```typescript
const INITIAL_TODOS = [
  {
    id: "1",
    title: "Complete project documentation",
    description: "Write comprehensive docs for API",
    status: "pending",
    priority: "high",
    dueDate: "2025-12-10",
    createdAt: "2025-12-07T10:00:00Z",
  },
  {
    id: "2",
    title: "Review pull requests",
    description: "Check team PRs",
    status: "completed",
    priority: "medium",
    dueDate: "2025-12-08",
    createdAt: "2025-12-06T14:30:00Z",
  },
];
```

### Todo Type
```typescript
interface Todo {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
}
```

### CRUD Operations (Client-side)
```typescript
// State
const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

// Add
const addTodo = (todo: Omit<Todo, "id" | "createdAt">) => {
  setTodos([
    { ...todo, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    ...todos
  ]);
};

// Update
const updateTodo = (id: string, updates: Partial<Todo>) => {
  setTodos(todos.map(t => t.id === id ? { ...t, ...updates } : t));
};

// Delete
const deleteTodo = (id: string) => {
  setTodos(todos.filter(t => t.id !== id));
};

// Toggle Complete
const toggleComplete = (id: string) => {
  setTodos(todos.map(t => 
    t.id === id 
      ? { ...t, status: t.status === "pending" ? "completed" : "pending" } 
      : t
  ));
};
```

### UI Design

#### Colors
```typescript
const colors = {
  primary: "#3b82f6",    // Blue
  success: "#10b981",    // Green  
  warning: "#f59e0b",    // Orange
  danger: "#ef4444",     // Red
  gray: {
    100: "#f3f4f6",
    200: "#e5e7eb",
    500: "#6b7280",
    900: "#111827",
  },
};
```

#### Priority Colors
```typescript
low: "#10b981"      // Green
medium: "#f59e0b"   // Orange
high: "#ef4444"     // Red
```

#### Layout Structure
```
┌─────────────────────────────────────────────┐
│  📝 My Todos          Welcome, [Name]! [🚪] │
├─────────────────────────────────────────────┤
│  [📊 Total: 5]  [⏳ Pending: 3]  [✅ Done: 2] │
├─────────────────────────────────────────────┤
│  [+ Add Task]  [Filter ▼]  [🔍 Search...]   │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐   │
│  │ [✓] Complete project docs           │   │
│  │     📅 Dec 10 | 🔴 High Priority    │   │
│  │     Description preview...          │   │
│  │     [✏️ Edit] [🗑️ Delete]           │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │ [✓] Review pull requests            │   │
│  │     📅 Dec 08 | 🟡 Medium Priority  │   │
│  │     [✏️ Edit] [🗑️ Delete]           │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

#### Modal (Add/Edit Task)
```
┌─────────────────────────────────────┐
│  ✨ Add New Task              [✕]  │
├─────────────────────────────────────┤
│  Title *                            │
│  [_____________________________]    │
│                                     │
│  Description                        │
│  [_____________________________]    │
│                                     │
│  Priority *        Due Date *       │
│  [Medium ▼]       [📅 Dec 10]      │
│                                     │
│          [Cancel]  [Save Task]      │
└─────────────────────────────────────┘
```

---

## 3. User Flow

### Login → Dashboard
1. User logs in at `/page.tsx`
2. After successful login → redirect to `/dashboard`
3. Dashboard checks session:
   - If no session → redirect to `/`
   - If session exists → show dashboard

### Dashboard Actions
1. **View Tasks** - See list of todos
2. **Add Task** - Click "+ Add Task" → modal opens → fill form → save
3. **Edit Task** - Click "✏️ Edit" → modal opens with data → modify → save
4. **Delete Task** - Click "🗑️ Delete" → confirm → remove
5. **Complete Task** - Click checkbox → strikethrough + status change
6. **Filter** - Select "Pending" → only show pending tasks
7. **Search** - Type "project" → filter by title

### Protected Route Logic
```typescript
"use client";
import { useSession } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  if (isPending) return <div>Loading...</div>;
  if (!session?.user) return null;

  return (
    <div>
      {/* Dashboard UI here */}
    </div>
  );
}
```

---

## User Scenarios & Testing

### User Story 1 - View Tasks (Priority: P1)

Users can log in to the dashboard and view a list of their tasks.

**Why this priority**: This is the core functionality, allowing users to see their work.

**Independent Test**: A user can log in, navigate to the dashboard, and see two pre-defined tasks.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the dashboard, **When** the page loads, **Then** a list of tasks including "Complete project documentation" and "Review pull requests" is displayed.

---

### User Story 2 - Add Task (Priority: P1)

Users can add new tasks to their todo list via a modal form.

**Why this priority**: Essential for task management.

**Independent Test**: A user can click "Add Task", fill the form, save, and see the new task in the list.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the dashboard, **When** the user clicks "+ Add Task", **Then** a modal form appears with fields for Title, Description, Priority, and Due Date.
2. **Given** the Add Task modal is open and the user fills in valid details, **When** the user clicks "Save Task", **Then** the modal closes and the new task appears at the top of the todo list.

---

### User Story 3 - Complete/Uncomplete Task (Priority: P2)

Users can mark tasks as complete or incomplete using a checkbox.

**Why this priority**: Important for tracking progress and managing tasks.

**Independent Test**: A user can click a checkbox next to a task, and its status changes visually (strikethrough) and functionally.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the dashboard with a pending task, **When** the user clicks the checkbox next to the task, **Then** the task's title is strikethrough and its status changes to "completed".
2. **Given** a logged-in user on the dashboard with a completed task, **When** the user clicks the checkbox next to the task, **Then** the task's title is no longer strikethrough and its status changes to "pending".

---

### User Story 4 - Edit Task (Priority: P2)

Users can modify existing tasks using an edit modal.

**Why this priority**: Allows users to update task details as needed.

**Independent Test**: A user can click "Edit" on a task, modify its details, save, and see the updated task.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the dashboard, **When** the user clicks "✏️ Edit" next to a task, **Then** a modal form appears pre-filled with the task's current details.
2. **Given** the Edit Task modal is open and the user modifies details and clicks "Save Task", **Then** the modal closes and the task in the list reflects the updated information.

---

### User Story 5 - Delete Task (Priority: P2)

Users can remove tasks from their todo list.

**Why this priority**: Essential for managing tasks and removing unwanted entries.

**Independent Test**: A user can click "Delete" on a task, confirm, and the task is removed from the list.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the dashboard, **When** the user clicks "🗑️ Delete" next to a task, **Then** a confirmation prompt appears.
2. **Given** the confirmation prompt is shown and the user confirms deletion, **When** the user confirms, **Then** the task is removed from the todo list.

---

### User Story 6 - Filter Tasks (Priority: P3)

Users can filter tasks by their status (All, Pending, Completed).

**Why this priority**: Helps users manage and focus on specific task sets.

**Independent Test**: A user can select a filter option, and only tasks matching that status are displayed.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the dashboard with a mix of pending and completed tasks, **When** the user selects "Pending" from the filter options, **Then** only pending tasks are displayed.

---

### User Story 7 - Search Tasks (Priority: P3)

Users can search for tasks by typing keywords in a search bar.

**Why this priority**: Helps users quickly find specific tasks in a long list.

**Independent Test**: A user can type into the search bar, and the list updates to show only matching tasks.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the dashboard with multiple tasks, **When** the user types "project" into the search bar, **Then** only tasks with "project" in their title (e.g., "Complete project documentation") are displayed.

---

### Edge Cases

- What happens when a user tries to add a task with an empty title? (Validation error: System should prevent task creation and display an error message.)
- How does the system handle an invalid due date format? (Validation error: System should prevent task creation/update and display an error message.)
- What if there are no tasks? (Display a message indicating an empty list, e.g., "No tasks yet! Click '+ Add Task' to get started.")
- What happens if the user is not logged in and tries to access `/dashboard`? (Redirect to `/` (login) page.)

---

## Requirements

### Functional Requirements

- **FR-001**: The system MUST display a header with the logged-in user's name and a logout button on the dashboard.
- **FR-002**: The system MUST display "Stats Cards" showing the total, pending, and completed task counts.
- **FR-003**: The system MUST provide an "Add Todo Button" that, when clicked, opens a modal for creating a new task.
- **FR-004**: The system MUST display a "Todo List" showing all tasks with a checkbox, title, description, priority badge, due date, and "Edit" and "Delete" buttons.
- **FR-005**: The system MUST provide a modal form for adding or editing tasks, including fields for title, description, priority, and due date.
- **FR-006**: The system MUST allow users to filter tasks by status (All, Pending, Completed).
- **FR-007**: The system MUST allow users to search for tasks by title.
- **FR-008**: The system MUST redirect unauthenticated users attempting to access `/dashboard` to the `/` (login) page.
- **FR-009**: The system MUST allow users to log out from the dashboard, redirecting them to the `/` page.
- **FR-010**: The system MUST allow users to add new tasks with a title, description, priority, and due date.
- **FR-011**: The system MUST allow users to view all their tasks in a list.
- **FR-012**: The system MUST allow users to update an existing task's details.
- **FR-013**: The system MUST allow users to delete tasks from the list.
- **FR-014**: The system MUST allow users to mark tasks as complete or incomplete via a checkbox, with a visual indicator (strikethrough) for completed tasks.
- **FR-015**: The system MUST display task priority using color-coded badges (Low: green, Medium: orange, High: red).
- **FR-016**: The system MUST provide a responsive UI that adapts to mobile and desktop screen sizes (stack cards vertically on mobile, row on desktop).
- **FR-017**: The system MUST include animations for card hover (lift with shadow), checkbox click (scale effect), and modal (fade in/out).
- **FR-018**: The system MUST ensure accessibility, including tab navigation, Enter key submission for forms, and Escape key for modal closure.

### Key Entities

- **Todo**: Represents a single task with attributes such as `id` (string), `title` (string), `description` (string), `status` (`"pending"` or `"completed"`), `priority` (`"low"`, `"medium"`, or `"high"`), `dueDate` (string, e.g., "YYYY-MM-DD"), and `createdAt` (string, ISO 8601 format).

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can successfully view, add, update, delete, complete, uncomplete, filter, and search for tasks without encountering errors, achieving a task completion rate of 95% for all core interactions.
- **SC-002**: The dashboard UI is visually appealing and responsive across various screen sizes (mobile and desktop), with layout integrity maintained on devices from 320px to 1920px width.
- **SC-003**: User interactions, such as adding or editing tasks, feel smooth and intuitive with appropriate animations, with modal transitions completing within 300ms.
- **SC-004**: All dashboard functionalities are accessible via keyboard navigation, allowing users to complete all primary workflows (view, add, edit, delete, complete, filter, search, logout) using only the keyboard.
- **SC-005**: The login redirect and logout functionalities work as specified, ensuring that unauthenticated access to `/dashboard` is prevented and successful logout redirects to `/` within 1 second.
- **SC-006**: The system loads the dashboard and displays initial static tasks within 2 seconds on a standard broadband connection (e.g., 25 Mbps download speed).

---

## Design Guidelines

### Responsive
- Mobile: Stack cards vertically
- Desktop: 3 stats cards in a row

### Animations
- Card hover: Lift with shadow
- Checkbox: Scale effect on click
- Modal: Fade in/out smoothly

### Accessibility
- Tab navigation works
- Enter to submit forms
- Escape to close modal

---

## Important Notes

### What This Does:
- ✅ Beautiful UI for todo management
- ✅ All CRUD operations (client-side only)
- ✅ Static data (resets on refresh)
- ✅ Filters and search

### What This Does NOT Do:
- ❌ Backend API calls
- ❌ Real persistence
- ❌ Multi-user data separation

### Why Static Data?
Backend will be added later. For now, focus on **beautiful UI and smooth user experience**.

---

**Time Estimate**: 4-6 hours  
**Priority**: UI beauty + smooth interactions  
**Next Step**: Add backend API later