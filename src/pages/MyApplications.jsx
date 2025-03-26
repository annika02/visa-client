import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      if (user) {
        try {
          const res = await fetch(
            `http://localhost:3000/applications/${user.email}`
          );
          const data = await res.json();
          setApplications(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching applications:", error);
          toast.error("Failed to fetch applications.");
          setApplications([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchApplications();
  }, [user]);

  // Search Filter
  const filteredApplications = applications.filter((app) =>
    app?.countryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cancel Visa Application
  const handleCancel = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/application/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Application canceled successfully!");
        setApplications((prevApps) => prevApps.filter((app) => app._id !== id));
      } else {
        throw new Error("Failed to cancel application.");
      }
    } catch (error) {
      toast.error("Error canceling application.");
      console.error("Error canceling application:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">
        My Visa Applications
      </h2>

      {/* Search Bar */}
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search by Country Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      {filteredApplications.length === 0 ? (
        <p className="text-center">No applications found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredApplications.map((app) => (
            <li key={app._id} className="border p-4 shadow rounded-lg">
              {/* Country Image */}
              {app.countryImage && (
                <img
                  src={app.countryImage}
                  alt={app.countryName}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}

              {/* Visa Information */}
              <h3 className="text-xl font-bold mt-2">
                {app.countryName || "Unknown Country"}
              </h3>
              <p>
                <strong>Visa Type:</strong> {app.visaType || "N/A"}
              </p>
              <p>
                <strong>Processing Time:</strong> {app.processingTime || "N/A"}
              </p>
              <p>
                <strong>Fee:</strong> ${app.fee || "N/A"}
              </p>
              <p>
                <strong>Validity:</strong> {app.validity || "N/A"}
              </p>
              <p>
                <strong>Application Method:</strong>{" "}
                {app.applicationMethod || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {app.status}
              </p>
              <p>
                <strong>Applied Date:</strong>{" "}
                {new Date(app.appliedAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Applicant Name:</strong>{" "}
                {`${app.firstName || "N/A"} ${app.lastName || ""}`}
              </p>
              <p>
                <strong>Applicant Email:</strong> {app.email || "N/A"}
              </p>

              {/* Cancel Button */}
              {app.status === "Pending" && (
                <button
                  onClick={() => handleCancel(app._id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel Application
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplications;
