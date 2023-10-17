import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "../../components/Loader";

const DoctorForm = () => {
  const [loading2, setLoading2] = useState(false);

  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    specialization: "",
    type: "",
    town: "",
    latitude: "",
    longitude: "",
    about: "",
    qualifications: "",
    experience: "",
    servicesOffered: "",
    officeHours: "",
    acceptedPaymentMethods: "",
    profilePicUrl: "",
  });

  const [imgUrl, setImgUrl] = useState(""); // Store the Cloudinary image URL

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && isNaN(value)) {
      return;
    }

    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  const handleImageUpload = async (event) => {
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
        setImgUrl(response.data.secure_url);
        setDoctorInfo({
          ...doctorInfo,
          profilePicUrl: response.data.secure_url,
        });
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

    // Validation
    if (!doctorInfo.name || !doctorInfo.email || !doctorInfo.mobile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name, Email, and Mobile are required fields.",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(doctorInfo.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email format.",
      });
      return;
    }

    // Validate mobile number format (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(doctorInfo.mobile)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid mobile number format. It should contain 10 digits.",
      });
      return;
    }

    // Validate latitude and longitude format
    const coordinateRegex = /^-?\d+(\.\d+)?$/;
    if (
      !coordinateRegex.test(doctorInfo.latitude) ||
      !coordinateRegex.test(doctorInfo.longitude)
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid latitude or longitude format.",
      });
      return;
    }

    // Validate minimum length for the about field
    if (doctorInfo.about.length < 20) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "About section should have at least 20 characters.",
      });
      return;
    }

    // Split the comma-separated strings into arrays
    const updatedDoctorInfo = {
      ...doctorInfo,
      servicesOffered: doctorInfo.servicesOffered
        .split(",")
        .map((item) => item.trim()),
      acceptedPaymentMethods: doctorInfo.acceptedPaymentMethods
        .split(",")
        .map((item) => item.trim()),
    };

    // Send the updatedDoctorInfo object to backend along with the image URL
    try {
      setLoading2(true);

      const response = await axios.post(
        "http://localhost:5000/api/doctors",
        updatedDoctorInfo
      );

      // Handle the response from the backend
      console.log("Backend response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Doctor information saved successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error saving doctor information.",
      });
      console.error("Error sending data to the backend:", error);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div>
      <div className="py-10 lg:py-20 px-16 lg:px-96 md:px-64 flex flex-col">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-[#004AAD]">
            Add Doctor Details
          </h2>
        </div>
        <div className="mb-6 flex sm:flex-row justify-center">
          <img
            className="rounded-full"
            src={
              imgUrl
                ? imgUrl
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="avatar"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="profilePicUrl" className="block mb-2 font-semibold">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicUrl"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={doctorInfo.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={doctorInfo.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block mb-2 font-semibold">
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              maxLength={10}
              value={doctorInfo.mobile}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="specialization"
              className="block mb-2 font-semibold"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={doctorInfo.specialization}
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
              value={doctorInfo.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="town" className="block mb-2 font-semibold">
              Town
            </label>
            <input
              type="text"
              id="town"
              name="town"
              value={doctorInfo.town}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block mb-2 font-semibold">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={doctorInfo.latitude}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block mb-2 font-semibold">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={doctorInfo.longitude}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="about" className="block mb-2 font-semibold">
              About
            </label>
            <textarea
              id="about"
              name="about"
              value={doctorInfo.about}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="qualifications"
              className="block mb-2 font-semibold"
            >
              Qualifications
            </label>
            <input
              type="text"
              id="qualifications"
              name="qualifications"
              value={doctorInfo.qualifications}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block mb-2 font-semibold">
              Experience
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={doctorInfo.experience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="servicesOffered"
              className="block mb-2 font-semibold"
            >
              Services Offered (comma-separated)
            </label>
            <input
              type="text"
              id="servicesOffered"
              name="servicesOffered"
              value={doctorInfo.servicesOffered}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="officeHours" className="block mb-2 font-semibold">
              Office Hours
            </label>
            <input
              type="text"
              id="officeHours"
              name="officeHours"
              value={doctorInfo.officeHours}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="acceptedPaymentMethods"
              className="block mb-2 font-semibold"
            >
              Accepted Payment Methods (comma-separated)
            </label>
            <input
              type="text"
              id="acceptedPaymentMethods"
              name="acceptedPaymentMethods"
              value={doctorInfo.acceptedPaymentMethods}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {loading2 && <Spinner />}
          <div className="pt-10 pb-10">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
