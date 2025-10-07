import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantApi } from '@/services/restaurantApi';
import type { RestaurantCreate, RestaurantUpdate } from '@/schemas';

const RESTAURANTS_KEY = ['restaurants'];

export const useRestaurants = () => {
  return useQuery({
    queryKey: RESTAURANTS_KEY,
    queryFn: async () => {
      const response = await restaurantApi.getAll();
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch restaurants');
      }
      return response.data;
    },
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restaurant: RestaurantCreate) => {
      const response = await restaurantApi.create(restaurant);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create restaurant');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANTS_KEY });
    },
  });
};

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: RestaurantUpdate }) => {
      const response = await restaurantApi.update(id, data);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to update restaurant');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANTS_KEY });
    },
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await restaurantApi.delete(id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete restaurant');
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANTS_KEY });
    },
  });
};
