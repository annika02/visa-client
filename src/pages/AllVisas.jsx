import { useEffect, useState } from "react";
import VisaCard from "../components/VisaCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/visas`);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Expected JSON, got: ${text}`);
        }

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to fetch visas");
        }

        setVisas(data);
        setFilteredVisas(data);
      } catch (error) {
        console.error("Error fetching visas:", error);
        toast.error(`Error loading visas: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVisas();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredVisas(visas);
    } else {
      setFilteredVisas(visas.filter((visa) => visa.visaType === filter));
    }
  }, [filter, visas]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center my-6">All Visas</h2>
      <div className="text-center mb-6">
        <label htmlFor="visa-filter" className="mr-4 font-bold text-gray-700">
          Filter by Visa Type:
        </label>
        <select
          id="visa-filter"
          className="p-2 border rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Tourist Visa">Tourist Visa</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Official Visa">Official Visa</option>
        </select>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVisas.length > 0 ? (
          filteredVisas.map((visa) => <VisaCard key={visa._id} visa={visa} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No visas found for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllVisas;
