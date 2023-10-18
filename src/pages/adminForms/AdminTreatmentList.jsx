import React, { useEffect, useState } from "react";
import Axios from "../../apis/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdminTreatmentList = () => {
  const [treatmentData, setTreatmentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Axios.get("treatments")
      .then((response) => {
        setTreatmentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching treatment data:", error);
      });
  }, []);

  const handleDeleteTreatment = (id) => {
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
        Axios.delete(`treatments/${id}`)
          .then(() => {
            setTreatmentData((prevData) =>
              prevData.filter((treatment) => treatment._id !== id)
            );
          })
          .catch((error) => {
            console.error("Error deleting treatment:", error);
          });
      }
    });
  };

  const filteredTreatments = treatmentData.filter((treatment) => {
    return (
      treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery === ""
    );
  });

  return (
    <div className="pb-14 lg:px-20 py-3">
      <div className="lg:px-12 px-4 lg:pt-8 lg:pb-3 pt-3 pb-3">
        <div className="lg:flex lg:justify-between items-start grid lg:mb-4">
          <div className="lg:w-1/2">
            <span className="text-xl font-bold">Admin </span>
            <span className="text-xl font-bold text-[#004AAD] ">
              Treatment List
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
              to="/treatmentForm"
              className="text-white bg-[#004AAD] hover:bg-[#003899] transition duration-300 inline-block px-4 py-2 rounded-lg"
            >
              Add Treatment
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:px-12 px-4 py-3">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#004AAD] text-white">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Type</th>

                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTreatments.map((treatment) => (
                <tr key={treatment._id} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <img
                      src={treatment.photoUrl}
                      alt={treatment.title}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{treatment.title}</td>
                  <td className="py-3 px-4">{treatment.type}</td>

                  <td className="py-3 px-4">
                    <Link
                      to={`/update-treatment/${treatment._id}`}
                      className="text-blue-500 hover:text-blue-700 transition duration-300 inline-block px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDeleteTreatment(treatment._id)}
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

export default AdminTreatmentList;
