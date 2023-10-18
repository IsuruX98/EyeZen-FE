import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorLocationModal from "./DoctorPin";
import Axios from "../../apis/axios";

const DoctorDetails = () => {
  // Extract the email parameter from the URL
  const { email } = useParams();

  const [isMapOpen, setIsMapOpen] = useState(false);

  // State to store treatments data
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the backend
    Axios.get("doctors")
      .then((response) => {
        setDoctorData(response.data); // Set the data received from the backend to state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Find the doctor with the matching email
  const doctor = doctorData.find((doc) => doc.email === email);

  if (!doctor) {
    return <div>Doctor not found.</div>;
  }

  const handleViewMapClick = () => {
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  const handleMailClick = () => {
    window.location.href = `mailto:${doctor.email}`;
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
        <div className="flex justify-center items-center h-full">
          <div>
            <span className="text-4xl font-extrabold text-[#004AAD]">
              {doctor.name}
            </span>
            <h2 className="pt-8 text-lg font-semibold">
              {doctor.specialization}
            </h2>
            <p className="pt-4">{doctor.about}</p>
            <div className="pt-9">
              <button
                onClick={handleMailClick}
                className="bg-[#004AAD] text-white px-4 py-2 rounded-md hover:bg-blue-800"
              >
                Send a Mail
              </button>
              <button
                onClick={handleViewMapClick}
                className="bg-[#004AAD] text-white ml-2 px-4 py-2 rounded-md hover:bg-blue-800"
              >
                View on Map
              </button>

              <DoctorLocationModal
                isOpen={isMapOpen}
                onClose={handleCloseMap}
                doctor={doctor}
              />
            </div>
          </div>
        </div>

        <div className="p-20 flex justify-center items-center">
          <img
            className="w-96 h-96 rounded-full object-cover"
            src={doctor.profilePicUrl}
            alt=""
          />
        </div>
      </div>
      <div className="lg:px-28 px-12 py-4 pb-20">
        <div className="grid md:grid-cols-2">
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold">Contact Information</h3>
              <p>Email: {doctor.email}</p>
              <p>Mobile: {doctor.mobile}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold">Doctor Type</h3>
              <p>{doctor.type}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold">Qualifications</h3>
              <p>{doctor.qualifications}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold">Experience</h3>
              <p>{doctor.experience}</p>
            </div>
          </div>
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold">Services Offered</h3>
              <ul>
                {doctor.servicesOffered.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold">Office Hours</h3>
              <p>{doctor.officeHours}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold">Accepted Payment Methods</h3>
              <ul>
                {doctor.acceptedPaymentMethods.map((method, index) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
