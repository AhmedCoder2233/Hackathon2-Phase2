from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables
from routes import todos # Import the todos router

# Initialize FastAPI app
app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Configure CORS middleware
origins = [
    "http://localhost:3000",  # Allow frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todos.router) # Include the todos router with a prefix

@app.get("/")
async def root():
    return {"message": "Todo API with JWT Authentication is running!"}
