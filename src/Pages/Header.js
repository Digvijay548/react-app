import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth.js';
import { logout, login } from '../store/authSlice.js';
import Swal from 'sweetalert2';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ user: userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error in fetching data:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLogout = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await authService.logout();
          dispatch(logout());
          Swal.fire(
            'Logged out!',
            'You have been logged out.',
            'success'
          );
        } catch (error) {
          console.error("Error during logout:", error);
          Swal.fire(
            'Error!',
            'There was an error logging out.',
            'error'
          );
        }
      }
    });
  };

  return (
    <header className="bg-blue-300 h-16 flex">
      <div className='bg-blue-300 w-20 flex-1 text-cyan-100 flex justify-between items-center'>
        <Link to="/">
          <img className='w-28'
            src="https://www.brandbucket.com/sites/default/files/logo_uploads/462074/large_logophoria.png"
            alt="Logos"
          />
        </Link>
      </div>
      <nav className='flex'>
        <div className='flex items-center justify-center gap-2'>
          <div className="flex items-center justify-center h-12 w-24">
            <NavLink to="/" exact activeclassname="text-black" className="text-white w-40 flex items-center justify-center h-10 rounded-full hover:bg-blue-200 hover:text-black">
              Home
            </NavLink>
          </div>
          <div className="flex items-center justify-center h-12 w-24 ml-auto">
            <NavLink to="/github" activeclassname="text-black" className="text-white w-40 flex items-center justify-center h-10 rounded-full hover:bg-blue-200 hover:text-black">
              Github
            </NavLink>
          </div>
          <div className="flex items-center justify-center h-12 w-24 ml-auto">
            <NavLink to="/about" activeclassname="text-black" className="text-white w-40 flex items-center justify-center h-10 rounded-full hover:bg-blue-200 hover:text-black">
              About
            </NavLink>
          </div>
          <div className="flex items-center justify-center h-12 w-24 ml-auto">
            <NavLink to="/contact" activeclassname="text-black" className="text-white w-40 flex items-center justify-center h-10 rounded-full hover:bg-blue-200 hover:text-black">
              Contact
            </NavLink>
          </div>
          
            {isLoggedIn &&
            <div className="flex items-center justify-center h-12 w-24 ml-auto">
              <NavLink to="/AllPost" activeclassname="text-black" className="text-white w-40 flex items-center justify-center h-10 rounded-full hover:bg-blue-200 hover:text-black">
              All Post
            </NavLink>
             </div>
            }
         
          {isLoggedIn &&
          <div className="flex items-center justify-center h-12 w-24 ml-auto ">            
              <NavLink to="/FileUpload" activeclassname="text-black" className="text-white w-40 flex items-center justify-center h-10 rounded-full hover:bg-blue-200 hover:text-black">
              File Upload
            </NavLink>            
          </div>
        }
          <div className="flex items-center justify-center h-12 w-24 ml-auto mr-10">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-white w-40 flex items-center justify-center h-10 rounded-full hover:bg-blue-200 hover:text-black">
                Logout
              </button>
            ) : (
              <NavLink to="/login" activeclassname="text-black" className="text-white w-40 flex items-center justify-center h-10 rounded-full hover:bg-blue-200 hover:text-black">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
