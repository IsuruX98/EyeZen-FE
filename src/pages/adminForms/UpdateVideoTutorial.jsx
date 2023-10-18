import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosAPI from "../../apis/axios";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "../../components/Loader";

const UpdateVideoTutorial = () => {
  const { id } = useParams();
  const [videoTutorial, setVideoTutorial] = useState(null);

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  useEffect(() => {
    AxiosAPI.get(`videoTutorial/${id}`)
      .then((response) => {
        setVideoTutorial(response.data);
      })
      .catch((error) => {
        console.error("Error fetching video tutorial data:", error);
      });
  }, [id]);

  const [loading, setLoading] = useState(false);

  const [videoTutorialInfo, setVideoTutorialInfo] = useState({
    // Initialize with existing video tutorial's information
    title: "",
    type: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    // Update the videoTutorialInfo state with the fetched data
    if (videoTutorial) {
      setVideoTutorialInfo(videoTutorial);
    }
  }, [videoTutorial]);

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
        setVideoTutorialInfo({
          ...videoTutorialInfo,
          videoUrl: response.data.secure_url,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Video upload failed.",
        });
        console.error("Video upload failed.");
      }
    } catch (error) {
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
        setVideoTutorialInfo({
          ...videoTutorialInfo,
          thumbnailUrl: response.data.secure_url,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Thumbnail upload failed.",
        });
        console.error("Thumbnail upload failed.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error uploading thumbnail.",
      });
      console.error("Error uploading thumbnail:", error);
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

    try {
      setLoading(true);

      const response = await AxiosAPI.put(
        `videoTutorial/${id}`,
        videoTutorialInfo
      );

      console.log("Backend response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Video tutorial information updated successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating video tutorial information.",
      });
      console.error("Error sending data to the backend:", error);
    } finally {
      setLoading(false);
    }
  };

  const showUpdateConfirmation = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update the video tutorial details.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(e);
      }
    });
  };

  return (
    <div>
      {videoTutorial ? (
        <div>
          <div className="py-10 lg:py-20 px-16 lg:px-96 md:px-64 flex flex-col">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-[#004AAD]">
                Update Video Tutorial Details
              </h2>
            </div>
            <div className="mb-6 flex sm:flex-row justify-center">
              <video controls width="480" height="270">
                <source src={videoTutorialInfo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
                  required
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
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={videoTutorialInfo.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
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
              {loading && (
                <div style={overlayStyles}>
                  <Spinner />
                </div>
              )}
              <div className="pt-10 pb-10">
                <button
                  type="button"
                  onClick={showUpdateConfirmation}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Video Tutorial Details
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div style={overlayStyles}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default UpdateVideoTutorial;
