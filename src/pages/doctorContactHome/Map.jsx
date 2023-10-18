import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Axios from "../../apis/axios";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const Map = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // State to store treatments data
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the backend
    Axios.get("doctors")
      .then((response) => {
        setDoctorData(response.data); // Set the data received from the backend to state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleMarkerClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseInfoWindow = () => {
    setSelectedDoctor(null);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <LoadScript googleMapsApiKey="AIzaSyBSzNtimwLewNypgLnzfpq0fnr26Nfs0no">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {doctorData.map((doctor) => (
          <Marker
            key={doctor.name}
            position={{
              lat: parseFloat(doctor.latitude),
              lng: parseFloat(doctor.longitude),
            }}
            title={doctor.name}
            onClick={() => handleMarkerClick(doctor)}
          />
        ))}
        {selectedDoctor && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedDoctor.latitude),
              lng: parseFloat(selectedDoctor.longitude) + 0.01,
            }}
            onCloseClick={handleCloseInfoWindow}
          >
            <div>
              <h2>{selectedDoctor.name}</h2>
              <p>Specialization: {selectedDoctor.specialization}</p>
              <p>Mobile: {selectedDoctor.mobile}</p>
              <p>Email: {selectedDoctor.email}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
