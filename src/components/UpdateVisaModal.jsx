import { useState, useEffect } from "react";

const UpdateVisaModal = ({ visa, onUpdate, onClose }) => {
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
    setFormData({
      countryName: visa.countryName || "",
      visaType: visa.visaType || "",
      processingTime: visa.processingTime || "",
      fee: visa.fee || "",
      validity: visa.validity || "",
      applicationMethod: visa.applicationMethod || "",
      countryImage: visa.countryImage || "",
    });
  }, [visa]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/visas/${visa._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      onUpdate(visa._id, formData);
      onClose();
    } catch (error) {
      alert("Error updating visa: " + error.message);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative z-60 space-y-4"
          onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner clicks
        >
          <h2
            id="modal-title"
            className="text-2xl font-bold text-indigo-700 mb-4 text-center"
          >
            Update Visa Details
          </h2>

          {/* Form Fields */}
          {[
            { label: "Country Name", name: "countryName", type: "text" },
            { label: "Visa Type", name: "visaType", type: "text" },
            { label: "Processing Time", name: "processingTime", type: "text" },
            { label: "Fee", name: "fee", type: "number" },
            { label: "Validity", name: "validity", type: "text" },
            {
              label: "Application Method",
              name: "applicationMethod",
              type: "text",
            },
            { label: "Country Image URL", name: "countryImage", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="mb-1 font-semibold text-gray-700"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-md font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-semibold transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateVisaModal;
