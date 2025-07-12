import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (value.trim().length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters';
        } else {
          delete newErrors.fullName;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!value) {
          newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and number';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });

    // Check if terms are agreed
    if (!agreedToTerms || !agreedToPrivacy) {
      setErrors(prev => ({
        ...prev,
        terms: 'Please agree to Terms of Service and Privacy Policy'
      }));
      return;
    }

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const userData = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        registeredAt: new Date().toISOString()
      };

      // Store user data and auth status
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userToken', 'mock-jwt-token-' + Date.now());

      // Redirect to booking dashboard
      navigate('/booking-management-dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-elevation-2 p-6">
        <div className="text-center mb-6">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
            Create Your Account
          </h2>
          <p className="font-body text-muted-foreground">
            Join WeddingDrones to book your perfect aerial photography
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Enter your 10-digit mobile number"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
          />

          <div className="space-y-3">
            <Checkbox
              label={
                <span className="text-sm">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-primary hover:underline"
                  >
                    Terms of Service
                  </button>
                </span>
              }
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              required
            />

            <Checkbox
              label={
                <span className="text-sm">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </button>
                </span>
              }
              checked={agreedToPrivacy}
              onChange={(e) => setAgreedToPrivacy(e.target.checked)}
              required
            />
          </div>

          {errors.terms && (
            <p className="text-sm text-destructive">{errors.terms}</p>
          )}

          {errors.submit && (
            <p className="text-sm text-destructive">{errors.submit}</p>
          )}

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            className="mt-6"
          >
            Create Account
          </Button>
        </form>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-xl text-foreground">
                  Terms of Service
                </h3>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <div className="prose prose-sm max-w-none text-foreground">
                <p className="mb-4">
                  Welcome to WeddingDrones. By creating an account and using our services, you agree to the following terms:
                </p>
                <h4 className="font-semibold mb-2">1. Service Agreement</h4>
                <p className="mb-4">
                  WeddingDrones provides drone photography services for weddings and events. All bookings are subject to availability and weather conditions.
                </p>
                <h4 className="font-semibold mb-2">2. Booking and Payment</h4>
                <p className="mb-4">
                  A 30% advance payment is required to confirm your booking. Full payment must be completed 48 hours before the event date.
                </p>
                <h4 className="font-semibold mb-2">3. Cancellation Policy</h4>
                <p className="mb-4">
                  Cancellations made 7 days before the event will receive a full refund. Cancellations within 7 days are subject to a 50% cancellation fee.
                </p>
                <h4 className="font-semibold mb-2">4. Weather Conditions</h4>
                <p className="mb-4">
                  Drone operations are weather-dependent. In case of adverse weather, we will reschedule at no additional cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-xl text-foreground">
                  Privacy Policy
                </h3>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <div className="prose prose-sm max-w-none text-foreground">
                <p className="mb-4">
                  Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
                </p>
                <h4 className="font-semibold mb-2">Information We Collect</h4>
                <p className="mb-4">
                  We collect information you provide directly, such as your name, email, phone number, and event details when you create an account or make a booking.
                </p>
                <h4 className="font-semibold mb-2">How We Use Your Information</h4>
                <p className="mb-4">
                  Your information is used to process bookings, communicate about your events, send service updates, and improve our services.
                </p>
                <h4 className="font-semibold mb-2">Information Sharing</h4>
                <p className="mb-4">
                  We do not sell or share your personal information with third parties except as necessary to provide our services or as required by law.
                </p>
                <h4 className="font-semibold mb-2">Data Security</h4>
                <p className="mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;