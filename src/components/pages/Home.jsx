//  import HeroSection from "../Herosection"
import HeroSection from "../Herosection"
import FeaturedProducts from "./FeaturedProducts"
import TopProducts from "./TopProducts"

function Home() {
  return (
    // No max-width here to allow the HeroSection to be full page
    <div className="mx-auto"> 
      
      <HeroSection />
      <FeaturedProducts />
      <TopProducts/>
      

      {/* Other content is constrained by a max-width container */}
      <div className="max-w-7xl mx-auto p- md:p-0">
        <div></div>
        {/* ... Other content here ... */}
      </div>
      
    </div>
  )
}

export default Home