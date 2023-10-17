import React from "react";
import Modal from "react-modal";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const modalStyle = {
  content: {
    width: "70%",
    height: "70%",
    margin: "auto",
    overflow: "auto",
  },
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

Modal.setAppElement("#root");

const DoctorPin = ({ isOpen, onClose, doctor }) => {
  const center = {
    lat: parseFloat(doctor.latitude),
    lng: parseFloat(doctor.longitude),
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Doctor Location"
      style={modalStyle}
      overlayClassName="fixed inset-0 bg-gray-700 opacity-95 flex justify-center items-center"
      className="bg-white rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">
        Doctor Location
      </h2>
      <LoadScript googleMapsApiKey="AIzaSyBSzNtimwLewNypgLnzfpq0fnr26Nfs0no">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          className="rounded-md shadow-md"
        >
          <Marker
            position={{
              lat: parseFloat(doctor.latitude),
              lng: parseFloat(doctor.longitude),
            }}
          />
        </GoogleMap>
      </LoadScript>
      <button
        onClick={onClose}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
      >
        Close
      </button>
    </Modal>
  );
};

export default DoctorPin;
