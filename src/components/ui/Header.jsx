import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Home', path: '/homepage-drone-photography-booking', icon: 'Home' },
    { label: 'Showcase', path: '/service-showcase-gallery', icon: 'Camera' },
    { label: 'Dashboard', path: '/booking-management-dashboard', icon: 'LayoutDashboard', authRequired: true }
  ];

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate('/booking-management-dashboard');
    } else {
      navigate('/user-registration');
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    navigate('/homepage-drone-photography-booking');
  };

  const filteredNavItems = navigationItems.filter(item => 
    !item.authRequired || (item.authRequired && isAuthenticated)
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
        <div className="flex items-center justify-between h-20 px-6 lg:px-8">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer transition-smooth hover:opacity-80"
            onClick={() => handleNavigation('/homepage-drone-photography-booking')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Camera" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-foreground">
                  WeddingDrones
                </span>
                <span className="font-caption text-xs text-muted-foreground -mt-1">
                  Cinematic Memories
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {filteredNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`font-body font-medium text-base transition-smooth hover:text-primary ${
                  location.pathname === item.path 
                    ? 'text-primary' :'text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg transition-smooth hover:bg-muted"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <Icon 
                    name={isUserMenuOpen ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    color="var(--color-muted-foreground)" 
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 animate-fade-in">
                    <button
                      onClick={() => {
                        handleNavigation('/booking-management-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left font-body text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="LayoutDashboard" size={16} />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left font-body text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            <Button
              variant="default"
              onClick={handleBookNow}
              iconName="Calendar"
              iconPosition="left"
              className="font-medium"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-smooth hover:bg-muted"
          >
            <Icon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              size={24} 
              color="var(--color-foreground)" 
            />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-999 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-1002 md:hidden animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-heading font-bold text-lg text-foreground">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg transition-smooth hover:bg-muted"
                >
                  <Icon name="X" size={20} color="var(--color-foreground)" />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <nav className="flex-1 py-6">
                {filteredNavItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-smooth hover:bg-muted ${
                      location.pathname === item.path 
                        ? 'text-primary bg-muted' :'text-foreground'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="font-body font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Mobile Bottom Section */}
              <div className="p-6 border-t border-border space-y-4">
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-smooth hover:bg-muted rounded-lg text-foreground"
                  >
                    <Icon name="LogOut" size={20} />
                    <span className="font-body font-medium">Logout</span>
                  </button>
                )}
                
                <Button
                  variant="default"
                  onClick={handleBookNow}
                  iconName="Calendar"
                  iconPosition="left"
                  fullWidth
                  className="font-medium"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Header;