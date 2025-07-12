import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import BookingForm from './components/BookingForm';
import ShowcaseSection from './components/ShowcaseSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

const HomepageDronePhotographyBooking = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>WeddingDrones - Professional Aerial Wedding Photography | Delhi NCR</title>
        <meta 
          name="description" 
          content="Capture your special day with stunning aerial photography. Professional drone wedding photography services in Delhi, Gurgaon, and Noida. Book your cinematic wedding memories today." 
        />
        <meta 
          name="keywords" 
          content="wedding drone photography, aerial wedding photography, drone videography, wedding photography Delhi, Gurgaon wedding photography, Noida wedding services" 
        />
        <meta name="author" content="WeddingDrones" />
        <meta property="og:title" content="WeddingDrones - Professional Aerial Wedding Photography" />
        <meta property="og:description" content="Capture your special day with stunning aerial photography. Professional drone wedding photography services in Delhi NCR." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weddingdrones.in/homepage-drone-photography-booking" />
        <link rel="canonical" href="https://weddingdrones.in/homepage-drone-photography-booking" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section with Carousel */}
          <section className="relative">
            <HeroCarousel />
          </section>

          {/* Booking Section */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Left Content - Desktop */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="text-center lg:text-left">
                    <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
                      Professional Drone Photography for Your Special Day
                    </h2>
                    <p className="font-body text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
                      Transform your wedding into a cinematic masterpiece with our professional aerial photography services. We capture every precious moment from breathtaking perspectives that traditional photography simply cannot achieve.
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card rounded-xl p-6 border border-border shadow-elevation-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        4K Cinematic Quality
                      </h3>
                      <p className="font-body text-muted-foreground text-sm">
                        Ultra-high definition footage with professional color grading for stunning visual quality.
                      </p>
                    </div>

                    <div className="bg-card rounded-xl p-6 border border-border shadow-elevation-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        Certified Pilots
                      </h3>
                      <p className="font-body text-muted-foreground text-sm">
                        Licensed and insured drone operators with years of wedding photography experience.
                      </p>
                    </div>

                    <div className="bg-card rounded-xl p-6 border border-border shadow-elevation-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        Same Day Delivery
                      </h3>
                      <p className="font-body text-muted-foreground text-sm">
                        Quick turnaround with highlight reels delivered within 24 hours of your event.
                      </p>
                    </div>

                    <div className="bg-card rounded-xl p-6 border border-border shadow-elevation-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        Unlimited Revisions
                      </h3>
                      <p className="font-body text-muted-foreground text-sm">
                        We work with you until you're completely satisfied with the final output.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar - Booking Form */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <BookingForm />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Showcase Section */}
          <ShowcaseSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Additional Info Section */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8">
                  Why Choose WeddingDrones?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Lightning Fast
                    </h3>
                    <p className="font-body text-muted-foreground">
                      Quick setup and efficient shooting to capture all your important moments without delays.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Affordable Pricing
                    </h3>
                    <p className="font-body text-muted-foreground">
                      Competitive rates with transparent pricing and no hidden costs for premium quality service.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      24/7 Support
                    </h3>
                    <p className="font-body text-muted-foreground">
                      Round-the-clock customer support to assist you before, during, and after your event.
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                    Ready to Make Your Wedding Unforgettable?
                  </h3>
                  <p className="font-body text-muted-foreground mb-6">
                    Join hundreds of couples who have trusted us to capture their most precious moments from the sky.
                  </p>
                  <button
                    onClick={() => document.querySelector('#booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Book Your Session Now</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomepageDronePhotographyBooking;