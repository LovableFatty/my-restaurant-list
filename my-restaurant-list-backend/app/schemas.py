"""
Pydantic Schemas for API Request/Response Validation
"""

from typing import Optional, Literal
from sqlmodel import SQLModel, Field

PriceRange = Literal["$", "$$", "$$$"]

class RestaurantBase(SQLModel):
    """
    Base schema.
    """
    name: str = Field(
        min_length=1, 
        max_length=120, 
        description="Restaurant name"
    )
    type: str = Field(
        min_length=1, 
        max_length=80, 
        description="Cuisine type"
    )
    image: str = Field(
        min_length=5, 
        description="URL to restaurant image"
    )
    location: str = Field(
        min_length=1, 
        max_length=80, 
        description="Address where restaurant is located"
    )
    rating: int = Field(
        ge=0, 
        le=5, 
        description="Rating from 0 to 5 stars"
    )
    description: Optional[str] = Field(
        default=None, 
        max_length=400, 
        description="Optional restaurant description"
    )
    priceRange: PriceRange = Field(
        description="Price range indicator"
    )

class RestaurantCreate(RestaurantBase):
    """
    Schema for creating a new restaurant.
    """
    pass

class RestaurantUpdate(SQLModel):
    """
    Schema for updating an existing restaurant.
    Only provided fields will be updated.
    """
    name: Optional[str] = Field(
        default=None, 
        min_length=1, 
        max_length=120,
        description="Updated restaurant name"
    )
    type: Optional[str] = Field(
        default=None, 
        min_length=1, 
        max_length=80,
        description="Updated cuisine type"
    )
    image: Optional[str] = Field(
        default=None, 
        min_length=5,
        description="Updated image URL"
    )
    location: Optional[str] = Field(
        default=None, 
        min_length=1, 
        max_length=80,
        description="Updated location"
    )
    rating: Optional[float] = Field(
        default=None, 
        ge=0, 
        le=5,
        description="Updated rating"
    )
    description: Optional[str] = Field(
        default=None, 
        max_length=400,
        description="Updated description"
    )
    priceRange: Optional[PriceRange] = Field(
        default=None,
        description="Updated price range"
    )

class RestaurantRead(RestaurantBase):
    """
    Schema for reading restaurant data.
    """
    id: int = Field(description="Restaurant UUID")
