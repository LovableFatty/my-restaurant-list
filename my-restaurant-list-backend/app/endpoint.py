"""
Restaurant API Endpoints
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from .database import get_session
from .models import Restaurant
from .schemas import RestaurantCreate, RestaurantRead, RestaurantUpdate

# Create router with prefix and tags for API documentation
router = APIRouter(prefix="/restaurants", tags=["restaurants"])

# Business Logic Functions

def _list(session: Session) -> List[Restaurant]:
    """
    Get all restaurants from the database.
    """
    return session.exec(select(Restaurant)).all()

def _get(session: Session, restaurant_id: int) -> Restaurant:
    """
    Get a specific restaurant by ID.
    Raises HTTPException if restaurant not found.
    """
    restaurant = session.get(Restaurant, restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

def _create(session: Session, payload: RestaurantCreate) -> Restaurant:
    """
    Create a new restaurant in the database.
    Returns created restaurant with generated ID.
    """
    try:
        restaurant = Restaurant(**payload.model_dump())
        session.add(restaurant)
        session.commit()
        session.refresh(restaurant)
        return restaurant
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create restaurant: {str(e)}")

def _update(session: Session, restaurant_id: int, patch: RestaurantUpdate) -> Restaurant:
    """
    Update an existing restaurant.
    Raises HTTPException if restaurant not found.
    """
    try:
        restaurant = session.get(Restaurant, restaurant_id)
        if not restaurant:
            raise HTTPException(status_code=404, detail="Restaurant not found")
        
        # Update only provided fields
        update_data = patch.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(restaurant, field, value)
        
        session.add(restaurant)
        session.commit()
        session.refresh(restaurant)
        return restaurant
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to update restaurant: {str(e)}")

def _delete(session: Session, restaurant_id: int) -> None:
    """
    Delete a restaurant from the database.
    Raises HTTPException if restaurant not found.
    """
    try:
        restaurant = session.get(Restaurant, restaurant_id)
        if not restaurant:
            raise HTTPException(status_code=404, detail="Restaurant not found")
        
        session.delete(restaurant)
        session.commit()
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete restaurant: {str(e)}")

# API Endpoints

@router.get("", response_model=List[RestaurantRead])
def list_all(session: Session = Depends(get_session)):
    """
    Get all restaurants.
    
    Returns a list of all restaurants in the database.
    """
    return _list(session)

@router.get("/{restaurant_id}", response_model=RestaurantRead)
def get(restaurant_id: int, session: Session = Depends(get_session)):
    """
    Get a specific restaurant by ID.
    """
    try:
        return _get(session, restaurant_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@router.post("", response_model=RestaurantRead, status_code=status.HTTP_201_CREATED)
def create(payload: RestaurantCreate, session: Session = Depends(get_session)):
    """
    Create a new restaurant.
    
    Returns restaurant with generated ID
    """
    try:
        return _create(session, payload)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@router.patch("/{restaurant_id}", response_model=RestaurantRead)
def update(restaurant_id: int, payload: RestaurantUpdate, session: Session = Depends(get_session)):
    """
    Update an existing restaurant.
    """
    try:
        return _update(session, restaurant_id, payload)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@router.delete("/{restaurant_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(restaurant_id: int, session: Session = Depends(get_session)):
    """
    Delete a restaurant.
    """
    try:
        _delete(session, restaurant_id)
        return
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
