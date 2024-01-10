import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css"
import Navbar from "./layouts/Navbar/Navbar";
import { Route, Routes} from "react-router-dom";
import Dashboard from "./layouts/Dashboard/Dashboard";
import FourOhFour from "./layouts/404/FourOhFour";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="*" element={<FourOhFour/>}/>
      </Routes>
    </>
  );
}

export default App;
