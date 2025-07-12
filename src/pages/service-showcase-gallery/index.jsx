import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchFilters from './components/SearchFilters';
import GalleryGrid from './components/GalleryGrid';
import LightboxModal from './components/LightboxModal';
import TestimonialSection from './components/TestimonialSection';
import Icon from '../../components/AppIcon';

const ServiceShowcaseGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    weddingType: 'all',
    location: 'all',
    season: 'all',
    droneCount: 'all'
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

  // Mock gallery data
  const mockGalleryData = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      alt: 'Traditional Indian Wedding Aerial View',
      title: 'Majestic Baraat Procession from Above',
      description: 'Stunning aerial capture of the groom\'s baraat procession with decorated horses and traditional band, showcasing the grandeur of Indian wedding celebrations.',
      eventType: 'Traditional Indian',
      location: 'Delhi',
      date: 'Dec 15, 2024',
      season: 'winter',
      droneCount: 2,
      likes: 245,
      views: 1520,
      duration: null
    },
    {
      id: 2,
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop',
      alt: 'Destination Wedding Video',
      title: 'Romantic Destination Wedding Highlights',
      description: 'Cinematic drone footage capturing the essence of a beautiful destination wedding with panoramic views of the venue and surrounding landscape.',
      eventType: 'Destination Wedding',
      location: 'Gurgaon',
      date: 'Nov 28, 2024',
      season: 'winter',
      droneCount: 3,
      likes: 189,
      views: 2340,
      duration: '2:45'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
      alt: 'Mehendi Ceremony Aerial Shot',
      title: 'Colorful Mehendi Celebration',
      description: 'Vibrant aerial photography of mehendi ceremony with beautiful decorations, capturing the joy and colors of this traditional pre-wedding celebration.',
      eventType: 'Mehendi Ceremony',
      location: 'Noida',
      date: 'Jan 10, 2025',
      season: 'winter',
      droneCount: 1,
      likes: 156,
      views: 980,
      duration: null
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
      alt: 'Reception Venue Aerial View',
      title: 'Grand Reception Setup',
      description: 'Spectacular aerial view of the reception venue with elegant lighting and decorations, showcasing the perfect ambiance for the celebration.',
      eventType: 'Reception',
      location: 'Delhi',
      date: 'Oct 22, 2024',
      season: 'winter',
      droneCount: 2,
      likes: 298,
      views: 1890,
      duration: null
    },
    {
      id: 5,
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
      alt: 'Sangam Ceremony Video',
      title: 'Sacred Sangam Ceremony',
      description: 'Emotional drone coverage of the sangam ceremony, capturing the sacred moments and traditional rituals with artistic aerial perspectives.',
      eventType: 'Sangam Ceremony',
      location: 'Gurgaon',
      date: 'Sep 18, 2024',
      season: 'monsoon',
      droneCount: 2,
      likes: 167,
      views: 1450,
      duration: '3:20'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?w=800&h=600&fit=crop',
      alt: 'Haldi Ceremony Aerial',
      title: 'Joyful Haldi Celebration',
      description: 'Bright and cheerful aerial shots of the haldi ceremony, capturing the traditional yellow theme and happy moments of this auspicious ritual.',
      eventType: 'Haldi Ceremony',
      location: 'Noida',
      date: 'Aug 25, 2024',
      season: 'monsoon',
      droneCount: 1,
      likes: 134,
      views: 876,
      duration: null
    },
    {
      id: 7,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
      alt: 'Traditional Wedding Mandap',
      title: 'Sacred Wedding Mandap',
      description: 'Beautiful aerial perspective of the wedding mandap with intricate decorations and traditional setup, capturing the sanctity of the ceremony.',
      eventType: 'Traditional Indian',
      location: 'Delhi',
      date: 'Jul 12, 2024',
      season: 'monsoon',
      droneCount: 3,
      likes: 312,
      views: 2100,
      duration: null
    },
    {
      id: 8,
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop',
      alt: 'Destination Wedding Venue',
      title: 'Scenic Destination Venue',
      description: 'Breathtaking drone footage of a destination wedding venue with panoramic views, showcasing the natural beauty and elegant setup.',
      eventType: 'Destination Wedding',
      location: 'Gurgaon',
      date: 'Jun 30, 2024',
      season: 'summer',
      droneCount: 4,
      likes: 278,
      views: 1780,
      duration: '4:15'
    },
    {
      id: 9,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Reception Dance Floor',
      title: 'Energetic Reception Dance',
      description: 'Dynamic aerial shots of the reception dance floor with guests celebrating, capturing the energy and joy of the wedding celebration.',
      eventType: 'Reception',
      location: 'Noida',
      date: 'May 15, 2024',
      season: 'summer',
      droneCount: 2,
      likes: 203,
      views: 1340,
      duration: null
    },
    {
      id: 10,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&h=600&fit=crop',
      alt: 'Traditional Ceremony Setup',
      title: 'Elegant Ceremony Arrangement',
      description: 'Sophisticated aerial view of the traditional ceremony setup with beautiful floral arrangements and cultural decorations.',
      eventType: 'Traditional Indian',
      location: 'Delhi',
      date: 'Apr 20, 2024',
      season: 'summer',
      droneCount: 1,
      likes: 189,
      views: 1120,
      duration: null
    },
    {
      id: 11,
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop',
      alt: 'Mehendi Function Video',
      title: 'Vibrant Mehendi Function',
      description: 'Colorful drone coverage of the mehendi function with traditional music, dance, and beautiful henna designs being applied.',
      eventType: 'Mehendi Ceremony',
      location: 'Gurgaon',
      date: 'Mar 18, 2024',
      season: 'summer',
      droneCount: 2,
      likes: 145,
      views: 967,
      duration: '2:30'
    },
    {
      id: 12,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
      alt: 'Sangam Ritual Aerial',
      title: 'Sacred Sangam Ritual',
      description: 'Respectful aerial documentation of the sangam ritual, capturing the spiritual significance and traditional elements of the ceremony.',
      eventType: 'Sangam Ceremony',
      location: 'Noida',
      date: 'Feb 25, 2024',
      season: 'winter',
      droneCount: 1,
      likes: 167,
      views: 1230,
      duration: null
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setGalleryItems(mockGalleryData);
      setFilteredItems(mockGalleryData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterItems();
  }, [filters, galleryItems]);

  const filterItems = () => {
    let filtered = [...galleryItems];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.eventType.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Wedding type filter
    if (filters.weddingType !== 'all') {
      filtered = filtered.filter(item => 
        item.eventType.toLowerCase().includes(filters.weddingType.toLowerCase())
      );
    }

    // Location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(item => 
        item.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // Season filter
    if (filters.season !== 'all') {
      filtered = filtered.filter(item => item.season === filters.season);
    }

    // Drone count filter
    if (filters.droneCount !== 'all') {
      filtered = filtered.filter(item => 
        item.droneCount.toString() === filters.droneCount
      );
    }

    setFilteredItems(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      weddingType: 'all',
      location: 'all',
      season: 'all',
      droneCount: 'all'
    });
  };

  const handleItemClick = (item) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setCurrentLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxNavigate = (index) => {
    setCurrentLightboxIndex(index);
  };

  return (
    <>
      <Helmet>
        <title>Service Showcase Gallery - WeddingDrones | Aerial Wedding Photography Portfolio</title>
        <meta name="description" content="Explore our stunning collection of drone wedding photography and videography. View aerial shots of Indian weddings, mehendi ceremonies, receptions, and more from Delhi NCR." />
        <meta name="keywords" content="drone wedding photography, aerial wedding videos, Indian wedding photography, mehendi drone shots, wedding portfolio, Delhi wedding photography" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <button 
                onClick={() => window.location.href = '/homepage-drone-photography-booking'}
                className="hover:text-primary transition-smooth"
              >
                Home
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Showcase Gallery</span>
            </nav>

            {/* Hero Content */}
            <div className="text-center">
              <h1 className="font-heading font-bold text-5xl lg:text-6xl text-primary mb-6">
                Showcase
              </h1>
              <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover our portfolio of breathtaking aerial wedding photography and videography. 
                Each image tells a unique story of love, celebration, and unforgettable moments captured from above.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Camera" size={16} />
                  <span>500+ Weddings Captured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>Delhi NCR Coverage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} />
                  <span>Professional Quality</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Search and Filters */}
            <SearchFilters
              onFilterChange={handleFilterChange}
              activeFilters={filters}
              onClearFilters={handleClearFilters}
            />

            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="font-heading font-semibold text-2xl text-foreground">
                  Gallery
                </h2>
                <span className="text-muted-foreground">
                  {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              
              {/* View Toggle (Future Enhancement) */}
              <div className="hidden sm:flex items-center space-x-2">
                <button className="p-2 rounded-lg bg-primary text-primary-foreground">
                  <Icon name="Grid3X3" size={16} />
                </button>
                <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth">
                  <Icon name="List" size={16} />
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <GalleryGrid
              items={filteredItems}
              onItemClick={handleItemClick}
              loading={loading}
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-heading font-bold text-4xl text-white mb-4">
              Ready to Create Your Own Story?
            </h2>
            <p className="font-body text-xl text-white/90 mb-8">
              Let us capture your special moments with the same passion and professionalism 
              showcased in our gallery. Book your drone photography session today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => window.location.href = '/user-registration'}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-smooth flex items-center space-x-2"
              >
                <Icon name="Calendar" size={20} />
                <span>Book Your Session</span>
              </button>
              <button
                onClick={() => window.location.href = '/homepage-drone-photography-booking'}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-smooth flex items-center space-x-2"
              >
                <Icon name="Home" size={20} />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={currentLightboxIndex}
        onNavigate={handleLightboxNavigate}
      />
    </>
  );
};

export default ServiceShowcaseGallery;