import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    startDate: '',
    endDate: '',
    location: '',
    droneQuantity: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateMode, setDateMode] = useState('single'); // single, range, multiple
  const [multipleDates, setMultipleDates] = useState([]);

  const locationOptions = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'gurgaon', label: 'Gurgaon' },
    { value: 'noida', label: 'Noida' }
  ];

  const droneQuantityOptions = [
    { value: '1', label: '1 Drone' },
    { value: '2', label: '2 Drones' },
    { value: '3', label: '3 Drones' },
    { value: '4', label: '4 Drones' }
  ];

  const dateModeOptions = [
    { value: 'single', label: 'Single Date' },
    { value: 'range', label: 'Date Range' },
    { value: 'multiple', label: 'Multiple Dates' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Date is required';
    }

    if (dateMode === 'range' && !formData.endDate) {
      newErrors.endDate = 'End date is required for date range';
    }

    if (dateMode === 'multiple' && multipleDates.length === 0) {
      newErrors.multipleDates = 'Please select at least one date';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    if (!formData.droneQuantity) {
      newErrors.droneQuantity = 'Drone quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDateModeChange = (mode) => {
    setDateMode(mode);
    setFormData(prev => ({
      ...prev,
      startDate: '',
      endDate: ''
    }));
    setMultipleDates([]);
    setErrors(prev => ({
      ...prev,
      startDate: '',
      endDate: '',
      multipleDates: ''
    }));
  };

  const handleMultipleDateAdd = () => {
    if (formData.startDate && !multipleDates.includes(formData.startDate)) {
      setMultipleDates(prev => [...prev, formData.startDate]);
      setFormData(prev => ({ ...prev, startDate: '' }));
    }
  };

  const handleMultipleDateRemove = (dateToRemove) => {
    setMultipleDates(prev => prev.filter(date => date !== dateToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store booking data in localStorage
      const bookingData = {
        ...formData,
        dateMode,
        multipleDates: dateMode === 'multiple' ? multipleDates : [],
        bookingId: `WD${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('currentBooking', JSON.stringify(bookingData));
      
      // Navigate to registration page
      navigate('/user-registration');
      
    } catch (error) {
      console.error('Booking submission error:', error);
      setErrors({ submit: 'Failed to submit booking. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-2xl shadow-elevation-2 p-6 lg:p-8 border border-border">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
          Book Your Drone Photography
        </h2>
        <p className="font-body text-muted-foreground">
          Fill in the details to get started with your wedding photography booking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Input */}
        <Input
          label="Your Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          error={errors.username}
          required
        />

        {/* Date Mode Selection */}
        <Select
          label="Date Selection Mode"
          options={dateModeOptions}
          value={dateMode}
          onChange={handleDateModeChange}
          placeholder="Choose date selection type"
        />

        {/* Date Inputs */}
        {dateMode === 'single' && (
          <Input
            label="Wedding Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            error={errors.startDate}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        )}

        {dateMode === 'range' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              error={errors.startDate}
              required
              min={new Date().toISOString().split('T')[0]}
            />
            <Input
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              error={errors.endDate}
              required
              min={formData.startDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        )}

        {dateMode === 'multiple' && (
          <div>
            <div className="flex gap-2 mb-2">
              <Input
                label="Add Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleMultipleDateAdd}
                disabled={!formData.startDate}
                className="mt-6"
                iconName="Plus"
              >
                Add
              </Button>
            </div>
            
            {multipleDates.length > 0 && (
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-foreground">
                  Selected Dates:
                </label>
                <div className="flex flex-wrap gap-2">
                  {multipleDates.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-muted px-3 py-1 rounded-lg"
                    >
                      <span className="font-body text-sm text-foreground">
                        {formatDate(date)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleMultipleDateRemove(date)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {errors.multipleDates && (
              <p className="text-destructive text-sm mt-1">{errors.multipleDates}</p>
            )}
          </div>
        )}

        {/* Location Selection */}
        <Select
          label="Location"
          options={locationOptions}
          value={formData.location}
          onChange={(value) => handleInputChange('location', value)}
          placeholder="Select your wedding location"
          error={errors.location}
          required
        />

        {/* Drone Quantity Selection */}
        <Select
          label="Number of Drones"
          options={droneQuantityOptions}
          value={formData.droneQuantity}
          onChange={(value) => handleInputChange('droneQuantity', value)}
          placeholder="Select drone quantity"
          error={errors.droneQuantity}
          required
        />

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isSubmitting}
          iconName="Calendar"
          iconPosition="left"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
        >
          {isSubmitting ? 'Processing...' : 'Book a Drone'}
        </Button>
      </form>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Icon name="Shield" size={16} />
          <span className="font-body">
            Secure booking • No payment required upfront • Free consultation
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;