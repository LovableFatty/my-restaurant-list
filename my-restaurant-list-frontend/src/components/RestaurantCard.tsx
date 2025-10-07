import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '@mui/material';
import { Separator } from '@/components/ui/separator';
import type { RestaurantRead } from '@/schemas';

interface RestaurantCardProps {
  restaurant: RestaurantRead;
  onEdit?: (restaurant: RestaurantRead) => void;
  onDelete?: (restaurant: RestaurantRead) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
  onDelete
}) => {
  const formatPriceRange = (priceRange: string) => {
    switch (priceRange) {
      case '$':
        return { text: 'Budget-friendly', color: 'bg-green-100 text-green-800 border-green-200' };
      case '$$':
        return { text: 'Moderate', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
      case '$$$':
        return { text: 'Expensive', color: 'bg-red-100 text-red-800 border-red-200' };
      default:
        return { text: priceRange, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const priceInfo = formatPriceRange(restaurant.priceRange);

  return (
    <Card className="w-3/4 max-w-md mx-auto overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Restaurant Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {/* Price Range Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priceInfo.color}`}>
            {restaurant.priceRange}
          </span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 mb-1">
              {restaurant.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {restaurant.type}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <Rating
            name="restaurant-rating"
            value={restaurant.rating}
            readOnly
            size="small"
          />
          <span className="text-sm text-gray-600">
            {restaurant.rating} star{restaurant.rating !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-4">
          <span className="text-sm text-gray-700">{restaurant.location}</span>
        </div>

        {/* Description */}
        {restaurant.description && (
          <>
            <Separator className="my-4" />
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {restaurant.description}
              </p>
            </div>
          </>
        )}

        {/* Action Buttons */}
        {(onEdit || onDelete) && (
          <>
            <Separator className="my-4" />
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(restaurant)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(restaurant)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200"
                >
                  Delete
                </button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
