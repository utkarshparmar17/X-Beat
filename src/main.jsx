import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProductProvider } from "./context/ProductContext";
import { WishlistProvider } from "./context/WishlistContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
    </WishlistProvider>
  </StrictMode>,
)
