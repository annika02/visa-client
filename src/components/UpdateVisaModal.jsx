import { useState } from "react";
import { toast } from "react-toastify";

const UpdateVisaModal = ({ visa, closeModal, setVisas, visas }) => {
  const [formData, setFormData] = useState({ ...visa });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/visa/${visa._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Visa updated successfully!");
        setVisas(visas.map((v) => (v._id === visa._id ? formData : v)));
        closeModal();
      })
      .catch(() => toast.error("Error updating visa"));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Update Visa</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <label className="block">
            Country Name:
            <input
              type="text"
              name="countryName"
              value={formData.countryName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block">
            Visa Type:
            <select
              name="visaType"
              value={formData.visaType}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option>Tourist Visa</option>
              <option>Student Visa</option>
              <option>Official Visa</option>
            </select>
          </label>

          <label className="block">
            Processing Time:
            <input
              type="text"
              name="processingTime"
              value={formData.processingTime}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block">
            Fee:
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block">
            Validity:
            <input
              type="text"
              name="validity"
              value={formData.validity}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </label>

          <label className="block">
            Application Method:
            <input
              type="text"
              name="applicationMethod"
              value={formData.applicationMethod}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </label>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVisaModal;
