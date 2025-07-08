// import React from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = ({user, handleLogout}) => {
//   return (
//     <div className='absolute top-0 left-0 w-full z-10 bg-teal-900 text-white shadow-md'>
//       <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
//         <div className="text-2xl font-bold">CrowdSpark</div>

//         <ul className='hidden md:flex gap-30 flex-1 justify-center'>
//           <Link to="/" className='cursor-pointer hover:text-gray-400'>Home</Link>
//           <Link to="/campaigns" className='cursor-pointer hover:text-gray-400'>Campaigns</Link>
//           <Link to="/notification" className='cursor-pointer hover:text-gray-400'>Notification</Link>
//         </ul>

//         <div className='flex items-center gap-5 flex-shrink-0'>
//           {user ? (
//             <>
//               <span className='cursor-default'>Welcome, {user.name}</span>
//               <button onClick={handleLogout} className='bg-white text-teal-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200'>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">
//                 <button className='bg-white text-teal-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200'>Login</button>
//               </Link>
//               <Link to="/signup">
//                 <button className='bg-white text-teal-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200'>Sign up</button>
//               </Link>
//             </>
//           )}
//         </div>


//       </div>
//     </div>
//   )
// }

// export default Navbar

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ user, handleLogout }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (user && user.id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/chat/unread/${user.id}`);
          setUnreadCount(res.data.unreadCount);
        } catch (err) {
          console.error("Error fetching unread count:", err);
        }
      }
    };

    fetchUnreadCount();
  }, [user]);

  return (
    <div className='absolute top-0 left-0 w-full z-10 bg-teal-900 text-white shadow-md'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
        <div className="text-2xl font-bold">CrowdSpark</div>

        <ul className='hidden md:flex gap-8 flex-1 justify-center'>
          <Link to="/" className='cursor-pointer hover:text-gray-400'>Home</Link>
          <Link to="/campaigns" className='cursor-pointer hover:text-gray-400'>Campaigns</Link>
          <div className="relative">
            <Link to="/notification" className='cursor-pointer hover:text-gray-400'>
              Notifications
            </Link>
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </ul>

        <div className='flex items-center gap-5 flex-shrink-0'>
          {user ? (
            <>
              <span className='cursor-default'>Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className='bg-white text-teal-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200'>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className='bg-white text-teal-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200'>Login</button>
              </Link>
              <Link to="/signup">
                <button className='bg-white text-teal-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200'>Sign up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
