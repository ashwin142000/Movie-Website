import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


const Navbar = () => {
  const {user,logOut}=UserAuth();
  const navigate = useNavigate();
  // console.log(user);

  const handleLogout = async() => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
      <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>CineVerse</h1>
      </Link>
     <Link to='/searchbar'>
      <button className='sm:w-15 md:w-25 p-2 rounded opacity-50 hover:opacity-80 bg-gray-800 text-white'>Search Movies</button>
      </Link>
      {user?.email ? (
         <div>
         <Link to='/account'>
         <button className='text-white pr-4'>My Space</button>
         </Link>
         
         <button onClick={handleLogout} className='text-white bg-red-600 px-6 py-2 rounded cusrsor-pointer'>Log Out</button>
        
       </div>
      ):(
        <div>
        <Link to='/login'>
        <button className='text-white pr-4'>Sign In</button>
        </Link>
        <Link to='/signup'>
        <button className='text-white bg-red-600 px-6 py-2 rounded cusrsor-pointer'>Sign Up</button>
        </Link>
      </div>
      )}
     
    </div>
  )
}

export default Navbar;
