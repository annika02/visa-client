import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VisaCard from "../components/VisaCard";

const Home = () => {
  const [latestVisas, setLatestVisas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/latest-visas")
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
              src="https://via.placeholder.com/1200x600?text=Visa+Banner+1"
              alt="Visa Banner 1"
            />
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src="https://via.placeholder.com/1200x600?text=Visa+Banner+2"
              alt="Visa Banner 2"
            />
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src="https://via.placeholder.com/1200x600?text=Visa+Banner+3"
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

      {/* Why Choose Us Section */}
      <div className="my-12 text-center">
        <h2 className="text-2xl font-bold">Why Choose Us?</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          We offer the fastest and most reliable visa processing services
          worldwide.
        </p>
      </div>

      {/* User Testimonials Section */}
      <div className="my-12 text-center">
        <h2 className="text-2xl font-bold">User Testimonials</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Hear from our satisfied customers who successfully got their visas
          through us.
        </p>
      </div>
    </div>
  );
};

export default Home;
