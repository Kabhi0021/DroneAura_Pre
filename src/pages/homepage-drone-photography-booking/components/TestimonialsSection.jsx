import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya & Arjun Sharma",
      location: "Delhi",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      text: `WeddingDrones captured our special day beautifully! The aerial shots of our baraat procession were absolutely stunning.\nThe team was professional and delivered beyond our expectations. Highly recommended for any wedding!`
    },
    {
      id: 2,
      name: "Kavya & Rohit Gupta",
      location: "Gurgaon",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      text: `Amazing drone photography service! They captured our outdoor wedding ceremony from perfect angles.\nThe final video compilation brought tears to our eyes. Worth every penny spent!`
    },
    {
      id: 3,
      name: "Sneha & Vikram Patel",
      location: "Noida",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      text: `Professional team with excellent equipment. The aerial shots of our venue looked like a fairy tale.\nThey were punctual, courteous, and delivered high-quality footage. Absolutely loved their work!`
    },
    {
      id: 4,
      name: "Anita & Rajesh Kumar",
      location: "Delhi",
      avatar: "https://randomuser.me/api/portraits/women/38.jpg",
      rating: 5,
      text: `WeddingDrones made our wedding memories unforgettable. The drone footage added a cinematic touch to our celebration.\nTheir attention to detail and creative shots were impressive. Highly satisfied with their service!`
    },
    {
      id: 5,
      name: "Meera & Sanjay Singh",
      location: "Gurgaon",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      rating: 5,
      text: `Exceptional drone photography service! They captured our mehendi and sangeet ceremonies beautifully.\nThe team was flexible with our requirements and delivered stunning aerial perspectives. Definitely recommend!`
    },
    {
      id: 6,
      name: "Ritu & Amit Agarwal",
      location: "Noida",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      rating: 5,
      text: `Outstanding work by WeddingDrones! The aerial shots of our reception venue were breathtaking.\nThey managed to capture all the important moments from unique angles. Professional and reliable service!`
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < rating ? "#FFD700" : "#E0E0E0"}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            What Our Couples Say
          </h2>
          <p className="font-body text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Read testimonials from happy couples who chose WeddingDrones for their special day
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-6 shadow-elevation-2 border border-border transition-all duration-300 hover:shadow-elevation-3 hover:-translate-y-1"
            >
              {/* Rating Stars */}
              <div className="flex justify-center mb-4">
                <div className="flex gap-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="mb-6">
                <p className="font-body text-foreground text-sm leading-relaxed whitespace-pre-line">
                  "{testimonial.text}"
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name} profile picture`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                    <span className="font-body text-muted-foreground text-xs">
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-card rounded-2xl p-8 shadow-elevation-2 border border-border max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Ready to Create Your Own Success Story?
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              Join hundreds of happy couples who trusted WeddingDrones with their special day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/user-registration'}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105"
              >
                <Icon name="Calendar" size={16} />
                <span>Book Now</span>
              </button>
              <button
                onClick={() => window.location.href = '/service-showcase-gallery'}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-primary border border-primary font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <Icon name="Eye" size={16} />
                <span>View Portfolio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Users" size={20} />
              <span className="font-body text-sm">500+ Happy Couples</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Star" size={20} color="#FFD700" className="fill-current" />
              <span className="font-body text-sm">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Award" size={20} />
              <span className="font-body text-sm">Award Winning Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={20} />
              <span className="font-body text-sm">Fully Insured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;