import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onRefresh }) => {
  const navigate = useNavigate();

  const handleNewBooking = () => {
    navigate('/homepage-drone-photography-booking');
  };

  const handleViewShowcase = () => {
    navigate('/service-showcase-gallery');
  };

  const quickActionItems = [
    {
      label: 'Book New Service',
      icon: 'Plus',
      variant: 'default',
      onClick: handleNewBooking,
      description: 'Schedule a new drone photography session'
    },
    {
      label: 'View Showcase',
      icon: 'Camera',
      variant: 'outline',
      onClick: handleViewShowcase,
      description: 'Browse our portfolio and previous work'
    },
    {
      label: 'Refresh Data',
      icon: 'RefreshCw',
      variant: 'ghost',
      onClick: onRefresh,
      description: 'Update booking information'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="font-heading font-semibold text-lg text-card-foreground mb-4">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActionItems.map((action, index) => (
          <div
            key={index}
            className="group p-4 border border-border rounded-lg transition-smooth hover:shadow-elevation-1 hover:border-primary/20"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                <Icon name={action.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <Button
                  variant={action.variant}
                  size="sm"
                  onClick={action.onClick}
                  iconName={action.icon}
                  iconPosition="left"
                  fullWidth
                >
                  {action.label}
                </Button>
              </div>
            </div>
            <p className="font-body text-xs text-muted-foreground pl-13">
              {action.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;