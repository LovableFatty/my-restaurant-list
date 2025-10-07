import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Rating } from '@mui/material';
import { 
  RestaurantFormSchema, 
  type RestaurantForm as RestaurantFormType 
} from '@/schemas';
import { getAllFieldErrors } from '@/utils/validation';

interface RestaurantFormProps {
  onSubmit?: (data: RestaurantFormType) => void;
  onCancel?: () => void;
  initialData?: Partial<RestaurantFormType>;
  isLoading?: boolean;
  isEditing?: boolean;
}

export const RestaurantForm: React.FC<RestaurantFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<Partial<RestaurantFormType>>({
    name: '',
    type: '',
    image: '',
    location: '',
    rating: 0,
    description: '',
    priceRange: '$',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof RestaurantFormType, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = RestaurantFormSchema.safeParse(formData);
    
    if (!validation.success) {
      const fieldErrors = getAllFieldErrors(validation.error);
      setErrors(fieldErrors);
      return;
    }

    onSubmit?.(validation.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Restaurant Name */}
      <Field>
        <Label htmlFor="name">Restaurant Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
          placeholder="Enter restaurant name"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </Field>

      {/* Cuisine Type */}
      <Field>
        <Label htmlFor="type">Cuisine Type *</Label>
        <Input
          id="type"
          type="text"
          value={formData.type || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('type', e.target.value)}
          placeholder="e.g., Italian, Mexican, Asian, American"
          className={errors.type ? 'border-destructive' : ''}
        />
        {errors.type && (
          <p className="text-sm text-destructive mt-1">{errors.type}</p>
        )}
      </Field>

      {/* Image URL */}
      <Field>
        <Label htmlFor="image">Image URL *</Label>
        <Input
          id="image"
          type="url"
          value={formData.image || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('image', e.target.value)}
          placeholder="https://example.com/restaurant-image.jpg"
          className={errors.image ? 'border-destructive' : ''}
        />
        {errors.image && (
          <p className="text-sm text-destructive mt-1">{errors.image}</p>
        )}
      </Field>

      {/* Location */}
      <Field>
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          type="text"
          value={formData.location || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('location', e.target.value)}
          placeholder="Restaurant address"
          className={errors.location ? 'border-destructive' : ''}
        />
        {errors.location && (
          <p className="text-sm text-destructive mt-1">{errors.location}</p>
        )}
      </Field>

      {/* Rating and Price Range Row */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <Field>
            <Label htmlFor="rating">Rating *</Label>
            <div className="flex items-center gap-2">
              <Rating
                name="rating"
                value={formData.rating || 0}
                onChange={(_, newValue) => {
                  handleInputChange('rating', newValue || 0);
                }}
                max={5}
                size="large"
              />
              <span className="text-sm text-muted-foreground">
                {formData.rating || 0} star{(formData.rating || 0) !== 1 ? 's' : ''}
              </span>
            </div>
            {errors.rating && (
              <p className="text-sm text-destructive mt-1">{errors.rating}</p>
            )}
          </Field>
        </div>

        <div className="hidden md:block">
          <Separator orientation="vertical" className="h-full" />
        </div>

        <div className="flex-1">
          <Field>
            <Label htmlFor="priceRange">Price Range *</Label>
            <Select
              value={formData.priceRange || '$'}
              onValueChange={(value: string) => handleInputChange('priceRange', value)}
            >
              <SelectTrigger className={errors.priceRange ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="$">$ (Budget-friendly)</SelectItem>
                <SelectItem value="$$">$$ (Moderate)</SelectItem>
                <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
              </SelectContent>
            </Select>
            {errors.priceRange && (
              <p className="text-sm text-destructive mt-1">{errors.priceRange}</p>
            )}
          </Field>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <Field>
        <Label htmlFor="description">Description (Optional)</Label>
        <textarea
          id="description"
          value={formData.description || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
          placeholder="Tell us about this restaurant..."
          rows={4}
          className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.description ? 'border-destructive' : ''
          }`}
        />
        {errors.description && (
          <p className="text-sm text-destructive mt-1">{errors.description}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Maximum 400 characters ({(formData.description || '').length}/400)
        </p>
      </Field>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading 
            ? (isEditing ? 'Updating Restaurant...' : 'Creating Restaurant...')
            : (isEditing ? 'Update Restaurant' : 'Create Restaurant')
          }
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};