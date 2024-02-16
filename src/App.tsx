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
import Footer from "./layouts/Footer/Footer";
import Rentals from "./pages/Profile/Rentals/Rentals";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { AddCarForm } from "./components/AdminPanelCards/CarAdmin/AddCarForm";
import { AddBrandForm } from "./components/AdminPanelCards/BrandAdmin/AddBrandForm";
import { AddModelForm } from "./components/AdminPanelCards/ModelAdmin/AddModelForm";
import GetAllModels from "./components/AdminPanelCards/ModelAdmin/GetAllModels";
import GetAllBrands from "./components/AdminPanelCards/BrandAdmin/GetAllBrands";
import GetAllCars from "./components/AdminPanelCards/CarAdmin/GetAllCars";

import ContactPage from "./pages/Contact/ContactPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <LoadingOverlay/>
        <ToastContainer/>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Dashboard />
              </>
            }
          />
          <Route path="/admin" element={<AdminPanel/>}>
            <Route path="/admin/addCar" element={<AddCarForm/>}/>
            <Route path="/admin/getAllCars" element={<GetAllCars/>}/>
            <Route path="/admin/addBrand" element={<AddBrandForm/>}/>
            <Route path="/admin/getAllBrands" element={<GetAllBrands/>}/>
            <Route path="/admin/addModel" element={<AddModelForm/>}/>
            <Route path="/admin/getAllModels" element={<GetAllModels/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/additionalservices" element={<AdditionalService />} />
          <Route path="/booknow" element={<BookNow />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/completion" element={<BookingCompletion />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
