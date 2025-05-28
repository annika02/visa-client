import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { Fade } from "react-awesome-reveal";
import { getAuth, getIdToken } from "firebase/auth";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      const fetchApplications = async () => {
        try {
          const auth = getAuth();
          const token = await getIdToken(auth.currentUser);
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/applications`, // Changed from /applications/:email to /applications
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          if (!res.ok)
            throw new Error(data.error || "Failed to fetch applications");
          // Filter applications by user's email client-side
          const userApplications = Array.isArray(data)
            ? data.filter((app) => app.email === user.email)
            : [];
          setApplications(userApplications);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching applications:", error);
          toast.error(`Error fetching applications: ${error.message}`);
          setApplications([]);
          setLoading(false);
        }
      };
      fetchApplications();
    }
  }, [user]);

  const handleCancel = async (id) => {
    try {
      const auth = getAuth();
      const token = await getIdToken(auth.currentUser);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/applications/${id}`, // Changed from /application/:id to /applications/:id
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to cancel application");
      toast.success("Application cancelled!");
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(`Error cancelling application: ${error.message}`);
    }
  };

  const filteredApplications = applications.filter((app) =>
    app?.countryName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto">
      <Fade>
        <h2 className="text-3xl font-bold text-center my-6">
          My Visa Applications
        </h2>
      </Fade>

      <Fade>
        <div className="text-center mb-4">
          <input
            type="text"
            placeholder="Search by Country Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full md:w-1/2"
          />
        </div>
      </Fade>

      {filteredApplications.length === 0 ? (
        <Fade>
          <p className="text-center">No applications found.</p>
        </Fade>
      ) : (
        <Fade cascade>
          <ul className="space-y-4">
            {filteredApplications.map((app) => (
              <li key={app._id} className="border p-4 shadow rounded-lg">
                <h3 className="text-xl font-bold">
                  {app?.countryName || "Unknown Country"}
                </h3>
                <p>
                  <strong>Visa Type:</strong> {app?.visaType || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {app?.status || "Pending"}
                </p>
                <p>
                  <strong>Applied Date:</strong>{" "}
                  {new Date(app?.appliedAt).toLocaleDateString() || "N/A"}
                </p>
                <button
                  onClick={() => handleCancel(app._id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </Fade>
      )}
    </div>
  );
};

export default MyApplications;
