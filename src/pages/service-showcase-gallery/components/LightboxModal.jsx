import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LightboxModal = ({ isOpen, onClose, items, currentIndex, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const currentItem = items[currentIndex];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentItem.title,
          text: `Check out this amazing drone photography from ${currentItem.location}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className={`absolute top-6 right-6 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Icon name="X" size={24} />
      </button>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className={`absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Icon name="ChevronLeft" size={24} />
        </button>
      )}

      {currentIndex < items.length - 1 && (
        <button
          onClick={handleNext}
          className={`absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Icon name="ChevronRight" size={24} />
        </button>
      )}

      {/* Main Content */}
      <div className="relative max-w-7xl max-h-full mx-4 flex items-center justify-center">
        {currentItem.type === 'video' ? (
          <video
            className="max-w-full max-h-[80vh] object-contain"
            controls
            autoPlay
            src={currentItem.src}
          />
        ) : (
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            className="max-w-full max-h-[80vh] object-contain"
            onLoad={() => setIsLoading(false)}
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Bottom Info Panel */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-all ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between text-white">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium">
                  {currentItem.eventType}
                </span>
                <div className="flex items-center space-x-4 text-sm opacity-80">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} />
                    <span>{currentItem.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>{currentItem.views}</span>
                  </div>
                </div>
              </div>
              <h2 className="font-heading font-semibold text-xl mb-2">
                {currentItem.title}
              </h2>
              <div className="flex items-center text-sm opacity-80 mb-3">
                <Icon name="MapPin" size={14} className="mr-1" />
                <span>{currentItem.location}</span>
                <span className="mx-3">•</span>
                <span>{currentItem.date}</span>
                <span className="mx-3">•</span>
                <span>{currentItem.droneCount} Drone{currentItem.droneCount > 1 ? 's' : ''}</span>
              </div>
              <p className="text-sm opacity-90 max-w-2xl">
                {currentItem.description}
              </p>
            </div>

            <div className="flex items-center space-x-3 ml-6">
              <Button
                variant="outline"
                onClick={handleShare}
                iconName="Share2"
                iconPosition="left"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Share
              </Button>
              <Button
                variant="default"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => {
                  onClose();
                  // Navigate to booking with pre-filled data
                  window.location.href = '/user-registration';
                }}
              >
                Book Similar
              </Button>
            </div>
          </div>

          {/* Image Counter */}
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm opacity-60">
              {currentIndex + 1} of {items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;