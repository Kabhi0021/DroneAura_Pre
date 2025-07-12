import React from 'react';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import TrustSignals from './components/TrustSignals';
import LoginRedirect from './components/LoginRedirect';

const UserRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Registration Form */}
            <div className="order-2 lg:order-1">
              <RegistrationForm />
              <SocialRegistration />
              <LoginRedirect />
            </div>

            {/* Right Column - Trust Signals (Desktop Only) */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <div className="lg:pl-8">
                <div className="text-center lg:text-left mb-8">
                  <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
                    Join <span className="text-primary">WeddingDrones</span>
                  </h1>
                  <p className="font-body text-lg text-muted-foreground">
                    Create your account to book professional drone photography services for your special day. Capture breathtaking aerial views of your wedding celebration.
                  </p>
                </div>
                
                <div className="hidden lg:block">
                  <TrustSignals />
                </div>
                
                {/* Mobile Trust Signals */}
                <div className="lg:hidden">
                  <div className="grid grid-cols-3 gap-4 text-center py-6">
                    <div>
                      <div className="font-heading font-bold text-2xl text-primary mb-1">500+</div>
                      <div className="font-body text-sm text-muted-foreground">Happy Couples</div>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-2xl text-primary mb-1">100%</div>
                      <div className="font-body text-sm text-muted-foreground">Secure</div>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-2xl text-primary mb-1">24/7</div>
                      <div className="font-body text-sm text-muted-foreground">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary opacity-5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default UserRegistration;