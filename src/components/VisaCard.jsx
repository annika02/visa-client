import { Link } from "react-router-dom";

const VisaCard = ({ visa }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <img
        src={visa.countryImage}
        alt={visa.countryName}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-xl font-bold my-2">{visa.countryName}</h3>
      <p className="text-sm text-gray-500">{visa.visaType}</p>
      <p className="text-sm text-gray-500">
        Processing Time: {visa.processingTime}
      </p>
      <p className="text-sm text-gray-500">Fee: ${visa.fee}</p>
      <Link
        to={`/visa/${visa._id}`}
        className="block mt-3 bg-blue-500 text-white py-1 text-center rounded"
      >
        See Details
      </Link>
    </div>
  );
};

export default VisaCard;
