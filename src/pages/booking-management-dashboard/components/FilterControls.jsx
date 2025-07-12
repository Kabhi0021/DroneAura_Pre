import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  bookingCounts 
}) => {
  const statusOptions = [
    { value: 'all', label: `All Bookings (${bookingCounts.all})` },
    { value: 'confirmed', label: `Confirmed (${bookingCounts.confirmed})` },
    { value: 'pending', label: `Pending (${bookingCounts.pending})` },
    { value: 'completed', label: `Completed (${bookingCounts.completed})` },
    { value: 'cancelled', label: `Cancelled (${bookingCounts.cancelled})` }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'status', label: 'By Status' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'price-asc', label: 'Price: Low to High' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Gurgaon', label: 'Gurgaon' },
    { value: 'Noida', label: 'Noida' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <Input
            type="search"
            placeholder="Search bookings..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full"
          />
          
          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(value) => onFilterChange('status', value)}
            placeholder="Filter by status"
          />
          
          <Select
            options={locationOptions}
            value={filters.location}
            onChange={(value) => onFilterChange('location', value)}
            placeholder="Filter by location"
          />
          
          <Select
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => onFilterChange('sortBy', value)}
            placeholder="Sort by"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;