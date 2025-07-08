// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!user || !user.id) {
//         // ✅ No redirect, just stop loading
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get(`http://localhost:5000/api/chat/notifications/${user.id}`);
//         setNotifications(res.data.notifications);

//         // Mark as read
//         await axios.put(`http://localhost:5000/api/chat/mark-read/${user.id}`);
//       } catch (err) {
//         console.error("Error fetching notifications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [user]);

//   if (loading) {
//     return <p className="text-center mt-8">Loading notifications...</p>;
//   }

//   if (!user || !user.id) {
//     return <p className="text-center mt-8">Please log in to see notifications.</p>;
//   }

//   if (notifications.length === 0) {
//     return <p className="text-center mt-8">No new notifications.</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto py-8 px-4">
//       <h1 className="text-2xl font-bold mb-6">Notifications</h1>
//       <ul className="space-y-4">
//         {notifications.map((notif) => (
//           <li
//             key={notif._id}
//             className="bg-white border border-gray-200 p-4 rounded shadow"
//           >
//             <div className="mb-2 text-sm text-gray-600">
//               <span>New message from </span>
//               <span className="font-semibold">{notif.senderName}</span>
//               {" "}about campaign{" "}
//               <span className="font-semibold">{notif.campaignTitle}</span>
//             </div>
//             <p className="mb-3">{notif.content}</p>
//             <div className="flex gap-2">
//               <Link
//                 to={`/chat/${notif.campaignId}/${notif.senderId}`}
//                 className="text-sm text-white bg-teal-600 px-3 py-1 rounded hover:bg-teal-700"
//               >
//                 Open Chat
//               </Link>
//               <Link
//                 to={`/Donation/${notif.campaignId}`}
//                 className="text-sm text-teal-700 border border-teal-600 px-3 py-1 rounded hover:bg-teal-50"
//               >
//                 View Campaign
//               </Link>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notification;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/chat/notifications/${user.id}`);
        setNotifications(res.data.notifications);

        // Mark as read
        await axios.put(`http://localhost:5000/api/chat/mark-read/${user.id}`);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  // DELETE handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/chat/delete/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
      alert("Failed to delete message.");
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading notifications...</p>;
  }

  if (!user || !user.id) {
    return <p className="text-center mt-8">Please log in to see notifications.</p>;
  }

  if (notifications.length === 0) {
    return <p className="text-center mt-8">No new notifications.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <ul className="space-y-4">
        {notifications.map((notif) => (
          <li
            key={notif._id}
            className="bg-white border border-gray-200 p-4 rounded shadow relative"
          >
            {/* Delete button */}
            <button
              onClick={() => handleDelete(notif._id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
              title="Delete message"
            >
              &#x2716;
            </button>

            <div className="mb-2 text-sm text-gray-600">
              <span>New message from </span>
              <span className="font-semibold">{notif.senderName}</span>{" "}
              about campaign{" "}
              <span className="font-semibold">{notif.campaignTitle}</span>
            </div>
            <p className="mb-3">{notif.content}</p>
            <div className="flex gap-2">
              <Link
                to={`/chat/${notif.campaignId}/${notif.senderId}`}
                className="text-sm text-white bg-teal-600 px-3 py-1 rounded hover:bg-teal-700"
              >
                Open Chat
              </Link>
              <Link
                to={`/Donation/${notif.campaignId}`}
                className="text-sm text-teal-700 border border-teal-600 px-3 py-1 rounded hover:bg-teal-50"
              >
                View Campaign
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;

