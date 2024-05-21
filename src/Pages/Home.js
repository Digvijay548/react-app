import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth.js';
import { logout, login } from '../store/authSlice.js';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [UserDetails,setUserDetails]=useState(null)
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.status); // Access login state from Redux
  const userData = useSelector((state) => state.auth.user); // Access user data from Redux

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUserDetails(userData)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black" style={{ backgroundImage: "url('/HomeBg.jpg')", backgroundSize: "cover" }}>
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <img src="./loading.png" alt="Loading" className="animate-spin w-20 h-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black" style={{ backgroundImage: "url('/HomeBg.jpg')", backgroundSize: "cover" }}>
      <div className="flex flex-col items-center bg-white bg-opacity-5 w-1/2 h-1/2 rounded-2xl shadow-lg shadow-slate-800">
        <h1 className='items-start mt-10 text-3xl text-blue-200'>Welcome to Our Gaming Site!</h1>
        <h4 className='text-customPurple mt-5'>
          Explore the world of gaming with us. {isLoggedIn ? (<p>You are logged in {UserDetails.name}</p>) : (<p>You are logged out</p>)}
        </h4>
        <button className='text-white mt-28 bg-blue-400 rounded-full w-40 h-10 hover:bg-blue-300'>Play Now</button>
      </div>
    </div>
  );
};

export default Home;
