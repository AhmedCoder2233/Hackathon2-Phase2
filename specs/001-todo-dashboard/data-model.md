# Data Model: Todo Dashboard

**Branch**: `001-todo-dashboard` | **Date**: December 7, 2025 | **Spec**: specs/001-todo-dashboard/spec.md
**Input**: Feature specification from `/specs/001-todo-dashboard/spec.md`

## Entities

### Todo

**Description**: Represents a single task that a user manages within the Todo Dashboard. This entity is currently client-side and used for static data display and manipulation.

**Fields**:
- `id`: `string` (Unique identifier for the todo item. Generated client-side using `crypto.randomUUID()`).
- `title`: `string` (The main title or short description of the task. **Validation**: Must not be empty.)
- `description`: `string` (A more detailed explanation of the task. Optional.)
- `status`: `enum("pending", "completed")` (The current state of the task.)
- `priority`: `enum("low", "medium", "high")` (The urgency or importance of the task.)
- `dueDate`: `string` (The target completion date for the task, e.g., "YYYY-MM-DD". **Validation**: Must be a valid date format.)
- `createdAt`: `string` (Timestamp when the todo item was created, ISO 8601 format, e.g., "YYYY-MM-DDTHH:mm:ssZ". Generated client-side using `new Date().toISOString()`).

**Relationships**:
- Currently, no explicit relationships with other entities as data is static and client-side. In a future backend integration, this would relate to a `User` entity.

**Validation Rules (Client-side)**:
- `title`: Required (cannot be an empty string).
- `dueDate`: Must be a valid date string.

**State Transitions**:
- `status`: Can transition from `pending` to `completed` and vice-versa.
