import type { RestaurantRead, RestaurantCreate, RestaurantUpdate } from '@/schemas';

// API Configuration
const API_BASE_URL = 'http://localhost:8000';
const API_ENDPOINTS = {
  restaurants: `${API_BASE_URL}/restaurants`,
};

interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

const handleApiError = (error: any): string => {
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

const apiRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Handle 204 for DELETE requests
    if (response.status === 204) {
      return { success: true };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: handleApiError(error) };
  }
};

// Restaurant API Functions

export const restaurantApi = {
  // Get all restaurants (simple approach)
  async getAll(): Promise<ApiResponse<RestaurantRead[]>> {
    return apiRequest<RestaurantRead[]>(API_ENDPOINTS.restaurants);
  },

  // Get a single restaurant by ID
  async getById(id: number): Promise<ApiResponse<RestaurantRead>> {
    return apiRequest<RestaurantRead>(`${API_ENDPOINTS.restaurants}/${id}`);
  },

  // Create a new restaurant
  async create(restaurant: RestaurantCreate): Promise<ApiResponse<RestaurantRead>> {
    return apiRequest<RestaurantRead>(API_ENDPOINTS.restaurants, {
      method: 'POST',
      body: JSON.stringify(restaurant),
    });
  },

  // Update an existing restaurant
  async update(id: number, restaurant: RestaurantUpdate): Promise<ApiResponse<RestaurantRead>> {
    return apiRequest<RestaurantRead>(`${API_ENDPOINTS.restaurants}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(restaurant),
    });
  },

  // Delete a restaurant
  async delete(id: number): Promise<ApiResponse<void>> {
    return apiRequest<void>(`${API_ENDPOINTS.restaurants}/${id}`, {
      method: 'DELETE',
    });
  },
};

export const {
  getAll: getRestaurants,
  getById: getRestaurantById,
  create: createRestaurant,
  update: updateRestaurant,
  delete: deleteRestaurant,
} = restaurantApi;
