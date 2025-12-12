import os
from typing import Optional
from datetime import datetime, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session, select, Field, SQLModel
from dotenv import load_dotenv

load_dotenv()

BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
if not BETTER_AUTH_SECRET:
    raise ValueError("BETTER_AUTH_SECRET environment variable is not set.")

security = HTTPBearer()

class User:
    def __init__(self, id: str, email: Optional[str] = None, name: Optional[str] = None):
        self.id = id
        self.email = email
        self.name = name

# Better Auth Session Model - adjust field names based on your actual DB schema
class BetterAuthSession(SQLModel, table=True):
    """Better Auth session table model"""
    __tablename__ = "session"
    
    id: str = Field(primary_key=True)
    token: str = Field(index=True, unique=True)
    expiresAt: datetime
    userId: str  # or user_id depending on your schema
    # Add other fields if needed: ipAddress, userAgent, etc.

# Import database session
from database import get_session

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db_session: Session = Depends(get_session)
) -> User:
    """
    Validates Better Auth session token directly from database
    """
    token = credentials.credentials
    
    print(f"🔍 Validating token: {token[:20]}...")  # Debug log (partial token for security)
    
    try:
        # Query Better Auth session table
        statement = select(BetterAuthSession).where(
            BetterAuthSession.token == token
        )
        session_record = db_session.exec(statement).first()
        
        if not session_record:
            print(f"❌ No session found in database for token")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired session",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        print(f"✅ Session found for user: {session_record.userId}")
        
        # Check if session expired
        # Handle timezone-aware datetime
        now = datetime.now(timezone.utc)
        expires_at = session_record.expiresAt
        
        # Make expiresAt timezone-aware if it isn't
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        
        if expires_at < now:
            print(f"❌ Session expired at {expires_at}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Session expired - please login again",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        print(f"✅ Session valid until {expires_at}")
        
        # Return user object with ID from session
        return User(id=session_record.userId)
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"💥 Authentication error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed",
            headers={"WWW-Authenticate": "Bearer"},
        )