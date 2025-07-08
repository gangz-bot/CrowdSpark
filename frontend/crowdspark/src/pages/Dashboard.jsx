import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [stats, setStats] = useState({
    totalDonations: 0,
    withdrawable: 0,
    views: 0,
    daysLeft: 0
  });
  const [recentDonations, setRecentDonations] = useState([]);
  const [donationsOverTime, setDonationsOverTime] = useState([]); // NEW state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        console.log("No logged-in user found.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/campaigns/user", {
          params: { userId: storedUser.id }
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

  useEffect(() => {
    const fetchStatsAndDonations = async () => {
      if (!selectedCampaignId) return;

      try {
        const statsRes = await axios.get(`http://localhost:5000/api/campaigns/${selectedCampaignId}/stats`);
        setStats(statsRes.data);

        const donationsRes = await axios.get(`http://localhost:5000/api/payments/recent/${selectedCampaignId}`);
        setRecentDonations(donationsRes.data.recentDonations || []);

        const overTimeRes = await axios.get(`http://localhost:5000/api/campaigns/${selectedCampaignId}/donations-over-time`);
        setDonationsOverTime(overTimeRes.data.donationsOverTime || []);
      } catch (err) {
        console.error("Error fetching stats, donations or chart data:", err);
      }
    };

    fetchStatsAndDonations();
  }, [selectedCampaignId]);

  return (
    <div className="min-h-screen bg-[#0E0F1A] text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {loading ? (
        <p className="text-gray-400">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-400">No campaigns found.</p>
      ) : (
        <>
          {/* Select Campaign */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-gray-300">Select Campaign:</label>
            <select
              className="bg-[#1C1E2A] border border-gray-600 text-white rounded px-4 py-2"
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
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </select>
          </div>

          {/* Stats */}
          {selectedCampaign && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#1C1E2A] p-6 rounded-xl shadow text-center">
                <div className="text-sm text-gray-400">Total Donations</div>
                <div className="text-2xl font-bold mt-2">₹{stats.totalDonations || 0}</div>
              </div>
              <div className="bg-[#1C1E2A] p-6 rounded-xl shadow text-center">
                <div className="text-sm text-gray-400">Views</div>
                <div className="text-2xl font-bold mt-2">{stats.views || 0}</div>
              </div>
              <div className="bg-[#1C1E2A] p-6 rounded-xl shadow text-center">
                <div className="text-sm text-gray-400">Withdrawable</div>
                <div className="text-2xl font-bold mt-2">₹{stats.withdrawable || 0}</div>
              </div>
              <div className="bg-[#1C1E2A] p-6 rounded-xl shadow text-center">
                <div className="text-sm text-gray-400">Days Left</div>
                <div className="text-2xl font-bold mt-2">{stats.daysLeft || 0}</div>
              </div>
            </div>
          )}

          {/* Recent Donations & Chart */}
          {selectedCampaign && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Recent Donations */}
              <div className="bg-[#1C1E2A] p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold text-white mb-4">Recent Donations</h2>
                <table className="w-full text-sm text-left text-gray-300">
                  <thead>
                    <tr className="text-gray-400">
                      <th className="py-2">Date</th>
                      <th className="py-2">Campaign</th>
                      <th className="py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonations.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="py-2 text-center">No donations yet</td>
                      </tr>
                    ) : recentDonations.map((donation, idx) => (
                      <tr key={idx}>
                        <td className="py-2">{new Date(donation.createdAt).toLocaleDateString()}</td>
                        <td className="py-2">{selectedCampaign.title}</td>
                        <td className="py-2">₹{donation.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Donations Over Time Chart */}
              <div className="bg-[#1C1E2A] p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Donations Over Time</h2>
                {donationsOverTime.length === 0 ? (
                  <p className="text-gray-400">No donations yet.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={donationsOverTime} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: 'white' }}
                      />
                      <YAxis 
                        tick={{ fill: 'white' }}
                      />
                      <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#4ade80" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#4ade80' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

