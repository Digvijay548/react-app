import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import service from '../appwrite/config.js';
import { Query } from 'appwrite';
import authService from '../appwrite/auth.js';
import { getFilePreview } from '../store/fileSlice.js';
import { logout, login } from '../store/authSlice.js';

const AllPost = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const isLoggedIn = useSelector((state) => state.auth.status);

    const [UserDetails, setUserDetails] = useState(null)
    const [previews, setPreviews] = useState({});


   


    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await authService.getCurrentUser();
                setUserDetails(user)
                const email = user.email;
                const postData = await service.GetAllUserPost([Query.equal("Email", email)]);
                setData(postData);

                if (postData.documents && postData.documents.length > 0) {
                    const previewPromises = postData.documents.map(async (doc) => {
                        const previewUrl = await service.getFilePreview(doc.ImgUrl);
                        return { [doc.ImgUrl]: previewUrl };
                    });
                    const previewsArray = await Promise.all(previewPromises);
                    const previewsObject = Object.assign({}, ...previewsArray);
                    setPreviews(previewsObject);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally{
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleUpdate = async (slug, newData) => {
        try {
            await service.UpdateUserPost(slug, newData);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10  text-white rounded-full p-2 cursor-pointer transition-transform duration-300 ease-in-out hover:bg-gray-700 hover:scale-110"
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
        slidesToScroll: 2,
        centerMode: true,
        centerPadding: '30px',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '30px',
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '20px',
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '10px',
                }
            }
        ]
    };
    if(isLoggedIn){

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
            <div className="container mx-auto py-8 items-center justify-center mt-5 bg-opacity-5 bg-white w-10/12 rounded-2xl">
                {data && data.documents.length > 0 ? (
                    <Slider {...settings}>
                        {data.documents.map((doc) => (
                            <div key={doc.$id} className="px-2">
                                <div className="bg-white bg-opacity-5 shadow-md rounded-lg p-4 mx-auto max-w-xs h-80 flex flex-col items-center">
                                    <div className='flex'>
                                        <h2 className="text-xl font-bold mb-2 text-center mr-1 text-white">Headline: </h2>
                                        <h2 className="text-xl font-bold mb-2 text-center text-white">{doc.Headline}</h2>
                                    </div>
                                    <div className='flex '>
                                        <p className="text-white mb-4 text-center mr-1">Details: </p>
                                        <p className="text-white mb-4 text-center">{doc.Details}</p>
                                    </div>
                                    
                                    {previews[doc.ImgUrl] && (
                                        <div className="w-full h-40 overflow-hidden flex justify-center">
                                            <img src={previews[doc.ImgUrl]} alt="Post image" className="object-cover" />
                                        </div>
                                    )}
                                    <div className='pt-2 flex'>
                                    <button style={{ width: "80px", borderRadius: "20px" }} onClick={() => handleUpdate(doc.$id, { /* newData */ })} className="bg-blue-500 mr-2 text-sm text-white px-4 py-2 rounded mt-auto">
                                        Update
                                    </button>
                                    <button style={{ width: "80px", borderRadius: "20px" }} onClick={() => handleUpdate(doc.$id, { /* newData */ })} className="bg-blue-500 mr-2 text-sm text-white px-4 py-2 rounded mt-auto">
                                        Delete
                                    </button>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </Slider>
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
}
else{
    return (
        <div className="flex items-center justify-center w-full h-screen bg-black">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Oops! Something went wrong</h2>
                <p className="text-lg text-gray-600 text-center">We're sorry, but there was an error while processing your request. Please try again later.</p>
            </div>
        </div>
    );
}
};

export default AllPost;
