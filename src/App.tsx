import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./layouts/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./layouts/Dashboard/Dashboard";
import FourOhFour from "./layouts/404/FourOhFour";
import Cars from "./pages/Cars/Cars";
import Login from "./layouts/Login/Login";
import Register from "./layouts/Login/Register";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { CarDetails } from "./pages/CarDetails/CarDetails";
import BookNow from "./pages/BookNow/BookNow";
import AdditionalService from "./pages/AdditionalService/AdditionalService";
import BookingCompletion from "./pages/BookingCompletion/BookingCompletion";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import Profile from "./pages/Profile/Profile/Profile";
import Rentals from "./pages/Profile/Rentals/Rentals";


function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <LoadingOverlay/>
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
          <Route path="/additionalservices" element={<AdditionalService />} />
          <Route path="/booknow" element={<BookNow />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/completion" element={<BookingCompletion />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
