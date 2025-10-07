import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RestaurantForm } from './RestaurantForm';
import type { RestaurantForm as RestaurantFormType } from '@/schemas';

interface RestaurantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: RestaurantFormType) => void;
  onCancel?: () => void;
  initialData?: Partial<RestaurantFormType>;
  isLoading?: boolean;
  isEditing?: boolean;
}

export const RestaurantDialog: React.FC<RestaurantDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
  isEditing = false
}) => {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleSubmit = (data: RestaurantFormType) => {
    onSubmit?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the restaurant information below.' 
              : 'Fill out the form below to add a new restaurant to your list.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <RestaurantForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          initialData={initialData}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
};
