import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosAPI from "../../apis/axios";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "../../components/Loader";

const UpdateDoctor = () => {
  const { email } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    AxiosAPI.get(`doctors/${email}`)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  }, [email]);

  console.log(doctor);

  const [loading2, setLoading2] = useState(false);

  const [doctorInfo, setDoctorInfo] = useState({
    // Initialize with existing doctor's information
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

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    // Update the doctorInfo state with the fetched data
    if (doctor) {
      setDoctorInfo(doctor);
      setImgUrl(doctor.profilePicUrl);
    }
  }, [doctor]);

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
        setImgUrl(response.data.secure_url);
        setDoctorInfo({
          ...doctorInfo,
          profilePicUrl: response.data.secure_url,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Image upload failed.",
        });
        console.error("Image upload failed.");
      }
    } catch (error) {
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

    try {
      setLoading2(true);

      const response = await AxiosAPI.put(`doctors`, doctorInfo);

      console.log("Backend response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Doctor information updated successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating doctor information.",
      });
      console.error("Error sending data to the backend:", error);
    } finally {
      setLoading2(false);
    }
  };

  const showUpdateConfirmation = (e) => {
    // Accept an event object as a parameter
    e.preventDefault(); // Prevent the default behavior of the event
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
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update the doctor's details.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(e); // Pass the event object to handleSubmit
      }
    });
  };

  return (
    <div>
      {doctor ? (
        <div>
          <div className="py-10 lg:py-20 px-16 lg:px-96 md:px-64 flex flex-col">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-[#004AAD]">
                Update Doctor Details
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
                <label
                  htmlFor="profilePicUrl"
                  className="block mb-2 font-semibold"
                >
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
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  name="mobile"
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
                <label
                  htmlFor="experience"
                  className="block mb-2 font-semibold"
                >
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
                <label
                  htmlFor="officeHours"
                  className="block mb-2 font-semibold"
                >
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

              {loading2 && (
                <div>
                  <Spinner />
                </div>
              )}
              <div className="pt-10 pb-10">
                <button
                  type="button"
                  onClick={showUpdateConfirmation}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Doctor Details
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default UpdateDoctor;
