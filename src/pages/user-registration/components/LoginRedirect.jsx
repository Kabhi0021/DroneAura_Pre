import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginRedirect = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    // For now, redirect to homepage since login page is not specified
    // In a real app, this would go to a dedicated login page
    navigate('/homepage-drone-photography-booking');
  };

  return (
    <div className="w-full max-w-md mx-auto text-center mt-6">
      <div className="p-6 bg-muted rounded-lg">
        <p className="font-body text-muted-foreground mb-4">
          Already have an account?
        </p>
        <Button
          variant="outline"
          onClick={handleLoginRedirect}
          fullWidth
          className="font-medium"
        >
          Sign In to Your Account
        </Button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="font-body text-xs text-muted-foreground">
          By creating an account, you agree to our terms and conditions.
          <br />
          Need help? Contact us at{' '}
          <a 
            href="mailto:support@weddingdrones.com" 
            className="text-primary hover:underline"
          >
            support@weddingdrones.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginRedirect;