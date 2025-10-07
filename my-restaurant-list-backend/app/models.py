"""
Database Models
"""
from typing import Optional
from sqlmodel import SQLModel, Field

class Restaurant(SQLModel, table=True):
    """
    Restaurant database model.

    Attributes:
        id: Primary key, auto-generated
        name: Restaurant name (required)
        type: Cuisine type (e.g., "Italian", "Mexican", "Asian")
        image: URL to restaurant image
        location: Address where the restaurant is located
        rating: Rating from 0.0 to 5.0 stars
        description: Optional description of the restaurant
        priceRange: Price range indicator ("$", "$$", "$$$")
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(description="Restaurant name")
    type: str = Field(description="Cuisine type (e.g., Italian, Mexican, Asian)")
    image: str = Field(description="URL to restaurant image")
    location: str = Field(description="Address where restaurant is located")
    rating: float = Field(description="Rating from 0.0 to 5.0 stars")
    description: Optional[str] = Field(default=None, description="Optional restaurant description")
    priceRange: str = Field(description="Price range: $, $$, or $$$")
