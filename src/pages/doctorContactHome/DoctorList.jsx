import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import Loader from "../../components/Loader";

const DoctorList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTypeQuery = queryParams.get("type") || "All Types";

  // State to store treatments data
  const [doctorData, setDoctorData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the backend
    Axios.get("http://localhost:5000/api/doctors")
      .then((response) => {
        setDoctorData(response.data); // Set the data received from the backend to state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // State for search query, specialization, town, and type
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "All Specializations"
  );
  const [selectedTown, setSelectedTown] = useState("All Towns");
  const [selectedType, setSelectedType] = useState(selectedTypeQuery);

  // Filter doctors based on search by name, specialization, and town
  const filteredDoctors = doctorData.filter((doctor) => {
    return (
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery === "") &&
      (selectedSpecialization === "All Specializations" ||
        doctor.specialization === selectedSpecialization) &&
      (selectedTown === "All Towns" || doctor.town === selectedTown) &&
      (selectedType === "All Types" || doctor.type === selectedType)
    );
  });

  // Get unique specializations, towns, and types for filtering
  const uniqueSpecializations = Array.from(
    new Set(doctorData.map((doctor) => doctor.specialization))
  );
  const uniqueTowns = Array.from(
    new Set(doctorData.map((doctor) => doctor.town))
  );
  const uniqueTypes = Array.from(
    new Set(doctorData.map((doctor) => doctor.type))
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pb-14 lg:px-20 py-3">
      <div className="lg:px-12 px-4 lg:pt-8 lg:pb-3 pt-3 pb-3">
        <div className="lg:flex lg:justify-between items-start grid grid-rows-3">
          <div className="lg:w-1/2">
            <span className="text-xl font-bold">Eye Care </span>
            <span className="text-xl font-bold text-[#004AAD]">Doctors</span>
          </div>
          <div className="mb-4 lg:mb-0 lg:w-1/2">
            {/* Filter by specialization */}
            <select
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              value={selectedSpecialization}
              className="w-full bg-gray-200 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
            >
              <option value="All Specializations">All Specializations</option>
              {uniqueSpecializations.map((specialization) => (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:w-1/2 lg:ml-3">
            {/* Filter by town */}
            <select
              onChange={(e) => setSelectedTown(e.target.value)}
              value={selectedTown}
              className="w-full bg-gray-200 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
            >
              <option value="All Towns">All Towns</option>
              {uniqueTowns.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:w-1/2 lg:ml-3 lg:pb-0 pb-4">
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
        </div>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-200 border rounded-lg px-4 py-2 lg:mt-4 focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
        />
      </div>
      <div className="lg:px-12 px-4 py-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#004AAD] text-white">
                <th className="py-3 px-4 text-left">Profile Pic</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Specialization</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Town</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.name} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <img
                      src={doctor.profilePicUrl}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{doctor.name}</td>
                  <td className="py-3 px-4">{doctor.specialization}</td>
                  <td className="py-3 px-4">{doctor.type}</td>
                  <td className="py-3 px-4">{doctor.town}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/doctor/${doctor.email}`}
                      className="text-blue-500 hover:text-blue-700 transition duration-300 inline-block px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200"
                    >
                      View
                    </Link>
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

export default DoctorList;
