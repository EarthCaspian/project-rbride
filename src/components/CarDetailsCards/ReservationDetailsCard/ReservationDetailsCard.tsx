import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CarModel } from "../../../models/response/CarModel";
import DateChooser from "../../DateChooser/DateChooser";
import {
  addRentalSelectedCar,
  handleRentalDropOffLocation,
  handleRentalEndDate,
  handleRentalPickUpLocation,
  handleRentalStartDate,
  handleRentalTotalPrice,
} from "../../../store/rentalSlice";
import { RootState } from "../../../store/configureStore";
import { calculateDatesDifference } from "../../../utils/formatDate";
import { Button } from "react-bootstrap";
import RentalService from "../../../services/RentalService";
import { RentalResponseModel } from "../../../models/response/RentalResponseModel";
import { setStepLevel } from "../../../store/stepsSlice";
import { Field, Form, Formik } from "formik";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { locations } from "../../../utils/locations";
import { handleFilterEndDate, handleFilterStartDate } from "../../../store/filterSlice";
import { LocationsValuesType, availabilityCheck, calculateReservationDays, calculateTotalPrice, initialLocations, locationOptions, selectedLocations, validateLocations } from "./helpers";


type Props = {
  car: CarModel;
};

export const ReservationDetailsCard = (props: Props) => {

  const filterState = useSelector((state: RootState) => state.filter);
  const rentalLocationState = useSelector((state: RootState) => state.rental.locations);
  const loginState = useSelector((state:RootState) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Car
  const car = props.car;
  // Rentals response
  const [rentalsResponse, setRentalsResponse] = useState<RentalResponseModel[]>([]);
  // Date
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date(filterState.startDate));
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date(filterState.endDate));
  //  Converting dates to JSON string format to send them Redux store as a seriliazed value
  const serializedStartDate = selectedStartDate.toJSON();
  const serializedEndDate = selectedEndDate.toJSON();
  // Number of Reservation days
  const days = useMemo(() => calculateReservationDays(selectedStartDate, selectedEndDate), [selectedStartDate, selectedEndDate]);
  // Total Price
  const totalPrice = useMemo(() => calculateTotalPrice(car, days), [days]);
  // The variable indicating whether a valid date is chosen.
  const isAvailable = useMemo(() => availabilityCheck(rentalsResponse, car, selectedStartDate, selectedEndDate), [selectedStartDate, selectedEndDate, rentalsResponse]);
  // The variable holding the error message to be displayed via the JSX element with id "warning-message".
  const errorMessage = useMemo(() => isAvailable ? "" : "The vehicle is not available on the selected dates.", [isAvailable]);

  const selectedLocationOptions = selectedLocations(rentalLocationState);
  
  useEffect(() => {
    fetchRentals();
  }, []);
  
  const fetchRentals = () => {
    RentalService.getAll().then((response) => {
      setRentalsResponse(response.data);
      return response.data;
    });
  }
  
  // Date Choosing Functions for date picker
  //    Start date:
  const handleStartDateChange = (date: Date) => {
      setSelectedStartDate(date);
      if (calculateDatesDifference(date, selectedEndDate) < 0)
      setSelectedEndDate(date);
  };
  //    End date:
  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date);
  };
  
  // BUTTON CLICK EVENT
  //  Function that updates the rental state.
  //  Rental and filter states are changed only on the button click event.
  const addReceivedDatasToRentalState = (values : LocationsValuesType) => {
    if (car && isAvailable) {
      if (loginState.isLoggedIn)
        dispatch(setStepLevel(1));
      else
        dispatch(setStepLevel(0));
      dispatch(handleFilterStartDate(serializedStartDate));
      dispatch(handleFilterEndDate(serializedEndDate));
      dispatch(handleRentalStartDate(serializedStartDate));
      dispatch(handleRentalEndDate(serializedEndDate));
      dispatch(addRentalSelectedCar(car));
      dispatch(handleRentalTotalPrice(totalPrice));
      if (values.pickupOption)
        dispatch(handleRentalPickUpLocation(locations[values.pickupOption.value]));
      if (values.dropoffOption)
        dispatch(handleRentalDropOffLocation(locations[values.dropoffOption.value]));
      loginState.isLoggedIn ? navigate("/additionalservices") : navigate("/login");
    }
  };

  return (
    <div className="container-fluid mt-5" style={{ marginRight: 15 }}>
      <div
        className="row reservation-details d-flex justify-content-center"
      >
      <Formik
        initialValues={initialLocations}
        onSubmit={values => addReceivedDatasToRentalState(values)}
      >
        {({ errors }) => (
        <Form id="locations-form">
          <div className="custom-reservation-form">
          {/* RESERVATION DETAIL TABLE */}
          <table
            id="payment-table"
            className="table table-borderless justify-content-center"
            style={{ height: 0.2 }}
          >
            {/* HEADER */}
            <thead>
              <tr>
                <td colSpan={2}>
                  <p className="display-6"> Reservation Details </p>
                </td>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {/* Pick Up row */}
              <tr >
                <td className="col-4 text-start align-middle">
                  <h6 style={{ color: "rgb(38, 214, 117)" }}> Pick Up location</h6>
                </td>
                <td className="col-8">
                  <div className="custom-select-location">
                    <Field
                      name="pickupOption"
                      options={locationOptions}
                      component={CustomSelect}
                      selectedValues={selectedLocationOptions.pickupOption}
                      isMulti={false}
                      placeholder="Select location..."
                      validate={validateLocations}
                    />
                  </div>
                  {errors.pickupOption && (<div className="text-danger">Please select location.</div>)}
                </td>
              </tr>
              {/* Drop Off row */}
              <tr >
                <td className="col-4 text-start align-middle">
                  <h6 style={{ color: "rgb(38, 214, 117)" }}> Drop Off Location</h6>
                </td>
                <td className="col-8">
                  <div className="custom-select-location">
                    <Field
                      name="dropoffOption"
                      options={locationOptions}
                      component={CustomSelect}
                      selectedValues={selectedLocationOptions.dropoffOption}
                      isMulti={false}
                      placeholder="Select location..."
                      validate={validateLocations}
                    />
                  </div>
                  {errors.dropoffOption && (<div className="text-danger">Please select location.</div>)}
                </td>
              </tr>


              {/* Start Date row */}
              <tr id="days" className="table-group-divider">
                <td className="col-4 text-start align-middle">
                  <h6 style={{ color: "rgb(38, 214, 117)" }}> Start Date:</h6>
                </td>
                <td className="col-8 text-center">
                  {/* Choose - Start Date row */}
                  <div className="custom-dateChooser">
                    <DateChooser
                      selectedDate={selectedStartDate}
                      onDateChange={handleStartDateChange}
                      minDate={new Date()}
                      closeWin={true}
                    />
                  </div>
                </td>
              </tr>
              {/* End Date row */}
              <tr id="days" className="">
                <td className="col-4 text-start align-middle">
                  <h6 style={{ color: "rgb(38, 214, 117)" }}> End Date:</h6>
                </td>
                <td className="col-8 text-center">
                  {/* Choose - End Date row */}
                  <div className="custom-dateChooser">
                    <DateChooser
                      selectedDate={selectedEndDate}
                      onDateChange={handleEndDateChange}
                      minDate={selectedStartDate}
                      closeWin={true}
                    />
                  </div>
                </td>
              </tr>
              {/* Days row */}
              <tr id="days" >
                <td className="col-4 text-start align-middle">
                  <h6 style={{ color: "rgb(38, 214, 117)" }}> Days:</h6>
                </td>
                <td className="col-8 text-center">
                  <div className="d-flex justify-content-center">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      <h5 style={{ color: "rgb(38, 214, 117)" }}>{days}</h5>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Daily price row */}
              <tr id="daily-price" className="table-group-divider">
                <td className="col-4 text-start align-middle">
                  <h6> Daily Price: </h6>
                </td>
                <td className="col-8 text-center">
                  <h5>₺{car.dailyPrice}</h5>
                </td>
              </tr>
              {/* Total price row */}
              <tr id="total-price">
                <td className="col-4 text-start align-middle">
                  <h6> Total Price: </h6>
                </td>
                <td className="col-8 text-center">
                  <h5>₺{totalPrice}</h5>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </Form>
        )}
      </Formik>

        {/* BOOK NOW BUTTON */}
        <div
          id="book-now-button"
          className="button row d-flex justify-content-center"
        >
          <Button
            className="custom-btn w-75 shadow p-3 mb-2 rounded"
            type="submit"
            form="locations-form"
          >
            <b>Book Now</b>
          </Button>
          
          {/* Warning Message */}
          <p id="warning-message"
            className="row d-flex justify-content-center text-danger">
              {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
