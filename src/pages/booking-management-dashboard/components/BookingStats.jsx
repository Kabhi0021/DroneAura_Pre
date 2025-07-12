import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Bookings',
      value: stats.totalBookings,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Completed Services',
      value: stats.completedServices,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Total Spent',
      value: `₹${stats.totalSpent.toLocaleString('en-IN')}`,
      icon: 'IndianRupee',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 transition-smooth hover:shadow-elevation-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.bgColor}`}>
              <Icon name={item.icon} size={24} className={item.color} />
            </div>
          </div>
          
          <div>
            <p className="font-heading font-bold text-2xl text-card-foreground mb-1">
              {item.value}
            </p>
            <p className="font-body text-sm text-muted-foreground">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;