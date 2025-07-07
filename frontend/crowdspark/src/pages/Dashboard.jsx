import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        console.log("No logged-in user found.");
        setLoading(false);
        return;
      }

      console.log("User ID:", storedUser?.id);

      try {
        const res = await axios.get("http://localhost:5000/api/campaigns/user", {
          params: { userId: storedUser.id },
        });
        setCampaigns(res.data.campaigns);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading ? (
        <p>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <>
          {/* Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Select Campaign:</label>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={selectedCampaignId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedCampaignId(id);
                const found = campaigns.find((c) => c._id === id);
                setSelectedCampaign(found || null);
              }}
            >
              <option value="">-- Choose a campaign --</option>
              {campaigns.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {selectedCampaign && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white border rounded p-4 text-center">
                <div className="text-sm text-gray-500">Total Donations</div>
                <div className="text-xl font-semibold">₹0</div>
              </div>
              <div className="bg-white border rounded p-4 text-center">
                <div className="text-sm text-gray-500">Views</div>
                <div className="text-xl font-semibold">0</div>
              </div>
              <div className="bg-white border rounded p-4 text-center">
                <div className="text-sm text-gray-500">Withdrawable</div>
                <div className="text-xl font-semibold">₹0</div>
              </div>
              <div className="bg-white border rounded p-4 text-center">
                <div className="text-sm text-gray-500">Followers</div>
                <div className="text-xl font-semibold">0</div>
              </div>
            </div>
          )}

          {selectedCampaign && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded p-4">
                <h2 className="text-lg font-semibold mb-2">Recent Donations</h2>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-1">Date</th>
                      <th className="text-left py-1">Donor</th>
                      <th className="text-left py-1">Campaign</th>
                      <th className="text-left py-1">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">--</td>
                      <td className="py-1">--</td>
                      <td className="py-1">{selectedCampaign.title}</td>
                      <td className="py-1">--</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white border rounded p-4">
                <h2 className="text-lg font-semibold mb-2">Donations Over Time</h2>
                <div className="w-full h-40 flex items-center justify-center text-gray-400">
                  (Chart Placeholder)
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

