import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VisaCard from "../components/VisaCard";

const Home = () => {
  const [latestVisas, setLatestVisas] = useState([]);

  useEffect(() => {
    fetch("https://visa-navigator-server-sepia.vercel.app/latest-visas")
      .then((res) => res.json())
      .then((data) => setLatestVisas(data))
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Banner Section */}
      <div className="my-8">
        <Carousel
          className="w-full"
          showThumbs={false}
          autoPlay
          interval={3000}
          infiniteLoop
        >
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src="https://i.ibb.co.com/GGBBCQV/green-card-passports-top-view-23-2149828119.jpg"
              alt="Visa Banner 1"
            />
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src="https://i.ibb.co.com/C3JG0h0C/rwth-ab-mg-1868.jpg"
              alt="Visa Banner 2"
            />
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src="https://i.ibb.co.com/Sw1c7DwF/Travel-Visa-Xperts-jpg.webp"
              alt="Visa Banner 3"
            />
          </div>
        </Carousel>
      </div>

      {/* Latest Visas Section */}
      <h2 className="text-3xl font-bold text-center my-6">Latest Visas</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestVisas.map((visa) => (
          <VisaCard key={visa._id} visa={visa} />
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          to="/all-visas"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          See All Visas
        </Link>
      </div>

      {/* Our Benefits Section */}
      <div className="bg-gray-50 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Why Visa Navigator?
        </h2>
        <p className="text-lg text-gray-500 mb-12">
          Discover the key advantages of using Visa Navigator for your visa
          application process. We make it easy, fast, and reliable!
        </p>

        <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-6">
          {/* Benefit 1 */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a7 7 0 11-7 7 7 7 0 017-7zm0 1a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 11-4 4 4 4 0 014-4zm0 1a3 3 0 103 3 3 3 0 00-3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Fast Processing
            </h3>
            <p className="text-gray-600">
              We provide the quickest visa processing with streamlined steps
              that save your time.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 5a1 1 0 00-1 1v6.586l-2.707-2.707a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586V6a1 1 0 00-1-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Easy to Use
            </h3>
            <p className="text-gray-600">
              Our user-friendly interface ensures that applying for a visa is as
              simple as possible.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="bg-yellow-100 text-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 8a5 5 0 019.875-.688A5 5 0 0116 10a5 5 0 01-9.875.688A5 5 0 013 8zM10 3a7 7 0 107 7 7 7 0 00-7-7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Reliable Support
            </h3>
            <p className="text-gray-600">
              Our dedicated support team is here to assist you throughout your
              visa application journey.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-white py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Key Features of Visa Navigator
        </h2>
        <p className="text-lg text-gray-500 mb-12">
          Explore the powerful features that make Visa Navigator the best choice
          for your visa application process.
        </p>

        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-6">
          {/* Feature 1 */}
          <div className="bg-indigo-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2a1 1 0 00-1 1v6H8V3a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v5h-3V3a1 1 0 00-1-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              24/7 Availability
            </h3>
            <p className="text-gray-600">
              Our services are available round-the-clock, so you can apply for a
              visa anytime, anywhere.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-green-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 2a1 1 0 00-1 1v12a1 1 0 00-1 1H4a1 1 0 00-1 1v1h12v-1a1 1 0 00-1-1h-4a1 1 0 00-1-1V3a1 1 0 00-1-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Seamless Application
            </h3>
            <p className="text-gray-600">
              With a smooth application process, you can complete all the
              necessary steps in just a few minutes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-yellow-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM10 4a6 6 0 100 12 6 6 0 000-12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Complete Transparency
            </h3>
            <p className="text-gray-600">
              We ensure full transparency in the visa application process, so
              you know exactly what to expect.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-blue-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5 9V5a1 1 0 011-1h8a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 011 1v5a1 1 0 01-1 1h-3a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3a1 1 0 00-1-1H1a1 1 0 01-1-1v-5a1 1 0 011-1h3a1 1 0 001-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Secure & Safe
            </h3>
            <p className="text-gray-600">
              We prioritize your data security, ensuring that all personal
              information is encrypted and safely handled.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 6a1 1 0 011-1h10a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Global Reach
            </h3>
            <p className="text-gray-600">
              Visa Navigator serves customers across the world, providing global
              visa solutions for every destination.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-purple-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Customizable Plans
            </h3>
            <p className="text-gray-600">
              Choose from different plans that best suit your visa application
              needs, tailored to your specific requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
