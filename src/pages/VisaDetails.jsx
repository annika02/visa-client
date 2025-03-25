import { useLoaderData } from "react-router-dom";

export const visaDetailsLoader = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/visa/${params.id}`);
  return response.json();
};

const handleApply = () => {
  const applicationData = {
    email: user.email,
    countryName: visa.countryName,
    visaType: visa.visaType,
    appliedAt: new Date(),
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
    })
    .catch(() => toast.error("Error submitting application"));
};

const VisaDetails = () => {
  const visa = useLoaderData();

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
        <strong>Description:</strong> {visa.description}
      </p>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Apply for Visa
      </button>
    </div>
  );
};

export default VisaDetails;
