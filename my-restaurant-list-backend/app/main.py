"""
Restaurant List Main file
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select
from .database import init_db, session_ctx
from .models import Restaurant
from .endpoint import router as restaurants_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager for startup and shutdown events.
    """
    init_db()
    
    # Add sample data if database is empty
    with session_ctx() as session:
        if session.exec(select(Restaurant)).first() is None:
            sample_restaurants = [
                Restaurant(
                    name="RJ's BBQ",
                    type="BBQ",
                    image="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
                    location="San Francisco, CA",
                    rating=4,
                    description="BBQ with a side of fries.",
                    priceRange="$$",
                ),
                Restaurant(
                    name="A1",
                    type="American",
                    image="https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1287&auto=format&fit=crop",
                    location="San Francisco, CA",
                    rating=4,
                    description="American classic with a modern twist.",
                    priceRange="$$$",
                ),
            ]
            session.add_all(sample_restaurants)
            session.commit()
    
    yield

# FastAPI config
app = FastAPI(
    title="Restaurant List API",
    description="A simple API for managing restaurant data",
    version="1.0.0",
    docs_url="/docs",
    lifespan=lifespan
)

# config CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add restaurant routes
app.include_router(restaurants_router)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Simple health check endpoint."""
    return {"status": "healthy", "message": "Restaurant API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

