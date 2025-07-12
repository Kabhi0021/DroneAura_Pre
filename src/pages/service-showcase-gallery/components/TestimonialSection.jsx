import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya & Arjun Sharma",
      location: "Delhi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      testimonial: `The drone footage of our wedding was absolutely breathtaking! WeddingDrones captured every moment beautifully.\nOur guests were amazed by the aerial shots during the baraat procession.`,
      eventType: "Traditional Wedding",
      date: "December 2024"
    },
    {
      id: 2,
      name: "Kavya & Rohit Gupta",
      location: "Gurgaon",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      testimonial: `Professional service from start to finish. The team was punctual and captured our destination wedding perfectly.\nThe final video exceeded all our expectations and made our day even more special.`,
      eventType: "Destination Wedding",
      date: "November 2024"
    },
    {
      id: 3,
      name: "Anita & Vikram Singh",
      location: "Noida",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      testimonial: `Amazing aerial cinematography! The drone shots during our mehendi ceremony were stunning.\nHighly recommend WeddingDrones for anyone looking for unique wedding photography.`,
      eventType: "Mehendi Ceremony",
      date: "January 2025"
    },
    {
      id: 4,
      name: "Sneha & Karan Malhotra",
      location: "Delhi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      testimonial: `The team captured our sangam ceremony beautifully with multiple drones providing different angles.\nEvery shot was perfectly timed and the quality was exceptional throughout the event.`,
      eventType: "Sangam Ceremony",
      date: "October 2024"
    },
    {
      id: 5,
      name: "Riya & Amit Agarwal",
      location: "Gurgaon",
      rating: 5,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      testimonial: `Outstanding service and incredible footage! The aerial shots of our reception venue looked magical.\nWeddingDrones made our special day even more memorable with their professional approach.`,
      eventType: "Reception",
      date: "September 2024"
    },
    {
      id: 6,
      name: "Pooja & Rajesh Kumar",
      location: "Noida",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      testimonial: `The haldi ceremony footage was absolutely perfect! Every moment was captured with precision.\nWe're so grateful to have chosen WeddingDrones for our wedding photography needs.`,
      eventType: "Haldi Ceremony",
      date: "August 2024"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
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
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-4xl text-primary mb-4">
            What Our Couples Say
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Real testimonials from couples who trusted us to capture their special moments from above
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth"
            >
              {/* Rating Stars */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="mb-6">
                <p className="font-body text-foreground text-center leading-relaxed whitespace-pre-line">
                  "{testimonial.testimonial}"
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    {testimonial.eventType}
                  </span>
                  <span className="text-muted-foreground">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="font-body text-muted-foreground mb-6">
            Ready to create your own amazing wedding memories?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => window.location.href = '/user-registration'}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-smooth flex items-center space-x-2"
            >
              <Icon name="Calendar" size={20} />
              <span>Book Your Drone Photography</span>
            </button>
            <button
              onClick={() => window.location.href = '/homepage-drone-photography-booking'}
              className="text-primary border border-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/10 transition-smooth flex items-center space-x-2"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;