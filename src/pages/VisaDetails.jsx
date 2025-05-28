import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { getAuth, getIdToken } from "firebase/auth";

const VisaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [visa, setVisa] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.warning("You must be logged in to view visa details.");
      navigate("/login");
      return;
    }

    const fetchVisa = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/visas/${id}` // Changed from /visa/:id to /visas/:id
        );
        if (!res.ok) {
          throw new Error(`Failed to load visa details: ${res.statusText}`);
        }
        const data = await res.json();
        if (!data) throw new Error("Invalid visa data received");
        setVisa(data);
      } catch (error) {
        console.error("Fetch Visa Error:", error);
        toast.error(`Error fetching visa details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVisa();
  }, [id, user, navigate]);

  const handleApply = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser);
    const applicationData = {
      email: user.email,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      appliedAt: new Date(),
      countryName: visa.countryName,
      visaType: visa.visaType,
      visaFee: visa.fee,
      status: "Pending",
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/applications`, // Changed from /apply to /applications
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(applicationData),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || result.message || "Application failed");
      }
      toast.success("Visa application submitted!");
      setShowApplyModal(false);
    } catch (error) {
      console.error("Apply Error:", error);
      toast.error(`Failed to apply: ${error.message}`);
    }
  };

  if (loading)
    return <p className="text-center text-red-500">Loading visa details...</p>;
  if (!visa)
    return <p className="text-center text-red-500">Visa details not found.</p>;

  return (
    <div className="max-w-2xl mx-auto border p-6 shadow-lg rounded-lg mt-8">
      {visa.countryImage && (
        <img
          src={visa.countryImage}
          alt={visa.countryName}
          className="w-full h-60 object-cover rounded-lg"
        />
      )}
      <h2 className="text-3xl font-bold my-4">{visa.countryName}</h2>
      <p>
        <strong>Visa Type:</strong> {visa.visaType}
      </p>
      <p>
        <strong>Processing Time:</strong> {visa.processingTime}
      </p>
      <p>
        <strong>Fee:</strong> ${visa.fee}
      </p>
      <p>
        <strong>Validity:</strong> {visa.validity}
      </p>
      <p>
        <strong>Description:</strong> {visa.description}
      </p>
      <button
        onClick={() => setShowApplyModal(true)}
        className="mt-4 btn bg-white text-blue-500 px-4 py-1 rounded"
      >
        Apply for Visa
      </button>
      {showApplyModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
              Apply for Visa
            </h2>
            <form onSubmit={handleApply} className="space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={`$${visa.fee}`}
                readOnly
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
