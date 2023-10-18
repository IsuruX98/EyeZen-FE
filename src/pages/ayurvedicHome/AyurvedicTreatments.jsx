import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../apis/axios";

const AyurvedicTreatments = () => {
  // State for search query and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");

  // State to store treatments data
  const [treatmentsData, setTreatmentsData] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the backend
    Axios.get("treatments")
      .then((response) => {
        setTreatmentsData(response.data); // Set the data received from the backend to state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Filter treatments based on search query and selected type
  const filteredTreatments = treatmentsData.filter((treatment) => {
    return (
      (treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        treatment.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (selectedType === "All Types" || treatment.type === selectedType)
    );
  });

  // Get unique treatment types for filtering
  const uniqueTypes = Array.from(
    new Set(treatmentsData.map((treatment) => treatment.type))
  );

  return (
    <div className="pb-14">
      <div className="lg:px-28 px-12 lg:pt-8 lg:pb-3 pt-3 pb-3">
        <span className="text-xl font-bold">Ayurvedic </span>
        <span className="text-xl font-bold text-[#004AAD]">Treatments</span>
      </div>
      <div className="lg:px-28 px-12 py-3">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-200 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
        />
      </div>
      <div className="lg:px-28 px-12 py-3">
        {/* Filter by type */}
        <select
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
          className="w-full bg-gray-200 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
        >
          <option value="All Types">All Types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="lg:px-28 px-12 py-3">
        {/* Cards */}
        <div className="flex flex-wrap -mx-4">
          {filteredTreatments.map((treatment) => {
            // Define a maximum length for the description
            const maxLength = 100;

            // Shorten the description if it's longer than the maximum length
            const truncatedDescription =
              treatment.description.length > maxLength
                ? treatment.description.substring(0, maxLength) + "..."
                : treatment.description;

            return (
              <Link
                to={`/treatment/${treatment._id}`}
                key={treatment._id}
                className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 flex"
              >
                <div className="flex flex-col h-full border rounded-lg p-4 hover:shadow-lg transition duration-300 relative">
                  <img
                    src={treatment.photoUrl}
                    alt={treatment.title}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    {treatment.title}
                  </h3>
                  <p className="text-gray-600 pb-8">{truncatedDescription}</p>
                  <div className="absolute bottom-4 right-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      Read More
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AyurvedicTreatments;
