from typing import Optional
from datetime import datetime
from uuid import UUID

from sqlmodel import SQLModel


# Properties to receive via API on creation
class TodoCreate(SQLModel):
    title: str
    description: Optional[str] = None
    priority: str = "medium"  # Enum: "low", "medium", "high"
    due_date: Optional[str] = None  # ✅ Made optional


# Properties to receive via API on update
class TodoUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None  # Enum: "pending", "completed"
    priority: Optional[str] = None  # Enum: "low", "medium", "high"
    due_date: Optional[str] = None  # ISO date string YYYY-MM-DD


# Properties to return via API
class TodoRead(SQLModel):
    id: UUID
    user_id: str
    title: str
    description: Optional[str] = None
    status: str
    priority: str
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None
