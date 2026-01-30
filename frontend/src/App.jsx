import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Preloader from "./components/common/PreLoader";
import ScrollToTop from "./components/common/ScrollToTop";
import Footer from "./components/layout/Footer";
import Advantages from "./components/product/Advantages";

// Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import FeaturedProducts from "./pages/FeaturedProducts";
import TopProducts from "./pages/TopProducts";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import PlaceOrder from "./pages/PlaceOrder";
import AuthPage from "./pages/AuthPage";
import GiftCard from "./pages/GiftCard";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";

// Help Pages
import FAQs from "./pages/footer/FAQs";
import TrackOrder from "./pages/footer/TrackOrder";
import CancelOrder from "./pages/footer/CancelOrder";
import ReturnOrder from "./pages/footer/ReturnOrder";
import WarrantyInfo from "./pages/footer/WarrantyInfo";

// Policy Pages
import ReturnPolicy from "./pages/footer/ReturnPolicy";
import Security from "./pages/footer/Security";
import Sitemap from "./pages/footer/Sitemap";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import TermsConditions from "./pages/footer/TermsConditions";

// Company Pages
import AboutUs from "./pages/footer/AboutUs";
import ContactUs from "./pages/footer/ContactUs";
import ServiceCentres from "./pages/footer/ServiceCentres";
import Careers from "./pages/footer/Careers";
import Affiliates from "./pages/footer/Affiliates";

// Context
// Context
// (Removed Context Providers)

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const isProductDetailsPage = window.location.pathname.startsWith("/product-details");

    if (isProductDetailsPage) {
      setAppLoading(false);
    } else {
      const timer = setTimeout(() => {
        setAppLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (appLoading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/top-deals" element={<TopProducts />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/featured-products" element={<FeaturedProducts />} />

        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
        <Route path="/place-order" element={<PlaceOrder />} />

        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Help Routes */}
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/cancel-order" element={<CancelOrder />} />
        <Route path="/return-order" element={<ReturnOrder />} />
        <Route path="/warranty-info" element={<WarrantyInfo />} />

        {/* Policy Routes */}
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/security" element={<Security />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

        {/* Company Routes */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/service-centers" element={<ServiceCentres />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/affiliates" element={<Affiliates />} />

        <Route path="/gift-cards" element={<GiftCard />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Fallback for Help/Policies/About generic paths if still needed, or remove if fully replaced */}
        {/* Keeping references to specific pages to avoid breaks if old links exist */}
      </Routes>

      <Advantages />
      <Footer />
    </BrowserRouter>
  );
}

export default App;