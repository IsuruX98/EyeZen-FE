import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../apis/axios";

const AyurvedicVideo = () => {
  const { videoId } = useParams();

  // State to store treatments data
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the backend
    Axios.get("videoTutorial")
      .then((response) => {
        setVideoData(response.data); // Set the data received from the backend to state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Find the video data based on the videoId
  const video = videoData.find((video) => video._id === videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="p-4">
      <div className="lg:px-28 px-12 py-3">
        <h1 className="text-xl font-bold text-[#004AAD]">{video.title}</h1>
      </div>
      <div className="lg:px-28 px-12 py-3 pb-20">
        {/* Embed the video player using the Cloudinary URL */}
        <video width="100%" controls>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="text-gray-700 pt-10">{video.description}</p>
      </div>
    </div>
  );
};

export default AyurvedicVideo;
