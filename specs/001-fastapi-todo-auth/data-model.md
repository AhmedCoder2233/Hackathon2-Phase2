# Data Model: Backend API for Todo with JWT Authentication

**Feature Branch**: `001-fastapi-todo-auth`
**Date**: 2025-12-12

## Entities

### Todo

**Description**: Represents a single task item owned by a user.

**Fields**:
-   `id`:
    -   **Type**: UUID
    -   **Description**: Unique identifier for the todo item.
    -   **Constraints**: Primary Key, auto-generated.
-   `user_id`:
    -   **Type**: String
    -   **Description**: Identifier of the user who owns this todo. This links the todo to an authenticated user.
    -   **Constraints**: Not Null, foreign key reference (conceptually, to a User entity, though User entity is external to this specific feature's data model).
-   `title`:
    -   **Type**: String
    -   **Description**: A concise title for the todo item.
    -   **Constraints**: Not Null, Maximum length 500 characters.
-   `description`:
    -   **Type**: String
    -   **Description**: A detailed explanation or additional notes for the todo item.
    -   **Constraints**: Nullable, Maximum length 2000 characters.
-   `status`:
    -   **Type**: Enum
    -   **Description**: The current completion state of the todo.
    -   **Constraints**: Not Null, Allowed values: "pending", "completed". Default: "pending".
-   `priority`:
    -   **Type**: Enum
    -   **Description**: The importance level of the todo item.
    -   **Constraints**: Not Null, Allowed values: "low", "medium", "high". Default: "medium".
-   `due_date`:
    -   **Type**: String (ISO Date Format: YYYY-MM-DD)
    -   **Description**: The target date by which the todo should be completed.
    -   **Constraints**: Not Null, Valid ISO 8601 date format.
-   `created_at`:
    -   **Type**: DateTime (UTC)
    -   **Description**: Timestamp indicating when the todo item was created.
    -   **Constraints**: Not Null, auto-generated on creation.
-   `updated_at`:
    -   **Type**: DateTime (UTC)
    -   **Description**: Timestamp indicating when the todo item was last updated.
    -   **Constraints**: Not Null, auto-updated on modification.
-   `completed_at`:
    -   **Type**: DateTime (UTC)
    -   **Description**: Timestamp indicating when the todo item was marked as completed.
    -   **Constraints**: Nullable. Set when status is "completed", nullified when status is "pending".

## Relationships

-   **Todo to User**: Each `Todo` belongs to one `User` (via `user_id`). This is a many-to-one relationship, where a user can have many todos. (Note: The `User` entity itself is managed externally to this feature, likely by an authentication service, but its `id` is crucial for linking todos.)

## Validation Rules

-   **Data Integrity**: `id`, `user_id`, `title`, `status`, `priority`, `due_date`, `created_at`, `updated_at` fields are mandatory.
-   **Length Constraints**: `title` (max 500 chars), `description` (max 2000 chars).
-   **Enum Values**: `status` and `priority` fields must adhere to their defined enum values.
-   **Date Format**: `due_date` must be a valid ISO 8601 date.
-   **Ownership**: All operations on a `Todo` item must be performed by the `User` identified by `user_id` matching the authenticated user's ID. Requests for todos not owned by the user will result in a 404.
