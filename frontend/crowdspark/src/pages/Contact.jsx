// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import emailjs from "@emailjs/browser";

// const Contact = () => {
//   const { campaignId } = useParams();
//   const [campaign, setCampaign] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchCampaign = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/campaigns/${campaignId}`);
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.message || "Error fetching campaign");
//         }
//         setCampaign(data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load campaign details.");
//       }
//     };
//     fetchCampaign();
//   }, [campaignId]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!campaign?.userId?.email) {
//       setError("Organizer email not found.");
//       return;
//     }
//     setIsLoading(true);
//     setError("");
//     setSuccess("");

//     console.log(
//       "SERVICE:", import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
//       "TEMPLATE:", import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
//       "PUBLIC KEY:", import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
//     );

//     emailjs
//       .send(
//         import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
//         {
//           from_name: form.name,
//           to_name: campaign.userId.email,
//           from_email: form.email,
//           to_email: campaign.userId.email,
//           message: form.message,
//         },
//         import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
//       )
//       .then(() => {
//         setSuccess("Message sent successfully.");
//         setForm({ name: "", email: "", message: "" });
//       })
//       .catch((error) => {
//         console.error("EmailJS Error:", error);
//         setError("Failed to send message.");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center"
//     style={{ background: 'linear-gradient(to right, #004e64, #00a6a6)' }}>
//       <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
//         <h2 className="text-2xl font-bold mb-4 text-center text-teal-900">
//           Contact Organizer
//         </h2>
//         {campaign && (
//           <p className="mb-4 text-center text-gray-700">
//             You are contacting about:{" "}
//             <strong>{campaign.title}</strong>
//           </p>
//         )}
//         {error && (
//           <p className="text-red-500 text-center mb-2">{error}</p>
//         )}
//         {success && (
//           <p className="text-green-500 text-center mb-2">{success}</p>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Your email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//           <textarea
//             name="message"
//             placeholder="Your message"
//             value={form.message}
//             onChange={handleChange}
//             required
//             rows="4"
//             className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-[#007c91] text-white font-semibold py-2 rounded hover:bg-[#005f6b] transition duration-200"
//           >
//             {isLoading ? "Sending..." : "Send Message"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React from 'react'

const Contact = () => {
  return (
    <div>
      Contact page
    </div>
  )
}

export default Contact
