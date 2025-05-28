import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const VisaDetails = () => {
  const { id } = useParams();
  // console.log("Visa ID:", id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [visa, setVisa] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      toast.warning("You must be logged in to view visa details.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch visa details
  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const response = await fetch(`http://localhost:3000/visa/${id}`);
        // console.log("Response:", response);
        if (!response.ok) throw new Error("Failed to load visa details");
        const data = await response.json();
        // console.log("Data:", data);
        setVisa(data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching visa details");
      } finally {
        setLoading(false);
      }
    };
    fetchVisa();
  }, [id]);

  if (loading) {
    return <p className="text-center text-red-500">Loading visa details...</p>;
  }

  if (!visa) {
    return <p className="text-center text-red-500">Visa details not found.</p>;
  }

  const handleApply = (e) => {
    e.preventDefault();
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

    fetch("http://localhost:3000/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Visa application submitted!");
        setShowApplyModal(false);
      })
      .catch(() => toast.error("Error submitting application"));
  };

  return (
    <div className="max-w-2xl mx-auto border p-6 shadow-lg rounded-lg mt-8">
      {/* Visa Details */}
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
        <strong>Validity:</strong> {visa.validity} months
      </p>
      <p>
        <strong>Description:</strong> {visa.description}
      </p>

      {/* Apply for Visa Button */}
      <button
        onClick={() => setShowApplyModal(true)}
        className="mt-4 btn bg-white text-blue-500 px-4 py-1 rounded"
      >
        Apply for Visa
      </button>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
              Apply for Visa
            </h2>
            <form onSubmit={handleApply} className="space-y-4">
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="w-full border p-2 rounded"
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
