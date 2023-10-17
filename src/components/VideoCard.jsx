import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const VideoCard = ({ thumbnailUrl, title, description, videoId }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="w-full lg:w-1/3 p-4 flex">
      <Link to={`/view/${videoId}`} className="w-full">
        <div className="h-full mb-3 bg-white border rounded-lg overflow-hidden shadow-lg flex flex-col relative">
          <div
            className="relative w-full h-40"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-40 object-cover"
            />
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white transition-opacity ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <FontAwesomeIcon
                icon={faPlay}
                size="3x"
                className="hover:text-gray-300"
              />
            </div>
          </div>
          <div className="p-4 flex-grow">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
