import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns");
        setCampaigns(res.data.campaigns);
      } catch (err) {
        console.error("Error fetching campaigns: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <>
      <section className="campaigns-part bg-teal-800 text-white py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Discover Campaigns<br />that Need Your Support
        </h1>
        <p className="text-lg text-teal-100">
          Browse active projects and help make them a reality.
        </p>
      </section>
      <div className="bg-gray-50 py-4 flex flex-col md:flex-row gap-4 justify-center items-center shadow-sm">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Campaigns..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <select
          className="w-full md:w-auto border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          defaultValue="newest"
        >
          <option value="newest">Sort by: Newest</option>
          <option value="ending-soon">Ending Soon</option>
          <option value="most-funded">Most Funded</option>
        </select>
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full">Loading campaigns...</p>
        ) : !Array.isArray(campaigns) || campaigns.length === 0 ? (
          <p className="text-center col-span-full">No campaigns found...</p>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
            >
              {campaign.media?.data && (
                <img
                  src={`data:${campaign.media.contentType};base64,${campaign.media.data}`}
                  alt={campaign.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded mb-2">
                  {campaign.category}
                </span>
                <h2 className="text-lg font-semibold">{campaign.title}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {campaign.description}
                </p>
                <div className="flex justify-between text-sm mb-2">
                  <span>Goal: ₹{campaign.fundingGoal}</span>
                  <span>Raised: ₹0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-teal-600 h-2 rounded-full"
                    style={{
                      width: `0%`,
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-teal-700 text-white py-2 rounded hover:bg-teal-800">
                    Donate Now
                  </button>
                  <button className="flex-1 border border-teal-700 text-teal-700 py-2 rounded hover:bg-teal-50">
                    Contact Organizer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Campaign;
