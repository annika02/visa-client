import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { getAuth, getIdToken } from "firebase/auth";

const MyVisas = () => {
  const { user } = useAuth();
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVisa, setEditingVisa] = useState(null);
  const [formData, setFormData] = useState({
    countryName: "",
    visaType: "",
    processingTime: "",
    fee: "",
    validity: "",
    applicationMethod: "",
    countryImage: "",
  });

  useEffect(() => {
    if (user) {
      const fetchVisas = async () => {
        try {
          const auth = getAuth();
          const token = await getIdToken(auth.currentUser);
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/visas`, // Changed from /my-visas/:email to /visas
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to fetch visas");
          // Filter visas by user's email client-side
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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/visas/${id}`, // Matches backend
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete visa");
      toast.success("Visa deleted successfully!");
      setVisas(visas.filter((visa) => visa._id !== id));
    } catch (error) {
      toast.error(`Error deleting visa: ${error.message}`);
    }
  };

  const handleEditClick = (visa) => {
    setEditingVisa(visa._id);
    setFormData({ ...visa });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const auth = getAuth();
      const token = await getIdToken(auth.currentUser);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/visas/${editingVisa}`, // Matches backend but change method to PUT
        {
          method: "PUT", // Changed from PATCH to PUT to match backend
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update visa");
      toast.success("Visa updated successfully!");
      setVisas(
        visas.map((v) =>
          v._id === editingVisa ? { ...formData, _id: v._id } : v
        )
      );
      setEditingVisa(null);
    } catch (error) {
      toast.error(`Error updating visa: ${error.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">My Added Visas</h2>
      {visas.length === 0 ? (
        <p className="text-center text-gray-500">No visas added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visas.map((visa) => (
            <div key={visa._id} className="border rounded-lg shadow-md p-4">
              <img
                src={visa.countryImage}
                alt={visa.countryName}
                className="w-full h-40 object-cover rounded-lg"
              />
              {editingVisa === visa._id ? (
                <>
                  <input
                    type="text"
                    name="countryName"
                    value={formData.countryName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-2"
                  />
                  <input
                    type="text"
                    name="visaType"
                    value={formData.visaType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-2"
                  />
                  <input
                    type="text"
                    name="processingTime"
                    value={formData.processingTime}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-2"
                  />
                  <input
                    type="number"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-2"
                  />
                  <input
                    type="text"
                    name="validity"
                    value={formData.validity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-2"
                  />
                  <input
                    type="text"
                    name="applicationMethod"
                    value={formData.applicationMethod}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-2"
                  />
                  <input
                    type="text"
                    name="countryImage"
                    value={formData.countryImage}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-2"
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingVisa(null)}
                      className="bg-gray-500 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold my-2">{visa.countryName}</h3>
                  <p className="text-sm text-gray-600">{visa.visaType}</p>
                  <p className="text-sm text-gray-600">
                    Processing Time: {visa.processingTime}
                  </p>
                  <p className="text-sm text-gray-600">Fee: ${visa.fee}</p>
                  <p className="text-sm text-gray-600">
                    Validity: {visa.validity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Application Method: {visa.applicationMethod}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEditClick(visa)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(visa._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVisas;
