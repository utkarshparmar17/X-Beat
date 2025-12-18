import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Cart from './components/pages/Cart';
import Profile from './components/pages/Profile';
import FeaturedProducts from './components/pages/FeaturedProducts.jsx';
import TopProducts from './components/pages/TopProducts.jsx';
import AllProducts from './components/pages/AllProducts.jsx';
import ProductDetails from './components/pages/ProductDetails.jsx';
import Footer from './components/pages/Footer.jsx';
import Advantages from './components/pages/Advantages.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { ProductProvider } from './context/ProductContext'; // Import the provider
import PlaceOrder from './components/PlaceOrder.jsx';
import AuthPage from './components/AuthPage.jsx';

function App() {
        return (
                /* 1. Wrap the entire app in the ProductProvider to share Cart and Search state */
                <ProductProvider>
                        <BrowserRouter>
                                <ScrollToTop />
                                <Navbar />
                                <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/search" element={<Search />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/profile" element={<Profile />} />

                                        <Route path="/top-deals" element={<TopProducts />} />
                                        <Route path="/all-products" element={<AllProducts />} />
                                        <Route path="/featured-products" element={<FeaturedProducts />} />

                                        {/* Using a single consistent dynamic route for product details */}
                                        <Route path="/product-details/:productId" element={<ProductDetails />} />
                                        <Route path="/place-order" element={<PlaceOrder />} />

                                        <Route path="/login" element={<AuthPage />} />
                                        <Route path="/signup" element={<AuthPage />} />
                                        


                                </Routes>
                                <Advantages />
                                <Footer />
                        </BrowserRouter>
                </ProductProvider>
        );
}

export default App;