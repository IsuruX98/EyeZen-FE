import React, { useEffect, useState } from "react";
import Axios from "../../apis/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdminVideoTutorialList = () => {
  const [videoTutorials, setVideoTutorials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Axios.get("videoTutorial")
      .then((response) => {
        setVideoTutorials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching video tutorial data:", error);
      });
  }, []);

  const handleDeleteVideoTutorial = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`videoTutorial/${id}`)
          .then(() => {
            setVideoTutorials((prevData) =>
              prevData.filter((videoTutorial) => videoTutorial._id !== id)
            );
          })
          .catch((error) => {
            console.error("Error deleting video tutorial:", error);
          });
      }
    });
  };

  const filteredVideoTutorials = videoTutorials.filter((videoTutorial) => {
    return (
      videoTutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      videoTutorial.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery === ""
    );
  });

  return (
    <div className="pb-14 lg:px-20 py-3">
      <div className="lg:px-12 px-4 lg:pt-8 lg:pb-3 pt-3 pb-3">
        <div className="lg:flex lg:justify-between items-start grid">
          <div className="lg:w-1/2">
            <span className="text-xl font-bold">Admin </span>
            <span className="text-xl font-bold text-[#004AAD]">
              Video Tutorial List
            </span>
          </div>
        </div>

        <div className="lg:flex justify-between grid">
          <div className="pt-2">
            <input
              type="text"
              placeholder="Search by title, type"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-200 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
            />
          </div>
          <div className="pt-2">
            <Link
              to="/videoTutorialForm"
              className="text-white bg-[#004AAD] hover:bg-[#003899] transition duration-300 inline-block px-4 py-2 rounded-lg"
            >
              Add Video
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:px-12 px-4 py-3">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#004AAD] text-white">
                <th className="py-3 px-4 text-left">Thumbnail</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVideoTutorials.map((videoTutorial) => (
                <tr
                  key={videoTutorial._id}
                  className="border-t hover:bg-gray-100"
                >
                  <td className="py-3 px-4">
                    <img
                      src={videoTutorial.thumbnailUrl}
                      alt={videoTutorial.title}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{videoTutorial.title}</td>
                  <td className="py-3 px-4">{videoTutorial.type}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/update-video-tutorial/${videoTutorial._id}`}
                      className="text-blue-500 hover:text-blue-700 transition duration-300 inline-block px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() =>
                        handleDeleteVideoTutorial(videoTutorial._id)
                      }
                      className="text-red-500 hover:text-red-700 transition duration-300 inline-block lg:ml-3 px-3 py-1 rounded-lg lg:mt-0 mt-2 bg-red-100 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVideoTutorialList;
