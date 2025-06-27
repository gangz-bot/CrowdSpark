import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({user, handleLogout}) => {
  return (
    <div className='absolute top-0 left-0 w-full z-10 bg-teal-900 text-white shadow-md'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
        <div className="text-2xl font-bold">CrowdSpark</div>

        <ul className='hidden md:flex gap-30 flex-1 justify-center'>
          <Link to="/" className='cursor-pointer hover:text-gray-400'>Home</Link>
          <Link to="/campaigns" className='cursor-pointer hover:text-gray-400'>Campaigns</Link>
          <Link to="/features" className='cursor-pointer hover:text-gray-400'>Features</Link>
        </ul>

        <div className='flex items-center gap-5 flex-shrink-0'>
          {user ? (
            <>
              <span className='cursor-default'>Welcome, {user.name}</span>
              <button onClick={handleLogout} className='bg-white text-teal-900 font-semibold px-4 py-2 rounded-md hover:bg-gray-200'>Logout</button>
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
  )
}

export default Navbar
