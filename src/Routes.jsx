import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomepageDronePhotographyBooking from "pages/homepage-drone-photography-booking";
import UserRegistration from "pages/user-registration";
import BookingManagementDashboard from "pages/booking-management-dashboard";
import ServiceShowcaseGallery from "pages/service-showcase-gallery";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomepageDronePhotographyBooking />} />
        <Route path="/homepage-drone-photography-booking" element={<HomepageDronePhotographyBooking />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/booking-management-dashboard" element={<BookingManagementDashboard />} />
        <Route path="/service-showcase-gallery" element={<ServiceShowcaseGallery />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;