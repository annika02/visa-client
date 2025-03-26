import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// Loader function to fetch visa details
export const visaDetailsLoader = async ({ params }) => {
  try {
    const response = await fetch(`http://localhost:3000/visa/${params.id}`);
    if (!response.ok) throw new Error("Failed to load visa details");
    return response.json();
  } catch (error) {
    console.error("Error loading visa details:", error);
    throw error;
  }
};

const VisaDetails = () => {
  const visa = useLoaderData();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      toast.warning("You must be logged in to view visa details.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit visa application
  const handleApply = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      toast.error("Please fill in all fields.");
      return;
    }

    const applicationData = {
      email: user.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      appliedAt: new Date(),
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
      toast.error("Failed to submit visa application.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto border p-6 shadow-lg rounded-lg">
      <img
        src={visa.countryImage}
        alt={visa.countryName}
        className="w-full h-60 object-cover rounded-lg"
      />
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
        <strong>Application Method:</strong> {visa.applicationMethod}
      </p>
      <p>
        <strong>Description:</strong> {visa.description}
      </p>

      <button
        onClick={() => setShowApplyModal(true)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Apply for Visa
      </button>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
            <h2 className="text-2xl font-bold text-center mb-4">
              Apply for Visa
            </h2>

            <form onSubmit={handleApply} className="space-y-4">
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
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
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
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
