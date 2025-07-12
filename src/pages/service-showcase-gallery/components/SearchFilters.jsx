import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchFilters = ({ onFilterChange, activeFilters, onClearFilters }) => {
  const [searchTerm, setSearchTerm] = useState(activeFilters.search || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const weddingTypeOptions = [
    { value: 'all', label: 'All Wedding Types' },
    { value: 'traditional', label: 'Traditional Indian' },
    { value: 'destination', label: 'Destination Wedding' },
    { value: 'sangam', label: 'Sangam Ceremony' },
    { value: 'reception', label: 'Reception' },
    { value: 'mehendi', label: 'Mehendi Ceremony' },
    { value: 'haldi', label: 'Haldi Ceremony' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'gurgaon', label: 'Gurgaon' },
    { value: 'noida', label: 'Noida' },
    { value: 'faridabad', label: 'Faridabad' },
    { value: 'ghaziabad', label: 'Ghaziabad' }
  ];

  const seasonOptions = [
    { value: 'all', label: 'All Seasons' },
    { value: 'winter', label: 'Winter (Nov-Feb)' },
    { value: 'summer', label: 'Summer (Mar-Jun)' },
    { value: 'monsoon', label: 'Monsoon (Jul-Oct)' }
  ];

  const droneCountOptions = [
    { value: 'all', label: 'Any Drone Count' },
    { value: '1', label: '1 Drone' },
    { value: '2', label: '2 Drones' },
    { value: '3', label: '3 Drones' },
    { value: '4', label: '4 Drones' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ ...activeFilters, search: value });
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...activeFilters, [filterType]: value });
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value && value !== 'all').length;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search by event type, location, or description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="flex-1 sm:flex-none"
        >
          Advanced Filters
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>

        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="ml-4 text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
          <Select
            label="Wedding Type"
            options={weddingTypeOptions}
            value={activeFilters.weddingType || 'all'}
            onChange={(value) => handleFilterChange('weddingType', value)}
          />

          <Select
            label="Location"
            options={locationOptions}
            value={activeFilters.location || 'all'}
            onChange={(value) => handleFilterChange('location', value)}
          />

          <Select
            label="Season"
            options={seasonOptions}
            value={activeFilters.season || 'all'}
            onChange={(value) => handleFilterChange('season', value)}
          />

          <Select
            label="Drone Count"
            options={droneCountOptions}
            value={activeFilters.droneCount || 'all'}
            onChange={(value) => handleFilterChange('droneCount', value)}
          />
        </div>
      )}

      {/* Active Filter Chips */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || value === 'all') return null;
            
            let displayValue = value;
            if (key === 'weddingType') {
              displayValue = weddingTypeOptions.find(opt => opt.value === value)?.label || value;
            } else if (key === 'location') {
              displayValue = locationOptions.find(opt => opt.value === value)?.label || value;
            } else if (key === 'season') {
              displayValue = seasonOptions.find(opt => opt.value === value)?.label || value;
            } else if (key === 'droneCount') {
              displayValue = droneCountOptions.find(opt => opt.value === value)?.label || value;
            }

            return (
              <div
                key={key}
                className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                <span>{displayValue}</span>
                <button
                  onClick={() => handleFilterChange(key, key === 'search' ? '' : 'all')}
                  className="ml-2 hover:bg-primary/20 rounded-full p-1 transition-smooth"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;