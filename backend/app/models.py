from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class Todo(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    user_id: str = Field(index=True)  # User ID from JWT token

    title: str = Field(min_length=1, max_length=500)
    description: Optional[str] = Field(default=None, max_length=2000)
    
    status: str = Field(default="pending") # Enum: "pending", "completed"
    priority: str = Field(default="medium") # Enum: "low", "medium", "high"

    due_date: Optional[str] = Field(default=None)  # ✅ Made optional

    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    completed_at: Optional[datetime] = Field(default=None)

    # Update updated_at on each save (though SQLModel handles this in a different way usually)
    # This is a placeholder for model-level hooks or ORM events if needed.
    def __pre_update__(self):
        self.updated_at = datetime.utcnow()
