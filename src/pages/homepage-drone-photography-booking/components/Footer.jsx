import React from 'react';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Our Drones', href: '/our-drones' },
      { label: 'The Weddings', href: '/the-weddings' },
      { label: 'Contact Us', href: '/contact-us' }
    ],
    services: [
      { label: 'Wedding Photography', href: '/services/wedding-photography' },
      { label: 'Pre-Wedding Shoots', href: '/services/pre-wedding' },
      { label: 'Reception Coverage', href: '/services/reception' },
      { label: 'Event Documentation', href: '/services/events' }
    ],
    support: [
      { label: 'Booking Support', href: '/support/booking' },
      { label: 'Technical Help', href: '/support/technical' },
      { label: 'Pricing Plans', href: '/pricing' },
      { label: 'FAQ', href: '/faq' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Sitemap', href: '/sitemap' },
      { label: 'Refund Policy', href: '/refund-policy' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com/weddingdrones' },
    { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com/weddingdrones' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/weddingdrones' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com/weddingdrones' },
    { name: 'LinkedIn', icon: 'Linkedin', href: 'https://linkedin.com/company/weddingdrones' }
  ];

  const contactInfo = [
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: 'Mail',
      label: 'Email',
      value: 'hello@weddingdrones.in',
      href: 'mailto:hello@weddingdrones.in'
    },
    {
      icon: 'MapPin',
      label: 'Address',
      value: 'Connaught Place, New Delhi, India',
      href: 'https://maps.google.com/?q=Connaught+Place+New+Delhi'
    }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Camera" size={24} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl text-background">
                    WeddingDrones
                  </span>
                  <span className="font-caption text-xs text-background/70 -mt-1">
                    Cinematic Memories
                  </span>
                </div>
              </div>
              
              <p className="font-body text-background/80 text-sm leading-relaxed mb-6">
                Capturing your special moments from breathtaking aerial perspectives. Professional drone photography services for weddings across Delhi NCR.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => handleLinkClick(social.href)}
                    className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-primary hover:scale-110"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon name={social.icon} size={18} color="currentColor" />
                  </button>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* Company Links */}
                <div>
                  <h3 className="font-heading font-semibold text-background mb-4">
                    Company
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          className="font-body text-background/70 text-sm transition-colors hover:text-primary"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services Links */}
                <div>
                  <h3 className="font-heading font-semibold text-background mb-4">
                    Services
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          className="font-body text-background/70 text-sm transition-colors hover:text-primary"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support Links */}
                <div>
                  <h3 className="font-heading font-semibold text-background mb-4">
                    Support
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          className="font-body text-background/70 text-sm transition-colors hover:text-primary"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-1">
              <h3 className="font-heading font-semibold text-background mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((contact) => (
                  <button
                    key={contact.label}
                    onClick={() => handleLinkClick(contact.href)}
                    className="flex items-start gap-3 text-left transition-colors hover:text-primary group"
                  >
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                      <Icon 
                        name={contact.icon} 
                        size={16} 
                        color="currentColor" 
                        className="group-hover:text-primary transition-colors"
                      />
                    </div>
                    <div>
                      <p className="font-body text-background/70 text-xs mb-1">
                        {contact.label}
                      </p>
                      <p className="font-body text-background text-sm">
                        {contact.value}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8">
                <h4 className="font-heading font-medium text-background mb-3">
                  Stay Updated
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-background/10 border border-background/20 rounded-lg text-background placeholder-background/50 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105">
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-background/70 text-sm">
              <span className="font-body">
                © {currentYear} WeddingDrones. All rights reserved.
              </span>
              <div className="flex gap-4">
                {footerLinks.legal.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href)}
                    className="font-body text-background/70 text-sm transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-background/70 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} />
                <span className="font-body">Secure & Trusted</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Award" size={16} />
                <span className="font-body">Certified Pilots</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;