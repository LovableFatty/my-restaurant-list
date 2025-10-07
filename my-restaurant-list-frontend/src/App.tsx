import { useState } from 'react';
import { RestaurantDialog } from '@/components/RestaurantDialog';
import { RestaurantCardBlock } from '@/components/RestaurantCardBlock';
import { Pagination } from '@/components/Pagination';
import { ConfirmationDialog, type ConfirmationType } from '@/components/ConfirmationDialog';
import { useRestaurants, useCreateRestaurant, useUpdateRestaurant, useDeleteRestaurant } from '@/hooks/useRestaurants';
import type { RestaurantForm as RestaurantFormType, RestaurantRead } from '@/schemas';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<RestaurantRead | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3; // 3 entries per page
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    type: ConfirmationType;
    title: string;
    description: string;
    onConfirm: () => void;
    isLoading?: boolean;
  }>({
    open: false,
    type: 'success',
    title: '',
    description: '',
    onConfirm: () => {},
    isLoading: false,
  });

  // React Query hooks
  const { data: allRestaurants = [], isLoading: isLoadingRestaurants, error } = useRestaurants();
  
  // Calculate pagination on frontend
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const restaurants = allRestaurants.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allRestaurants.length / limit);
  const createRestaurantMutation = useCreateRestaurant();
  const updateRestaurantMutation = useUpdateRestaurant();
  const deleteRestaurantMutation = useDeleteRestaurant();

  const handleFormSubmit = async (data: RestaurantFormType) => {
    try {
      if (editingRestaurant) {
        // Editing existing restaurant
        await updateRestaurantMutation.mutateAsync({
          id: editingRestaurant.id,
          data
        });
        
        setConfirmationDialog({
          open: true,
          type: 'success',
          title: 'Restaurant Updated!',
          description: `${editingRestaurant.name} has been successfully updated.`,
          onConfirm: () => {
            setConfirmationDialog(prev => ({ ...prev, open: false }));
            setIsFormVisible(false);
            setEditingRestaurant(null);
          },
        });
      } else {
        await createRestaurantMutation.mutateAsync(data);
        
        setConfirmationDialog({
          open: true,
          type: 'success',
          title: 'Restaurant Created!',
          description: `${data.name} has been successfully added to your list.`,
          onConfirm: () => {
            setConfirmationDialog(prev => ({ ...prev, open: false }));
            setIsFormVisible(false);
            setEditingRestaurant(null);
          },
        });
      }
      
    } catch (error) {
      console.error('Error saving restaurant:', error);
      setConfirmationDialog({
        open: true,
        type: 'warning',
        title: 'Error',
        description: 'Failed to save restaurant. Please try again.',
        onConfirm: () => setConfirmationDialog(prev => ({ ...prev, open: false })),
      });
    }
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setEditingRestaurant(null);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setIsFormVisible(false);
      setEditingRestaurant(null);
    }
  };

  const handleEditRestaurant = (restaurant: RestaurantRead) => {
    setEditingRestaurant(restaurant);
    setIsFormVisible(true);
  };

  const handleDeleteRestaurant = (restaurant: RestaurantRead) => {
    setConfirmationDialog({
      open: true,
      type: 'delete',
      title: 'Delete Restaurant',
      description: `Are you sure you want to delete "${restaurant.name}"?`,
      onConfirm: async () => {
        setConfirmationDialog(prev => ({ ...prev, isLoading: true }));
        try {
          await deleteRestaurantMutation.mutateAsync(restaurant.id);
          
          setConfirmationDialog({
            open: true,
            type: 'success',
            title: 'Restaurant Deleted!',
            description: `${restaurant.name} has been successfully removed from your list.`,
            onConfirm: () => setConfirmationDialog(prev => ({ ...prev, open: false })),
          });
        } catch (error) {
          console.error('Error deleting restaurant:', error);
          setConfirmationDialog({
            open: true,
            type: 'warning',
            title: 'Error',
            description: 'Failed to delete restaurant. Please try again.',
            onConfirm: () => setConfirmationDialog(prev => ({ ...prev, open: false })),
          });
        }
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            My Restaurant List
          </h1>
          <p className="text-muted-foreground mb-6">
            Save your favorite restaurants!
          </p>
          
          {!isFormVisible && (
            <button
              onClick={() => {
                setEditingRestaurant(null);
                setIsFormVisible(true);
              }}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Add New Restaurant
            </button>
          )}
        </div>

        <RestaurantDialog
          open={isFormVisible}
          onOpenChange={handleDialogOpenChange}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={createRestaurantMutation.isPending || updateRestaurantMutation.isPending}
          initialData={editingRestaurant || undefined}
          isEditing={!!editingRestaurant}
        />

        <ConfirmationDialog
          open={confirmationDialog.open}
          onOpenChange={(open) => setConfirmationDialog(prev => ({ ...prev, open }))}
          onConfirm={confirmationDialog.onConfirm}
          onCancel={() => setConfirmationDialog(prev => ({ ...prev, open: false }))}
          type={confirmationDialog.type}
          title={confirmationDialog.title}
          description={confirmationDialog.description}
          isLoading={confirmationDialog.isLoading}
        />

        {!isFormVisible && (
          <div>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">{error.message}</p>
              </div>
            )}
            
            {isLoadingRestaurants ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading restaurants...</p>
              </div>
            ) : (
              <>
                <RestaurantCardBlock
                  restaurants={restaurants}
                  onEdit={handleEditRestaurant}
                  onDelete={handleDeleteRestaurant}
                  title="My Restaurants"
                  emptyMessage="No restaurants available. Add one to get started!"
                />
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;