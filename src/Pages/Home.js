import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth.js';
import { logout, login } from '../store/authSlice.js';
import service from '../appwrite/config.js';
import conf from '../conf/conf.js';
import Slider from "react-slick";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [UserDetails, setUserDetails] = useState(null);
  const [AllUserDatas, setAllUserDatas] = useState(null);
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

  useEffect(() => {
    const fetchAllUserData = async () => {
      try {
        const AllData = await service.fetchAllItems();
        if (AllData) {
          setAllUserDatas(AllData.documents)
          console.log("All User Data => " + JSON.stringify(AllUserDatas))


        } else {
          console.log("No Data Found")
        }
      } catch (error) {
        console.error("Error in fetching data:", error);

      } finally {
      }
    };

    fetchAllUserData();
  }, [dispatch]);



  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-2 cursor-pointer transition-transform duration-300 ease-in-out hover:bg-black hover:bg-opacity-15 hover:scale-110"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10  text-white rounded-full p-2 cursor-pointer transition-transform duration-300 ease-in-out hover:bg-black hover:bg-opacity-15 hover:scale-110"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

  };

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
    <div className="flex  items-center justify-center w-full h-full  bg-black" style={{ backgroundImage: "url('/HomeBg.jpg')", backgroundSize: "cover" }}>
      <div className="flex flex-col items-center bg-white mt-10 mb-10 bg-opacity-5 w-11/12 h-full rounded-2xl shadow-lg shadow-slate-800">
       
        <Slider {...settings} className="w-full m-10">
          {AllUserDatas ? AllUserDatas.map((entry, index) => (
            <div key={entry.$id} className="px-2">
              <div className="bg-white bg-opacity-5 shadow-md rounded-lg p-4 mx-auto max-w-xs h-80 flex flex-col items-center">
                <div className='flex'>
                  <h2 className="text-l font-bold mb-2 text-center mr-1 text-white">Headline: </h2>
                  <h2 className="text-l font-bold mb-2 text-center text-white">{entry.Headline}</h2>
                </div>
                <div className='flex '>
                  <p className="text-white mb-4 text-center mr-1">Details: </p>
                  <p className="text-white mb-4 text-center">{entry.Details}</p>
                </div>
                <div className="w-full h-56 overflow-hidden flex justify-center">
                  <img src={`${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketSId}/files/${entry.ImgUrl}/view?project=${conf.appwriteProjectId}&mode=guest`} alt="Post image" className="object-cover" />
                </div>
                <div className="w-full h-40 flex-col items-center flex justify-center">
                 <p className='text-white'>Owned By: </p>
                 <p className='text-white'>{" "+entry.Email}</p>
                </div>
              </div>


            </div>
          )) : (
            <div>No data</div>
          )}
        </Slider>
        <h1 className='items-start mt-14 text-3xl text-blue-200'>Welcome to Our Gaming Site!</h1>
        <h4 className='text-customPurple mt-5'>
          Explore the world of gaming with us. {isLoggedIn ? (<p>You are logged in {UserDetails.name}</p>) : (<p>You are logged out</p>)}
        </h4>
        <button className='text-white mt-5 mb-10 bg-blue-400 rounded-full w-40 h-10 hover:bg-blue-300'>Play Now</button>

      </div>
    </div>
  );
};

export default Home;
