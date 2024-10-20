import BackgroundImage from "../components/MainBackground";
import Cards from "../components/cards";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <BackgroundImage />
      <br />
      <br />
      <div>
        <h1 className="font-bold text-center text-4xl text-gray-600	mt-5">
          Browse The Range
        </h1>
        <div className="font-bold text-center text-md text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <Hero />
      </div>
      <h1 className="font-bold text-center text-5xl text-gray-700	">
        Our Products
      </h1>
      <Link to={"shop"}><Cards /></Link>
      <div>
        <div className="font-bold text-center text-md text-gray-400">
          Share Your setup with
        </div>
        <h1 className="font-bold text-center text-4xl text-gray-600	mb-5  ">
          #FurniroFurniture
        </h1>
        <Gallery />
      </div>
      <br />
      <Footer />
    </>
  );
}

export default Home;
