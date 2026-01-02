import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Preloader from "./components/Preloader"; // ✅ Import the Preloader
import ScrollToTop from "./components/ScrollToTop";
import PlaceOrder from "./components/PlaceOrder";
import AuthPage from "./components/AuthPage";
import Footer from "./components/pages/Footer";
import Advantages from "./components/pages/Advantages";

// Pages
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import Profile from "./components/pages/Profile";
import FeaturedProducts from "./components/pages/FeaturedProducts";
import TopProducts from "./components/pages/TopProducts";
import AllProducts from "./components/pages/AllProducts";
import ProductDetails from "./components/pages/ProductDetails";
import HelpPage from "./components/pages/footer/HelpPage";
import PoliciesPage from "./components/pages/footer/PoliciesPage";
import AboutPage from "./components/pages/footer/AboutPage";
import GiftCard from "./components/pages/GiftCard";
import Wishlist from "./components/pages/Wishlist";

// Context
import { ProductProvider } from "./context/ProductContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appLoading, setAppLoading] = useState(true); // ✅ Loading state

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

// Inside App.js
useEffect(() => {
  // 1. Check if the user is currently on a Product Details page
  const isProductDetailsPage = window.location.pathname.startsWith("/product-details");

  if (isProductDetailsPage) {
    // 2. If it's the product page, disable the splash screen immediately
    setAppLoading(false);
  } else {
    // 3. For all other pages (Home, etc.), show the splash screen for 2 seconds
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
    <ProductProvider>
      <WishlistProvider>
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

            <Route path="/help" element={<HelpPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gift-cards" element={<GiftCard />} />

            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>

          <Advantages />
          <Footer />
        </BrowserRouter>
      </WishlistProvider>
    </ProductProvider>
  );
}

export default App;