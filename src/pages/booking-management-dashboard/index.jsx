import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingCard from './components/BookingCard';
import BookingStats from './components/BookingStats';
import FilterControls from './components/FilterControls';
import BookingDetailsModal from './components/BookingDetailsModal';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BookingManagementDashboard = () => {
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    location: 'all',
    sortBy: 'date-desc'
  });

  // Mock bookings data
  const mockBookings = [
    {
      id: 'WD001',
      eventType: 'Wedding Ceremony',
      date: '2025-01-15',
      time: '16:00',
      location: 'Delhi',
      venue: 'The Grand Palace Hotel, Connaught Place',
      droneCount: 2,
      duration: 6,
      price: 45000,
      status: 'Confirmed',
      guestCount: 300,
      lastUpdated: '2025-01-08T10:30:00Z',
      notes: 'Client requested golden hour shots during ceremony',
      photographer: {
        name: 'Rajesh Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        experience: 8,
        rating: 4.8,
        phone: '+91 98765 43210'
      }
    },
    {
      id: 'WD002',
      eventType: 'Pre-Wedding Shoot',
      date: '2025-01-20',
      time: '14:00',
      location: 'Gurgaon',
      venue: 'Cyber Hub, DLF Phase 2',
      droneCount: 1,
      duration: 4,
      price: 25000,
      status: 'Pending',
      guestCount: 2,
      lastUpdated: '2025-01-07T15:45:00Z',
      notes: 'Weather dependent shoot, backup date available',
      photographer: {
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        experience: 5,
        rating: 4.9,
        phone: '+91 87654 32109'
      }
    },
    {
      id: 'WD003',
      eventType: 'Reception Party',
      date: '2024-12-28',
      time: '19:00',
      location: 'Noida',
      venue: 'Radisson Blu Hotel, Sector 55',
      droneCount: 3,
      duration: 8,
      price: 65000,
      status: 'Completed',
      guestCount: 500,
      lastUpdated: '2024-12-29T09:15:00Z',
      notes: 'Excellent coverage, client very satisfied',
      photographer: {
        name: 'Amit Singh',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        experience: 12,
        rating: 4.7,
        phone: '+91 76543 21098'
      }
    },
    {
      id: 'WD004',
      eventType: 'Engagement Ceremony',
      date: '2025-02-14',
      time: '17:30',
      location: 'Delhi',
      venue: 'India Gate Lawns',
      droneCount: 1,
      duration: 3,
      price: 18000,
      status: 'Confirmed',
      guestCount: 150,
      lastUpdated: '2025-01-05T12:20:00Z',
      notes: 'Valentine\'s Day special booking',
      photographer: {
        name: 'Neha Gupta',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        experience: 6,
        rating: 4.6,
        phone: '+91 65432 10987'
      }
    },
    {
      id: 'WD005',
      eventType: 'Sangam Ceremony',
      date: '2024-11-15',
      time: '11:00',
      location: 'Gurgaon',
      venue: 'Kingdom of Dreams',
      droneCount: 2,
      duration: 5,
      price: 35000,
      status: 'Cancelled',
      guestCount: 200,
      lastUpdated: '2024-11-10T14:30:00Z',
      notes: 'Cancelled due to weather conditions',
      photographer: {
        name: 'Vikram Mehta',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        experience: 10,
        rating: 4.5,
        phone: '+91 54321 09876'
      }
    }
  ];

  const [bookings, setBookings] = useState(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState(mockBookings);

  // Calculate stats
  const stats = {
    totalBookings: bookings.length,
    upcomingEvents: bookings.filter(b => 
      new Date(b.date) > new Date() && ['confirmed', 'pending'].includes(b.status.toLowerCase())
    ).length,
    completedServices: bookings.filter(b => b.status.toLowerCase() === 'completed').length,
    totalSpent: bookings
      .filter(b => b.status.toLowerCase() === 'completed')
      .reduce((sum, b) => sum + b.price, 0)
  };

  // Calculate booking counts for filter
  const bookingCounts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status.toLowerCase() === 'confirmed').length,
    pending: bookings.filter(b => b.status.toLowerCase() === 'pending').length,
    completed: bookings.filter(b => b.status.toLowerCase() === 'completed').length,
    cancelled: bookings.filter(b => b.status.toLowerCase() === 'cancelled').length
  };

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/user-registration');
      return;
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  // Filter and sort bookings
  useEffect(() => {
    let filtered = [...bookings];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(booking =>
        booking.eventType.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.venue.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(booking => 
        booking.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Apply location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(booking => booking.location === filters.location);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'price-desc':
          return b.price - a.price;
        case 'price-asc':
          return a.price - b.price;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredBookings(filtered);
  }, [bookings, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      location: 'all',
      sortBy: 'date-desc'
    });
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleModify = (booking) => {
    // In a real app, this would navigate to edit form
    alert(`Modify booking ${booking.id} - This feature will be available soon!`);
  };

  const handleCancel = (booking) => {
    if (window.confirm(`Are you sure you want to cancel booking ${booking.id}?`)) {
      setBookings(prev => 
        prev.map(b => 
          b.id === booking.id 
            ? { ...b, status: 'Cancelled', lastUpdated: new Date().toISOString() }
            : b
        )
      );
    }
  };

  const handleRebook = (booking) => {
    navigate('/homepage-drone-photography-booking', {
      state: { 
        prefillData: {
          eventType: booking.eventType,
          location: booking.location,
          droneCount: booking.droneCount
        }
      }
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Icon name="Camera" size={32} color="white" />
                </div>
                <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
                  Loading Dashboard
                </h2>
                <p className="font-body text-muted-foreground">
                  Please wait while we fetch your bookings...
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-2">
              Booking Dashboard
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Manage your drone photography bookings and track service history
            </p>
          </div>

          {/* Stats Section */}
          <BookingStats stats={stats} />

          {/* Quick Actions */}
          <QuickActions onRefresh={handleRefresh} />

          {/* Filter Controls */}
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            bookingCounts={bookingCounts}
          />

          {/* Bookings Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-xl text-foreground">
                Your Bookings ({filteredBookings.length})
              </h2>
              
              {filteredBookings.length > 0 && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Filter" size={16} />
                  <span>
                    {filters.status !== 'all' && `${filters.status} • `}
                    {filters.location !== 'all' && `${filters.location} • `}
                    Sorted by {filters.sortBy.replace('-', ' ')}
                  </span>
                </div>
              )}
            </div>

            {filteredBookings.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onViewDetails={handleViewDetails}
                    onModify={handleModify}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  No bookings found
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  {filters.search || filters.status !== 'all' || filters.location !== 'all' ?'Try adjusting your filters to see more results' :'You haven\'t made any bookings yet. Start by booking your first drone photography session!'
                  }
                </p>
                <Button
                  variant="default"
                  onClick={() => navigate('/homepage-drone-photography-booking')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Book New Service
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBooking(null);
        }}
        onRebook={handleRebook}
      />
    </>
  );
};

export default BookingManagementDashboard;