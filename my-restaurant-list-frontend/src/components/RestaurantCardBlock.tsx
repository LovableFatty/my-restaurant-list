import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import type { RestaurantRead } from '@/schemas';

interface RestaurantCardBlockProps {
  restaurants: RestaurantRead[];
  onEdit?: (restaurant: RestaurantRead) => void;
  onDelete?: (restaurant: RestaurantRead) => void;
  title?: string;
  emptyMessage?: string;
}

export const RestaurantCardBlock: React.FC<RestaurantCardBlockProps> = ({
  restaurants,
  onEdit,
  onDelete,
  title = "Restaurants",
  emptyMessage = "No restaurants found."
}) => {
  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-2xl font-semibold text-center">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
