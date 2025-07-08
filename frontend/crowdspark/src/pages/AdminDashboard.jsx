import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/campaigns", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns(res.data.campaigns);
    };
    fetchCampaigns();
  }, []);

  const deleteCampaign = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns(campaigns.filter((c) => c._id !== id));
      alert("Campaign deleted successfully");
    } catch (err) {
      alert("Error deleting campaign");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear token
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-teal-800 text-white">
        <h1 className="text-lg md:text-xl font-semibold">
          Welcome to Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-white text-teal-800 px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </header>
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              {c.media?.data && (
                <img
                  src={`data:${c.media.contentType};base64,${c.media.data}`}
                  alt={c.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <div className="p-5">
                <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded mb-2">
                  {c.category}
                </span>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {c.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">{c.description}</p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong>Goal:</strong> ₹{c.fundingGoal}
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  <strong>Duration:</strong> {c.duration} days
                </p>
                <button
                  onClick={() => deleteCampaign(c._id)}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-lg font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
