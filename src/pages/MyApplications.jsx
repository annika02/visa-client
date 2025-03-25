import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/applications/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setApplications(data);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching applications:", error));
    }
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">
        My Visa Applications
      </h2>
      {applications.length === 0 ? (
        <p className="text-center">No applications found.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app._id} className="border p-4 shadow rounded-lg">
              <h3 className="text-xl font-bold">{app.countryName}</h3>
              <p>
                <strong>Visa Type:</strong> {app.visaType}
              </p>
              <p>
                <strong>Status:</strong> {app.status}
              </p>
              <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplications;
