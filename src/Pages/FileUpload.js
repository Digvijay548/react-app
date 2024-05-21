import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, getFilePreview, deleteFile } from '../store/fileSlice.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import authService from '../appwrite/auth.js';
import service from '../appwrite/config.js';

const MySwal = withReactContent(Swal);

const FileUpload = () => {
  const dispatch = useDispatch();
  const [ImgId, setImgId] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const { file, preview, loading, error } = useSelector((state) => state.file);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    Headline: '',
    Details: '',
    ContactDetails: ''
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const user = await authService.getCurrentUser();
      const email = user.email;
      await dispatch(uploadFile({ file: selectedFile, data: { ...formData, Email: email } })).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setImgId(result.payload.databasereturn.ImgUrl); // storing database return ImgUrl
          MySwal.fire({
            title: 'Upload Successful!',
            text: 'Your file has been uploaded.',
            icon: 'success',
            customClass: {
              popup: 'custom-swal-popup'
            }
          });
        } else {
          MySwal.fire({
            title: 'Upload Failed',
            text: result.payload,
            icon: 'error',
            customClass: {
              popup: 'custom-swal-popup'
            }
          });
        }
      });
    }
  };

  const handleFilePreview = async () => {
    try {
      const previewUrl = await service.getFilePreview(ImgId);
      dispatch(getFilePreview(previewUrl));
    } catch (error) {
      console.error("Error fetching preview:", error);
    }
  };

  const handleFileDelete = async (fileId) => {
    dispatch(deleteFile(fileId)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        MySwal.fire({
          title: 'Deletion Successful!',
          text: 'Your file has been deleted.',
          icon: 'success',
          customClass: {
            popup: 'custom-swal-popup'
          }
        });
      } else {
        MySwal.fire({
          title: 'Deletion Failed',
          text: result.payload,
          icon: 'error',
          customClass: {
            popup: 'custom-swal-popup'
          }
        });
      }
    });
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-opacity-10">
        <div className="flex flex-col items-center p-4">
          <input type="file" onChange={handleFileChange} className="mb-4" />
          <input type="text" name="Headline" placeholder="Headline" value={formData.Headline} onChange={handleInputChange} className="mb-2" />
          <input type="text" name="Details" placeholder="Details" value={formData.Details} onChange={handleInputChange} className="mb-2" />
          <input type="text" name="ContactDetails" placeholder="Contact Details" value={formData.ContactDetails} onChange={handleInputChange} className="mb-4" />
          <button
            onClick={handleFileUpload}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Upload
          </button>
          {file && (
            <div className="mt-4">
              <p className="mb-2">File Uploaded: {file.$id}</p>
              <button
                onClick={handleFilePreview}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Preview
              </button>
              <button
                onClick={() => handleFileDelete(file.$id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
          {preview && (
            <div className="mt-4">
              <img src={preview} alt="File Preview" className="max-w-full h-auto" />
            </div>
          )}
          {loading && <p className="mt-4">Loading...</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    );
  } else {
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

export default FileUpload;
