import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const carouselImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    alt: "Aerial view of Indian wedding ceremony with decorated mandap and guests"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&h=1080&q=80",
    alt: "Drone shot of wedding procession with baraat and decorated horse"
  },
  {
    id: 3,
    src: "https://images.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    alt: "Beautiful aerial view of outdoor wedding venue with floral decorations"
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    alt: "Stunning drone photography of couple\'s first dance at wedding reception"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1920&h=1080&q=80",
    alt: "Panoramic aerial shot of Indian wedding celebration with colorful decorations"
  }];


  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-muted">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {carouselImages.map((image, index) =>
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'}`
          }>

            <Image
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-black bg-opacity-30" />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-30 hover:scale-110 z-10"
        aria-label="Previous image">

        <Icon name="ChevronLeft" size={24} color="white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-30 hover:scale-110 z-10"
        aria-label="Next image">

        <Icon name="ChevronRight" size={24} color="white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {carouselImages.map((_, index) =>
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === currentSlide ?
          'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`
          }
          aria-label={`Go to slide ${index + 1}`} />

        )}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="text-center text-white px-6 max-w-4xl">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg text-[rgba(242,186,243,1)]">Elevate Your Memories

          </h1>
          <p className="font-body text-lg md:text-xl lg:text-2xl mb-8 drop-shadow-md max-w-2xl mx-auto text-[rgba(244,225,249,1)]">Capture Breathtaking Aerial Perspectives with Professional Drone Photography

          </p>
        </div>
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-30"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}>

          <Icon
            name={isAutoPlaying ? "Pause" : "Play"}
            size={16}
            color="white" />

        </button>
      </div>
    </div>);

};

export default HeroCarousel;