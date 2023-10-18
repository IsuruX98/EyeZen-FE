import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../apis/axios";
import Swal from "sweetalert2";

const AdminDoctorList = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "All Specializations"
  );
  const [selectedTown, setSelectedTown] = useState("All Towns");
  const [selectedType, setSelectedType] = useState("All Types");

  useEffect(() => {
    Axios.get("doctors")
      .then((response) => {
        setDoctorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteDoctor = (email) => {
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
        // User clicked the "Yes" button, proceed with deletion
        Axios.delete(`doctors/${email}`)
          .then((response) => {
            setDoctorData((prevData) =>
              prevData.filter((doctor) => doctor.email !== email)
            );
          })
          .catch((error) => {
            console.error("Error deleting doctor:", error);
          });
      }
    });
  };

  const filteredDoctors = doctorData.filter((doctor) => {
    return (
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery === "") &&
      (selectedSpecialization === "All Specializations" ||
        doctor.specialization === selectedSpecialization) &&
      (selectedTown === "All Towns" || doctor.town === selectedTown) &&
      (selectedType === "All Types" || doctor.type === selectedType)
    );
  });

  const uniqueSpecializations = Array.from(
    new Set(doctorData.map((doctor) => doctor.specialization))
  );
  const uniqueTowns = Array.from(
    new Set(doctorData.map((doctor) => doctor.town))
  );
  const uniqueTypes = Array.from(
    new Set(doctorData.map((doctor) => doctor.type))
  );

  return (
    <div className="pb-14 lg:px-20 py-3">
      <div className="lg:px-12 px-4 lg:pt-8 lg:pb-3 pt-3 pb-3">
        <div className="lg:flex lg:justify-between items-start grid grid-rows-3">
          <div className="lg:w-1/2">
            <span className="text-xl font-bold">Admin </span>
            <span className="text-xl font-bold text-[#004AAD]">
              Doctor List
            </span>
          </div>

          <div className="mb-4 lg:mb-0 lg:w-1/2">
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
          <div className="lg:w-1/2 lg:ml-3 lg:pb-0 pb-4">
            <div className="w-full">
              <Link
                to="/doctorForm"
                className="text-white bg-[#004AAD] hover:bg-[#003899] text-center transition duration-300 inline-block w-full px-4 py-2 rounded-lg"
              >
                Add Doctor
              </Link>
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by name, email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-200 border rounded-lg px-4 py-2 lg:mt-4 focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
        />
      </div>
      <div className="lg:px-12 px-4 py-3">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#004AAD] text-white">
                <th className="py-3 px-4 text-left">Profile Pic</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Specialization</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.email} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <img
                      src={doctor.profilePicUrl}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{doctor.name}</td>
                  <td className="py-3 px-4">{doctor.email}</td>
                  <td className="py-3 px-4">{doctor.specialization}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/update-doctor/${doctor.email}`}
                      className="text-blue-500 hover:text-blue-700 transition duration-300 inline-block px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.email)}
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

export default AdminDoctorList;
