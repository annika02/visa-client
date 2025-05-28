import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth, getIdToken } from "firebase/auth";

const AddVisa = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "Tourist Visa",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      requiredDocuments: checked
        ? [...prevData.requiredDocuments, value]
        : prevData.requiredDocuments.filter((doc) => doc !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.countryImage) {
      toast.error("Please enter an image URL!");
      return;
    }

    const newVisa = { ...formData, createdBy: user.email };
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/visas`, // Changed from /add-visa to /visas
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newVisa),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add visa");
      toast.success("Visa added successfully!");
      navigate("/all-visas");
    } catch (error) {
      toast.error(`Error adding visa: ${error.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-br from-blue-100 to-white shadow-xl rounded-xl">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Add a New Visa
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "Country Image URL", name: "countryImage", type: "text" },
          { label: "Country Name", name: "countryName", type: "text" },
          { label: "Processing Time", name: "processingTime", type: "text" },
          { label: "Age Restriction", name: "ageRestriction", type: "number" },
          { label: "Fee (USD)", name: "fee", type: "number" },
          {
            label: "Validity (e.g., 6 months)",
            name: "validity",
            type: "text",
          },
          {
            label: "Application Method",
            name: "applicationMethod",
            type: "text",
          },
        ].map((input) => (
          <label key={input.name} className="block">
            <span className="text-lg font-semibold">{input.label}:</span>
            <input
              type={input.type}
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder={`Enter ${input.label.toLowerCase()}`}
            />
          </label>
        ))}

        <label className="block">
          <span className="text-lg font-semibold">Visa Type:</span>
          <select
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            {["Tourist Visa", "Student Visa", "Official Visa"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold mb-2">
            Required Documents:
          </legend>
          {[
            "Valid passport",
            "Visa application form",
            "Recent passport-sized photograph",
          ].map((doc) => (
            <label key={doc} className="block">
              <input
                type="checkbox"
                value={doc}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {doc}
            </label>
          ))}
        </fieldset>

        <label className="block">
          <span className="text-lg font-semibold">Description:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a description for the visa"
            rows="4"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white text-lg font-semibold p-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition"
        >
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default AddVisa;
