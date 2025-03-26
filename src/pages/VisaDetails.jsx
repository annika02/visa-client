import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const VisaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Fetch Visa Data
  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const response = await fetch(`http://localhost:3000/visa/${id}`);
        if (!response.ok) throw new Error("Failed to load visa details");
        const data = await response.json();
        setVisa(data);
      } catch (error) {
        toast.error(error.message);
        navigate("/all-visas");
      } finally {
        setLoading(false);
      }
    };
    fetchVisa();
  }, [id, navigate]);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      toast.warning("Please log in to view visa details.");
      navigate("/login");
    }
  }, [user, navigate]);

  if (loading) {
    return <p className="text-center text-blue-500">Loading visa details...</p>;
  }

  if (!visa) {
    return <p className="text-center text-red-500">Visa details not found.</p>;
  }

  // Handle Visa Application
  const handleApply = async (e) => {
    e.preventDefault();
    const applicationData = {
      email: user.email,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      appliedAt: new Date().toISOString(),
      visaFee: visa.fee,
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:3000/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) throw new Error("Error submitting application");
      toast.success("Visa application submitted successfully!");
      setShowApplyModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <img
        src={visa.countryImage}
        alt={visa.countryName}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        {visa.countryName}
      </h2>
      <p className="text-lg mb-2">
        <strong>Visa Type:</strong> {visa.visaType}
      </p>
      <p className="text-lg mb-2">
        <strong>Processing Time:</strong> {visa.processingTime}
      </p>
      <p className="text-lg mb-2">
        <strong>Fee:</strong> ${visa.fee}
      </p>
      <p className="text-lg mb-2">
        <strong>Age Restriction:</strong> {visa.ageRestriction}+
      </p>
      <p className="text-lg mb-2">
        <strong>Validity:</strong> {visa.validity}
      </p>
      <p className="text-lg mb-4">
        <strong>Application Method:</strong> {visa.applicationMethod}
      </p>
      <p className="text-gray-700 mb-6">{visa.description}</p>

      <button
        onClick={() => setShowApplyModal(true)}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Apply for Visa
      </button>

      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Apply for {visa.countryName} Visa
            </h3>
            <form onSubmit={handleApply} className="space-y-4">
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
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
                type="text"
                value={`$${visa.fee}`}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
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
