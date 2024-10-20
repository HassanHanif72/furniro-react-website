import Benefits from "../components/Benefit";
import Footer from "../components/Footer";
import backgroundImage from "../assets/pics/Rectangle 1.jpg";
import Productvip from "../components/Products";
import Filter from "../components/Filter";

function Shop() {
 

  return (
    <div>
      <div className="relative text-center">
        <div className="relative">
          <img
            className="w-full h-[50vh] object-cover object-center"
            src={backgroundImage}
            alt="Scandinavian interior mockup wall decal background"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
            <h1 className="text-4xl font-bold">Shop</h1>
            <span className="text-lg mb-2">Home &gt; Shop</span>
          </div>
        </div>
      </div>

      <Filter/>
      <Productvip />
      <Benefits/> 
      <Footer/>
    </div>
  );
}

export default Shop;