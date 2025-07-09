// import React, { useEffect, useState } from "react";
// import { FiSearch } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Campaign = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('newest');

//   useEffect(() => {
//   const fetchCampaigns = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/campaigns", {
//         params: {
//           search: search, // pass search to backend
//             sort: sort, 
//         },
//       });
//       setCampaigns(res.data.campaigns);
//     } catch (err) {
//       console.error("Error fetching campaigns: ", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debounce = setTimeout(() => {
//     fetchCampaigns();
//   }, 500); // delay to avoid API spam while typing

//   return () => clearTimeout(debounce);
// }, [search, sort])


//   return (
//     <>
//       <section className="campaigns-part bg-teal-800 text-white py-16 text-center">
//         <h1 className="text-3xl md:text-4xl font-bold mb-4">
//           Discover Campaigns
//           <br />
//           that Need Your Support
//         </h1>
//         <p className="text-lg text-teal-100">
//           Browse active projects and help make them a reality.
//         </p>
//       </section>
//       <div className="bg-gray-50 py-4 flex flex-col md:flex-row gap-4 justify-center items-center shadow-sm">
//         <div className="relative w-full md:w-1/3">
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search Campaigns..."
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//         </div>
//         <select
//           className="w-full md:w-auto border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
//           // defaultValue="newest"
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//         >
//           <option value="newest">Sort by: Newest</option>
//           <option value="ending-soon">Ending Soon</option>
//           <option value="most-funded">Most Funded</option>
//         </select>
//       </div>
//       <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {loading ? (
//           <p className="text-center col-span-full">Loading campaigns...</p>
//         ) : !Array.isArray(campaigns) || campaigns.length === 0 ? (
//           <p className="text-center col-span-full">No campaigns found...</p>
//         ) : (
//           campaigns.map((campaign) => (
//             <div
//               key={campaign._id}
//               className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
//             >
//               {campaign.media?.data && (
//                 <img
//                   src={`data:${campaign.media.contentType};base64,${campaign.media.data}`}
//                   alt={campaign.title}
//                   className="w-full h-48 object-cover rounded-t-lg"
//                 />
//               )}
//               <div className="p-4">
//                 <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded mb-2">
//                   {campaign.category}
//                 </span>
//                 <h2 className="text-lg font-semibold">{campaign.title}</h2>
//                 <p className="text-gray-600 text-sm mb-3">
//                   {campaign.description}
//                 </p>
//                 <div className="flex justify-between text-sm mb-2">
//                   <span>Goal: ₹{campaign.fundingGoal}</span>
//                   <span>Raised: ₹0</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
//                   <div
//                     className="bg-teal-600 h-2 rounded-full"
//                     style={{
//                       width: `0%`,
//                     }}
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <Link
//                     to="/Donation"
//                     className="flex-1 bg-teal-700 text-white py-2 rounded text-center hover:bg-teal-800"
//                   >
//                     Donate Now
//                   </Link>
//                   <Link
//                     to = {`/Contact/${campaign._id}`}
//                     className="flex-1 border border-teal-700 text-teal-700 py-2 rounded text-center hover:bg-teal-50"
//                   >
//                     Contact Organizer
//                   </Link>
                  
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default Campaign;

import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1); // ✅ NEW

  const campaignsPerPage = 6; // ✅ NEW

  const handleDonateNow = async (campaignId) => {
    try {
      await axios.post(`http://localhost:5000/api/campaigns/${campaignId}/view`);
      console.log('View counted!');
    } catch (err) {
      console.error('Error counting view:', err);
    }
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns", {
          params: {
            search: search,
            sort: sort,
          },
        });
        setCampaigns(res.data.campaigns);
        setPage(1); // ✅ reset to page 1 on search/sort
      } catch (err) {
        console.error("Error fetching campaigns: ", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchCampaigns();
    }, 500);

    return () => clearTimeout(debounce);
  }, [search, sort]);

  // ✅ NEW: Calculate current campaigns and total pages
  const indexOfLast = page * campaignsPerPage;
  const indexOfFirst = indexOfLast - campaignsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

  return (
    <>
      <section className="campaigns-part bg-teal-800 text-white py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Discover Campaigns
          <br />
          that Need Your Support
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
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <select
          className="w-full md:w-auto border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
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
          currentCampaigns.map(
            (
              campaign // ✅ use currentCampaigns
            ) => (
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
                    <Link
                      to={`/Donation/${campaign._id}`}
                      onClick={() => handleDonateNow(campaign._id)}
                      className="flex-1 bg-teal-700 text-white py-2 rounded text-center hover:bg-teal-800"
                    >
                      Donate Now
                    </Link>
                    <Link
                      to={`/chat/${campaign._id}/${campaign.userId}`}
                      className="flex-1 border border-teal-700 text-teal-700 py-2 rounded text-center hover:bg-teal-50"
                    >
                      Contact Organizer
                    </Link>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
      {/* ✅ NEW: Pagination Controls */}
      {!loading && campaigns.length > campaignsPerPage && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded border ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-teal-700 hover:bg-teal-50"
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                page === i + 1
                  ? "bg-teal-700 text-white"
                  : "bg-white text-teal-700 hover:bg-teal-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded border ${
              page === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-teal-700 hover:bg-teal-50"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Campaign;
