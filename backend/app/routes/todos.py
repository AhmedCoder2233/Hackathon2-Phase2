from typing import List
from uuid import UUID
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from auth import get_current_user, User
from database import get_session
from models import Todo
from schemas import TodoCreate, TodoRead, TodoUpdate

router = APIRouter()

@router.get("/protected-test")
async def protected_test(current_user: User = Depends(get_current_user)):
    return {"message": f"Hello {current_user.id}, you are authenticated!"}

@router.get("/todos/", response_model=List[TodoRead])
async def read_todos(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    todos = session.exec(
        select(Todo).where(Todo.user_id == current_user.id)
    ).all()
    return todos

@router.post("/todos/", response_model=TodoRead, status_code=status.HTTP_201_CREATED)
async def create_todo(
    todo: TodoCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    todo_dict = todo.model_dump()
    todo_dict['user_id'] = current_user.id
    
    db_todo = Todo.model_validate(todo_dict)
    
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

@router.put("/todos/{todo_id}", response_model=TodoRead)
async def update_todo(
    todo_id: UUID,
    todo: TodoUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_todo = session.exec(
        select(Todo).where(Todo.id == todo_id, Todo.user_id == current_user.id)
    ).first()

    if not db_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found"
        )

    todo_data = todo.model_dump(exclude_unset=True)
    for key, value in todo_data.items():
        setattr(db_todo, key, value)
    
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

@router.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(
    todo_id: UUID,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    todo = session.exec(
        select(Todo).where(Todo.id == todo_id, Todo.user_id == current_user.id)
    ).first()

    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found"
        )

    session.delete(todo)
    session.commit()
    return {"message": "Todo deleted successfully"}

@router.patch("/todos/{todo_id}/complete", response_model=TodoRead)
async def toggle_complete_todo(
    todo_id: UUID,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_todo = session.exec(
        select(Todo).where(Todo.id == todo_id, Todo.user_id == current_user.id)
    ).first()

    if not db_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found"
        )

    if db_todo.status == "pending":
        db_todo.status = "completed"
        db_todo.completed_at = datetime.utcnow()
    else:
        db_todo.status = "pending"
        db_todo.completed_at = None
    
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo