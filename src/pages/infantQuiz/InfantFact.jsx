import React, { useState } from "react";
import axios from "../../apis/axios";
import Swal from "sweetalert2";
import { storage } from "../../utils/FireBaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { FaTrash } from "react-icons/fa";

const CreateFact = () => {
  const [title, setTitle] = useState("");
  const [descriptionText, setDescriptionText] = useState([""]);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      Swal.fire({
        title: "Error",
        text: "Please select an image file",
        icon: "error",
      });
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const fileType = selectedImage.type;

    if (!allowedTypes.some((type) => fileType.includes(type))) {
      Swal.fire({
        title: "Error",
        text: "Please upload a valid image file (JPEG, JPG, or PNG)",
        icon: "error",
      });
      return;
    }

    setIsUploading(true);

    const imageRef = ref(storage, `infantFacts/${selectedImage.name + v4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, selectedImage);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Error uploading image.");
      setIsUploading(false);
    }
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...descriptionText];
    updatedDescriptions[index] = value;
    setDescriptionText(updatedDescriptions);
  };

  const addDescriptionInput = () => {
    setDescriptionText([...descriptionText, ""]);
  };

  const removeDescriptionInput = (index) => {
    const updatedDescriptions = [...descriptionText];
    updatedDescriptions.splice(index, 1);
    setDescriptionText(updatedDescriptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      Swal.fire({
        title: "Error",
        text: "Please wait for the image to finish uploading.",
        icon: "error",
      });
      return;
    }

    if (!title) {
      Swal.fire({
        title: "Error",
        text: "Title is required.",
        icon: "error",
      });
      return;
    }

    if (descriptionText.every((description) => !description)) {
      Swal.fire({
        title: "Error",
        text: "At least one fact is required.",
        icon: "error",
      });
      return;
    }

    const descriptionArray = descriptionText
      .filter((description) => description.trim() !== "")
      .join(", ");

    try {
      const response = await axios.post("infantFact", {
        title: title,
        description: descriptionArray,
        imageURL: imageUrl,
      });

      if (response.status === 201) {
        setTitle("");
        setDescriptionText([""]);
        setImageUrl("");
        setErrorMessage("");
        Swal.fire({
          title: "Success",
          text: "Infant fact added successfully",
          icon: "success",
        });
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred while adding the infant fact.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mb-20">
      <h1 className="text-3xl font-bold mb-4 text-blue-600 pt-10 font-sans text-center pb-8">
        Add Infant Fact
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-slate-100"
            disabled={isUploading}
          />
        </div>
        <div className="mb-10">
          <label className="block text-gray-700">Facts</label>
          {descriptionText.map((description, index) => (
            <div key={index} className="mb-2 relative">
              <input
                type="text"
                value={description}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                className="border rounded px-3 py-2 w-full bg-slate-100"
                disabled={isUploading}
              />
              <button
                type="button"
                onClick={() => removeDescriptionInput(index)}
                className="absolute top-0 right-0 mt-1 mr-2 p-1 text-red-500 cursor-pointer"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDescriptionInput}
            className="bg-green-500 text-white px-4 py-2 rounded hover-bg-green-600 mt-2"
            disabled={isUploading}
          >
            Add Fact
          </button>
        </div>
        <div className="mb-10">
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block"
            disabled={isUploading}
          />
        </div>
        {isUploading && (
          <div className="mb-4">
            <p className="text-gray-700">Uploading image...</p>
          </div>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {imageUrl && (
          <div className="mb-4">
            <p className="block">Uploaded Image:</p>
            <img src={imageUrl} alt="Uploaded" width="200" className="mt-2" />
          </div>
        )}
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600 ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUploading}
        >
          {isUploading ? "Adding Fact..." : "Add Fact"}
        </button>
      </form>
    </div>
  );
};

export default CreateFact;
