import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosAPI from "../../apis/axios";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "../../components/Loader";

const UpdateTreatment = () => {
  const { id } = useParams();
  const [treatment, setTreatment] = useState(null);

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  useEffect(() => {
    AxiosAPI.get(`treatments/${id}`)
      .then((response) => {
        setTreatment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching treatment data:", error);
      });
  }, [id]);

  const [loading, setLoading] = useState(false);

  const [treatmentInfo, setTreatmentInfo] = useState({
    // Initialize with existing treatment's information
    title: "",
    type: "",
    description: "",
    photoUrl: "",
  });

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    // Update the treatmentInfo state with the fetched data
    if (treatment) {
      setTreatmentInfo(treatment);
      setImgUrl(treatment.photoUrl);
    }
  }, [treatment]);

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
        setImgUrl(response.data.secure_url);
        setTreatmentInfo({
          ...treatmentInfo,
          photoUrl: response.data.secure_url,
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

    if (
      !treatmentInfo.title ||
      !treatmentInfo.type ||
      !treatmentInfo.description
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

      const response = await AxiosAPI.put(`treatments/${id}`, treatmentInfo);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Treatment information updated successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating treatment information.",
      });
      console.error("Error sending data to the backend:", error);
    } finally {
      setLoading(false);
    }
  };

  const showUpdateConfirmation = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update the treatment details.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(e);
      }
    });
  };

  return (
    <div>
      {treatment ? (
        <div>
          <div className="py-10 lg:py-20 px-16 lg:px-96 md:px-64 flex flex-col">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-[#004AAD]">
                Update Treatment Details
              </h2>
            </div>
            <div className="mb-6 flex sm:flex-row justify-center">
              <img
                className="rounded-md w-96"
                src={
                  imgUrl
                    ? imgUrl
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="treatmentimage"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="photoUrl" className="block mb-2 font-semibold">
                  Treatment Image
                </label>
                <input
                  type="file"
                  id="photoUrl"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-2"
                />
              </div>

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
                  required
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
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={treatmentInfo.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {loading && (
                <div style={overlayStyles}>
                  <Spinner />
                </div>
              )}
              <div className="pt-10 pb-10">
                <button
                  type="button"
                  onClick={showUpdateConfirmation}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Treatment Details
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div style={overlayStyles}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default UpdateTreatment;
