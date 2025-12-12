# Data Model: Todo Service

**Feature Branch**: `001-todo-dashboard-api`  
**Date**: 2025-12-12  
**Spec**: [link to spec.md]
**Plan**: [link to plan.md]

## Key Entities

### Todo

**Description**: Represents a single to-do item that a user manages.

**Attributes**:

-   **id**: Unique identifier for the todo item. (Type: String/UUID)
-   **user_id**: Identifier of the user to whom this todo item belongs. (Type: String/UUID, Foreign Key/Relationship to User entity)
-   **title**: A brief, descriptive title for the todo item. (Type: String, Required, Max Length: e.g., 255 characters)
-   **description**: A more detailed explanation of the todo item. (Type: String, Optional)
-   **status**: The current state of the todo item. (Type: Enum: "pending", "completed", Required, Default: "pending")
-   **priority**: The importance level of the todo item. (Type: Enum: "low", "medium", "high", Required, Default: "medium")
-   **due_date**: The target date for completing the todo item. (Type: Date/Datetime, Optional)
-   **created_at**: Timestamp when the todo item was created. (Type: Datetime, Auto-generated)
-   **updated_at**: Timestamp when the todo item was last updated. (Type: Datetime, Auto-generated)
-   **completed_at**: Timestamp when the todo item was marked as completed. (Type: Datetime, Optional, Set when status becomes "completed", Cleared when status becomes "pending")

**Relationships**:

-   **User**: Each Todo item belongs to one User. A User can have multiple Todo items. (One-to-Many relationship)

**Validation Rules (derived from Functional Requirements)**:

-   `title` must not be empty.
-   `status` must be either "pending" or "completed".
-   `priority` must be one of "low", "medium", or "high".
-   `completed_at` should only be set when `status` is "completed" and cleared when `status` is "pending".
-   A user can only create, retrieve, update, or delete their own todo items.
