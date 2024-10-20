import image1  from '../assets/pics/image 106.png';
import image2  from '../assets/pics/image 100.png';
import image3  from '../assets/pics/image 101.png';


function Hero() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
        </div>  
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden" style={{ height: 500 }}>
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={image1}
              />
            </div>
            <h2 className="text-4xl text-center font-medium title-font text-gray-900 mt-5">
              Dining
            </h2>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden" style={{ height: 500 }}>
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={image2}
              />
            </div>
            <h2 className="text-4xl text-center font-medium title-font text-gray-900 mt-5">
              Living
            </h2>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden" style={{ height: 500 }}>
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={image3}
              />
            </div>
            <h2 className="text-4xl text-center font-medium title-font text-gray-900 mt-5">
              Bedroom
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Hero;