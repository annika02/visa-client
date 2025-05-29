import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { getAuth, getIdToken } from "firebase/auth";
import UpdateVisaModal from "../components/UpdateVisaModal";

const MyVisas = () => {
  const { user } = useAuth();
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVisa, setEditingVisa] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchVisas = async () => {
        try {
          const auth = getAuth();
          const token = await getIdToken(auth.currentUser);
          const res = await fetch(`${import.meta.env.VITE_API_URL}/visas`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to fetch visas");
          const userVisas = data.filter(
            (visa) => visa.createdBy === user.email
          );
          setVisas(userVisas);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching visas:", error);
          toast.error(`Failed to fetch visas: ${error.message}`);
          setLoading(false);
        }
      };
      fetchVisas();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this visa?")) return;

    try {
      const auth = getAuth();
      const token = await getIdToken(auth.currentUser);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/visas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete visa");
      toast.success("Visa deleted successfully!");
      setVisas(visas.filter((visa) => visa._id !== id));
    } catch (error) {
      toast.error(`Error deleting visa: ${error.message}`);
    }
  };

  const handleVisaUpdate = (id, updatedVisa) => {
    setVisas((prevVisas) =>
      prevVisas.map((visa) =>
        visa._id === id ? { ...visa, ...updatedVisa } : visa
      )
    );
    setEditingVisa(null);
    toast.success("Visa updated successfully!");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">
        My Added Visas
      </h2>
      {visas.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No visas added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((visa) => (
            <div
              key={visa._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={visa.countryImage}
                alt={visa.countryName}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {visa.countryName}
                </h3>
                <p className="text-sm text-indigo-600 font-medium mb-1">
                  {visa.visaType}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Processing Time:</span>{" "}
                  {visa.processingTime}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Fee:</span> ${visa.fee}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Validity:</span>{" "}
                  {visa.validity}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <span className="font-semibold">Application Method:</span>{" "}
                  {visa.applicationMethod}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingVisa(visa)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md shadow-md transition"
                    aria-label={`Update visa for ${visa.countryName}`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(visa._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md shadow-md transition"
                    aria-label={`Delete visa for ${visa.countryName}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingVisa && (
        <UpdateVisaModal
          visa={editingVisa}
          onUpdate={handleVisaUpdate}
          onClose={() => setEditingVisa(null)}
        />
      )}
    </div>
  );
};

export default MyVisas;
