import Blog from "../../Components/Blog/Blog";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import Banner from "../../Components/Home/Banner/Banner";
import Category from "../../Components/Home/Category/Category";
import HotOffer from "../../Components/HotOffer";
import OfferBanner from "../../Components/OfferBanner/OfferBanner";
import ProductOffer from "../../Components/ProductOffer";
import TopSaleProducts from "../../Components/TopSaleProducts/TopSaleProducts";
import TrendingProducts from "../../Components/TrendingProducts/TrendingProducts";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <Category />
      <FeaturedProducts />
      <HotOffer />
      <TrendingProducts />
      {/* OfferBanner */}
      <OfferBanner />
      {/* OfferBanner */}
      <TopSaleProducts />
      <ProductOffer />
      <Blog />
    </div>
  );
};

export default Home;
