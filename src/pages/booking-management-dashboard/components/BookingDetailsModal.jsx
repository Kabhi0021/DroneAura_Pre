import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingDetailsModal = ({ booking, isOpen, onClose, onRebook }) => {
  if (!isOpen || !booking) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'completed':
        return 'text-accent';
      case 'cancelled':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="font-heading font-bold text-xl text-card-foreground">
                Booking Details
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                Booking ID: #{booking.id}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Event Information */}
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground mb-4">
                Event Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={20} color="var(--color-primary)" />
                    <div>
                      <p className="font-body font-medium text-card-foreground">
                        {formatDate(booking.date)}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {formatTime(booking.time)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={20} color="var(--color-primary)" />
                    <div>
                      <p className="font-body font-medium text-card-foreground">
                        {booking.location}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {booking.venue}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Heart" size={20} color="var(--color-primary)" />
                    <div>
                      <p className="font-body font-medium text-card-foreground">
                        {booking.eventType}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        Event Type
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" size={20} color="var(--color-primary)" />
                    <div>
                      <p className="font-body font-medium text-card-foreground">
                        {booking.guestCount} Guests
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        Expected Attendance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground mb-4">
                Service Details
              </h3>
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Drone" size={20} color="var(--color-primary)" />
                    <span className="font-body font-medium text-card-foreground">
                      Drone Photography
                    </span>
                  </div>
                  <span className="font-body text-sm text-muted-foreground">
                    {booking.droneCount} {booking.droneCount === 1 ? 'Drone' : 'Drones'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={20} color="var(--color-primary)" />
                    <span className="font-body font-medium text-card-foreground">
                      Duration
                    </span>
                  </div>
                  <span className="font-body text-sm text-muted-foreground">
                    {booking.duration} hours
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="IndianRupee" size={20} color="var(--color-primary)" />
                    <span className="font-body font-medium text-card-foreground">
                      Total Amount
                    </span>
                  </div>
                  <span className="font-body font-semibold text-lg text-card-foreground">
                    ₹{booking.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Photographer Information */}
            {booking.photographer && (
              <div>
                <h3 className="font-heading font-semibold text-lg text-card-foreground mb-4">
                  Assigned Photographer
                </h3>
                <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                  <Image
                    src={booking.photographer.avatar}
                    alt={booking.photographer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-body font-semibold text-card-foreground">
                      {booking.photographer.name}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground mb-2">
                      {booking.photographer.experience} years experience
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={16} color="var(--color-accent)" />
                        <span className="font-body text-sm text-card-foreground">
                          {booking.photographer.rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
                        <span className="font-body text-sm text-card-foreground">
                          {booking.photographer.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Status and Timeline */}
            <div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground mb-4">
                Booking Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Info" size={20} color="var(--color-primary)" />
                  <div>
                    <p className="font-body font-medium text-card-foreground">
                      Current Status: <span className={`font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      Last updated: {new Date(booking.lastUpdated).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                
                {booking.notes && (
                  <div className="bg-muted rounded-lg p-3">
                    <p className="font-body text-sm text-card-foreground">
                      <strong>Notes:</strong> {booking.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            
            {booking.status.toLowerCase() === 'completed' && (
              <Button
                variant="default"
                onClick={() => onRebook(booking)}
                iconName="Repeat"
                iconPosition="left"
                className="flex-1"
              >
                Book Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetailsModal;