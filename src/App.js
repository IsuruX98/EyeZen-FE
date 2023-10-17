import "./App.css";
import { React } from "react";
import { BrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layouts";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
