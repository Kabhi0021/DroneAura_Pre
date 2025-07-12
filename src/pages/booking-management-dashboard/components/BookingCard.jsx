import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onViewDetails, onModify, onCancel }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-accent text-accent-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-smooth hover:shadow-elevation-2">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Camera" size={24} color="white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-card-foreground">
              {booking.eventType}
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              Booking ID: #{booking.id}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-card-foreground">
          <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
          <span className="font-body">
            {formatDate(booking.date)} at {formatTime(booking.time)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-card-foreground">
          <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
          <span className="font-body">{booking.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-card-foreground">
          <Icon name="Drone" size={16} color="var(--color-muted-foreground)" />
          <span className="font-body">
            {booking.droneCount} {booking.droneCount === 1 ? 'Drone' : 'Drones'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-card-foreground">
          <Icon name="IndianRupee" size={16} color="var(--color-muted-foreground)" />
          <span className="font-body font-medium">₹{booking.price.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {booking.photographer && (
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg mb-4">
          <Image
            src={booking.photographer.avatar}
            alt={booking.photographer.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-body font-medium text-sm text-card-foreground">
              {booking.photographer.name}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              Photographer
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(booking)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        
        {booking.status.toLowerCase() === 'confirmed' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onModify(booking)}
            iconName="Edit"
            iconPosition="left"
            className="flex-1"
          >
            Modify
          </Button>
        )}
        
        {['confirmed', 'pending'].includes(booking.status.toLowerCase()) && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onCancel(booking)}
            iconName="X"
            iconPosition="left"
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;