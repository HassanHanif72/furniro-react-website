import React from 'react';
import Footer from '../components/Footer';
import backgroundImage from "../assets/pics/Rectangle 1.jpg";
import dp1 from "../assets/pics/Screenshot_20231012-145057.png";
import dp2 from "../assets/pics/Snapchat-1426864986.jpg";
import dp3 from "../assets/pics/PXL_20240907_133932748.PORTRAIT.jpg";



const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative text-center">
        <div className="relative">
          <img
            className="w-full h-[50vh] object-cover object-center"
            src={backgroundImage}
            alt="Scandinavian interior mockup wall decal background"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
            <h1 className="text-4xl font-bold">About</h1>
            <span className="text-lg mb-2">Home &gt; About</span>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
              A group of diverse talents, all working together to bring your vision to life.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Team Member 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <img className="mx-auto h-32 w-32 rounded-full object-cover" src={dp1} alt="Team Member 1" />
              <h3 className="mt-6 text-lg font-medium text-gray-900">Abdul Moiz</h3>
              <p className="mt-2 text-base text-gray-500">CEO,Founder & Developer</p>
              <p className="mt-4 text-sm text-gray-400">
                Passionate leader with over 10 years of experience in tech innovation.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <img className="mx-auto h-32 w-32 rounded-full object-cover" src={dp2} alt="Team Member 2" />
              <h3 className="mt-6 text-lg font-medium text-gray-900">Muhammad Anas</h3>
              <p className="mt-2 text-base text-gray-500"> Developer</p>
              <p className="mt-4 text-sm text-gray-400">
                Expert in full-stack development with a passion for scalable applications.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <img className="mx-auto h-32 w-32 rounded-full object-cover" src={dp3} alt="Team Member 3" />
              <h3 className="mt-6 text-lg font-medium text-gray-900">Muhammad Ahsan</h3>
              <p className="mt-2 text-base text-gray-500">Developer</p>
              <p className="mt-4 text-sm text-gray-400">
                Crafting intuitive designs that focus on user experience and engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default About;
