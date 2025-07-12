import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GalleryGrid = ({ items, onItemClick, loading }) => {
  const [visibleItems, setVisibleItems] = useState(12);
  const [imageLoadStates, setImageLoadStates] = useState({});

  const handleImageLoad = (itemId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [itemId]: 'loaded'
    }));
  };

  const handleImageError = (itemId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [itemId]: 'error'
    }));
  };

  const loadMoreItems = () => {
    setVisibleItems(prev => prev + 12);
  };

  const getItemHeight = (index) => {
    const heights = ['h-64', 'h-80', 'h-72', 'h-96'];
    return heights[index % heights.length];
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`bg-muted rounded-lg animate-pulse ${getItemHeight(index)}`}
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
          No Results Found
        </h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search criteria or filters to find more content.
        </p>
        <Button variant="outline" iconName="RotateCcw" iconPosition="left">
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.slice(0, visibleItems).map((item, index) => (
          <div
            key={item.id}
            className={`group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-elevation-2 transition-smooth cursor-pointer ${getItemHeight(index)}`}
            onClick={() => onItemClick(item)}
          >
            {/* Media Content */}
            <div className="relative w-full h-full">
              {item.type === 'video' ? (
                <div className="relative w-full h-full bg-black">
                  <video
                    className="w-full h-full object-cover"
                    poster={item.thumbnail}
                    preload="metadata"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Icon name="Play" size={24} color="var(--color-foreground)" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                      {item.duration}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {imageLoadStates[item.id] !== 'loaded' && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoad={() => handleImageLoad(item.id)}
                    onError={() => handleImageError(item.id)}
                  />
                </div>
              )}

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-primary px-2 py-1 rounded text-xs font-medium">
                      {item.eventType}
                    </span>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={14} />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={14} />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-xs opacity-80">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    <span>{item.location}</span>
                    <span className="mx-2">•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col space-y-2">
                  <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-smooth">
                    <Icon name="Heart" size={16} color="var(--color-foreground)" />
                  </button>
                  <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-smooth">
                    <Icon name="Share2" size={16} color="var(--color-foreground)" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleItems < items.length && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={loadMoreItems}
            iconName="ChevronDown"
            iconPosition="right"
            className="px-8"
          >
            Load More ({items.length - visibleItems} remaining)
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;