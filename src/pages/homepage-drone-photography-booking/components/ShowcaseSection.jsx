import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ShowcaseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState({});
  const scrollContainerRef = useRef(null);
  const videoRefs = useRef({});

  const showcaseItems = [
    {
      id: 1,
      type: 'image',
      src: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Aerial view of traditional Indian wedding ceremony",
      title: "Traditional Ceremony",
      description: "Capturing sacred moments from above"
    },
    {
      id: 2,
      type: 'video',
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      poster: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Wedding procession drone footage",
      title: "Baraat Procession",
      description: "Dynamic aerial coverage of the groom\'s arrival"
    },
    {
      id: 3,
      type: 'image',
      src: "https://images.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Outdoor wedding venue aerial shot",
      title: "Venue Overview",
      description: "Stunning venue perspectives"
    },
    {
      id: 4,
      type: 'video',
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      poster: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "First dance aerial video",
      title: "First Dance",
      description: "Romantic moments captured from the sky"
    },
    {
      id: 5,
      type: 'image',
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Wedding celebration panoramic view",
      title: "Celebration Panorama",
      description: "Complete event coverage"
    },
    {
      id: 6,
      type: 'video',
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      poster: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Wedding highlights reel",
      title: "Highlights Reel",
      description: "Best moments compilation"
    }
  ];

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const getItemsPerView = () => {
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 768) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [currentItemsPerView, setCurrentItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, showcaseItems.length - currentItemsPerView);

  const scrollToIndex = (index) => {
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);
    
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.scrollWidth / showcaseItems.length;
      scrollContainerRef.current.scrollTo({
        left: itemWidth * clampedIndex,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => {
    scrollToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  const toggleVideoPlay = (itemId) => {
    const video = videoRefs.current[itemId];
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(prev => ({ ...prev, [itemId]: true }));
    } else {
      video.pause();
      setIsPlaying(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleVideoEnded = (itemId) => {
    setIsPlaying(prev => ({ ...prev, [itemId]: false }));
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-4">
            Showcase
          </h2>
          <p className="font-body text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of stunning aerial wedding photography and videography
          </p>
        </div>

        {/* Showcase Rail */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center transition-all duration-300 hover:bg-muted hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10 shadow-elevation-2"
            aria-label="Previous showcase items"
          >
            <Icon name="ChevronLeft" size={20} color="var(--color-foreground)" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center transition-all duration-300 hover:bg-muted hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10 shadow-elevation-2"
            aria-label="Next showcase items"
          >
            <Icon name="ChevronRight" size={20} color="var(--color-foreground)" />
          </button>

          {/* Showcase Items Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-elevation-2 border border-border transition-all duration-300 hover:shadow-elevation-3 hover:-translate-y-1">
                  {/* Media Container */}
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    {item.type === 'image' ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <video
                          ref={el => videoRefs.current[item.id] = el}
                          className="w-full h-full object-cover"
                          poster={item.poster}
                          onEnded={() => handleVideoEnded(item.id)}
                          muted
                          playsInline
                        >
                          <source src={item.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Video Play Button */}
                        <button
                          onClick={() => toggleVideoPlay(item.id)}
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-40"
                          aria-label={isPlaying[item.id] ? "Pause video" : "Play video"}
                        >
                          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-100 hover:scale-110">
                            <Icon 
                              name={isPlaying[item.id] ? "Pause" : "Play"} 
                              size={24} 
                              color="var(--color-foreground)" 
                            />
                          </div>
                        </button>
                      </div>
                    )}

                    {/* Media Type Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Icon 
                          name={item.type === 'image' ? "Image" : "Video"} 
                          size={14} 
                          color="white" 
                        />
                        <span className="font-caption text-xs text-white capitalize">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125' :'bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to showcase group ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="font-body text-muted-foreground mb-6">
            Want to see more of our work?
          </p>
          <button
            onClick={() => window.location.href = '/service-showcase-gallery'}
            className="inline-flex items-center gap-2 font-body font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <span>View Full Gallery</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;