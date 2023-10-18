import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "../../components/Loader";
import axiosAPI from "../../apis/axios";

const TreatmentForm = () => {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(""); // Store the Cloudinary image URL

  const [treatmentInfo, setTreatmentInfo] = useState({
    title: "",
    type: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTreatmentInfo({ ...treatmentInfo, [name]: value });
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

    // Include the image URL in the treatmentInfo object
    const updatedTreatmentInfo = {
      ...treatmentInfo,
      photoUrl: imgUrl,
    };

    if (
      !updatedTreatmentInfo.title ||
      !updatedTreatmentInfo.type ||
      !updatedTreatmentInfo.description
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Title, Type, and Description are required fields.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await axiosAPI.post("treatments", updatedTreatmentInfo);

      // Handle the response from the backend
      console.log("Backend response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Treatment added successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding treatment.",
      });
      console.error("Error sending data to the backend:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 lg:py-20 px-16 lg:px-96 md:px-64 flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-[#004AAD]">Add Treatment</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={treatmentInfo.title}
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
            value={treatmentInfo.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={treatmentInfo.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block mb-2 font-semibold">
            Photo
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-2"
          />
        </div>

        {loading && <Spinner />}
        <div className="pt-10 pb-10">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Treatment
          </button>
        </div>
      </form>
    </div>
  );
};

export default TreatmentForm;
