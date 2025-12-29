import React, { useState } from 'react'; // 1. Added useState
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; // 2. Ensure Sidebar is imported
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import Profile from './components/pages/Profile';
import FeaturedProducts from './components/pages/FeaturedProducts.jsx';
import TopProducts from './components/pages/TopProducts.jsx';
import AllProducts from './components/pages/AllProducts.jsx';
import ProductDetails from './components/pages/ProductDetails.jsx';
import Footer from './components/pages/Footer.jsx';
import Advantages from './components/pages/Advantages.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { ProductProvider } from './context/ProductContext';
import PlaceOrder from './components/PlaceOrder.jsx';
import AuthPage from './components/AuthPage.jsx';
import HelpPage from './components/pages/footer/HelpPage.jsx';
import PoliciesPage from './components/pages/footer/PoliciesPage.jsx';
import AboutPage from './components/pages/footer/AboutPage.jsx';
import GiftCard from './components/pages/GiftCard.jsx';

function App() {
    // 3. Add Sidebar State Logic
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (

        <ProductProvider>
            <BrowserRouter>
                <ScrollToTop />


                {/* 4. Pass toggleSidebar to Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                {/* 5. Add the Sidebar component here */}
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="/top-deals" element={<TopProducts />} />
                    <Route path="/all-products" element={<AllProducts />} />
                    <Route path="/featured-products" element={<FeaturedProducts />} />

                    <Route path="/product-details/:productId" element={<ProductDetails />} />
                    <Route path="/place-order" element={<PlaceOrder />} />

                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/signup" element={<AuthPage />} />

                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/policies" element={<PoliciesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                     <Route path="/gift-cards" element={<GiftCard />} />
                </Routes>

                <Advantages />
                <Footer />
            </BrowserRouter>
        </ProductProvider>
    );
}

export default App;