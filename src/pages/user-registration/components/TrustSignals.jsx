import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: "Arjun & Kavya",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "WeddingDrones captured our special day beautifully from above!",
      rating: 5
    },
    {
      id: 2,
      name: "Rohit & Sneha",
      location: "Gurgaon",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Professional service and stunning aerial shots of our ceremony.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: "Shield",
      title: "Secure & Safe",
      description: "Your data is protected with industry-standard encryption"
    },
    {
      icon: "Users",
      title: "500+ Happy Couples",
      description: "Trusted by couples across Delhi NCR region"
    },
    {
      icon: "Award",
      title: "Professional Pilots",
      description: "Licensed and experienced drone operators"
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
    <div className="space-y-8">
      {/* Features */}
      <div className="grid grid-cols-1 gap-4">
        {features.map((feature) => (
          <div key={feature.title} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature.icon} size={20} color="white" />
            </div>
            <div>
              <h4 className="font-body font-semibold text-sm text-foreground mb-1">
                {feature.title}
              </h4>
              <p className="font-body text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Testimonials */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground text-center">
          What Couples Say
        </h3>
        <div className="space-y-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                {renderStars(testimonial.rating)}
              </div>
              <p className="font-body text-sm text-foreground text-center mb-3">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-body font-medium text-xs text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Badge */}
      <div className="text-center p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Lock" size={16} color="var(--color-success)" />
          <span className="font-body font-medium text-sm text-success">
            SSL Secured
          </span>
        </div>
        <p className="font-body text-xs text-muted-foreground">
          Your personal information is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;