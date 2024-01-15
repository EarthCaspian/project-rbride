import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css"
import Navbar from "./layouts/Navbar/Navbar";
import { Route, Routes} from "react-router-dom";
import Dashboard from "./layouts/Dashboard/Dashboard";
import FourOhFour from "./layouts/404/FourOhFour";
import Cars from "./pages/Cars/Cars";
import Login from "./layouts/Login/Login";
import Register from "./layouts/Login/Register";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { CarDetails } from "./pages/CarDetails/CarDetails";


function App() {
  return (
    <>
    <Provider store={store()}>
      <Navbar />
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Dashboard />
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="*" element={<FourOhFour />} />
    </Routes>
    </Provider>
    </>
  );
}

export default App;
