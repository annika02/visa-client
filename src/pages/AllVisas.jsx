import { useEffect, useState } from "react";

import VisaCard from "../components/VisaCard";
import LoadingSpinner from "../components/LoadingSpinner";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/all-visas")
      .then((res) => res.json())
      .then((data) => {
        setVisas(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">All Visas</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.map((visa) => (
          <VisaCard key={visa._id} visa={visa} />
        ))}
      </div>
    </div>
  );
};

export default AllVisas;
