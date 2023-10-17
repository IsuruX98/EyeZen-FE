import React from "react";
import Router from "../router/Router";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import AdminNavbar from "../components/AdminNavBar";

import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Layouts = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user?.isAdmin === true ? (
        <>
          <AdminNavbar />
          <Router />
          <Footer />
        </>
      ) : (
        <>
          <Navbar />
          <Router />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layouts;
