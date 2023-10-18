import React, { useState } from "react";
import axios from "axios";
import AxiosAPI from "../../apis/axios";
import Swal from "sweetalert2";
import Spinner from "../../components/Loader";

const VideoTutorialForm = () => {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(""); // Store the Cloudinary video URL
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // Store the Cloudinary thumbnail image URL

  const [videoTutorialInfo, setVideoTutorialInfo] = useState({
    title: "",
    type: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoTutorialInfo({ ...videoTutorialInfo, [name]: value });
  };

  const handleVideoUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpgelkpd4/video/upload",
        formData
      );

      if (response.data && response.data.secure_url) {
        // Video uploaded successfully to Cloudinary
        setVideoUrl(response.data.secure_url);
      } else {
        // Handle video upload error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Video upload failed.",
        });
        console.error("Video upload failed.");
      }
    } catch (error) {
      // Handle video upload error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error uploading video.",
      });
      console.error("Error uploading video:", error);
    }
  };

  const handleThumbnailUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload",
        formData
      );

      if (response.data && response.data.secure_url) {
        // Image uploaded successfully to Cloudinary
        setThumbnailUrl(response.data.secure_url);
      } else {
        // Handle image upload error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Image upload failed.",
        });
        console.error("Image upload failed.");
      }
    } catch (error) {
      // Handle image upload error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error uploading image.",
      });
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !videoTutorialInfo.title ||
      !videoTutorialInfo.type ||
      !videoTutorialInfo.description
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Title, Type, and Description are required fields.",
      });
      return;
    }

    // Include the video URL and thumbnail URL in the videoTutorialInfo object
    const updatedVideoTutorialInfo = {
      ...videoTutorialInfo,
      videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl,
    };

    try {
      setLoading(true);

      const response = await AxiosAPI.post(
        "videoTutorial",
        updatedVideoTutorialInfo
      );

      console.log("Backend response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Video tutorial added successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding video tutorial.",
      });
      console.error("Error sending data to the backend:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 lg:py-20 px-16 lg:px-96 md:px-64 flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-[#004AAD]">
          Add Video Tutorial
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={videoTutorialInfo.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block mb-2 font-semibold">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={videoTutorialInfo.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={videoTutorialInfo.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block mb-2 font-semibold">
            Video
          </label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleVideoUpload}
            className="mb-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block mb-2 font-semibold">
            Thumbnail Image
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="mb-2"
          />
        </div>

        {loading && <Spinner />}
        <div className="pt-10 pb-10">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Video Tutorial
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoTutorialForm;
