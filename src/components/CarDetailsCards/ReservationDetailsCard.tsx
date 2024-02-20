import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CarModel } from "../../models/response/CarModel";
import DateChooser from "../DateChooser/DateChooser";
import {
  addRentalSelectedCar,
  handleRentalDropOffLocation,
  handleRentalEndDate,
  handleRentalPickUpLocation,
  handleRentalStartDate,
  handleRentalTotalPrice,
} from "../../store/rentalSlice";
import { RootState } from "../../store/configureStore";
import { calculateDatesDifference } from "../../utils/formatDate";
import { Button } from "react-bootstrap";
import RentalService from "../../services/RentalService";
import { RentalResponseModel } from "../../models/response/RentalResponseModel";
import { setStepLevel } from "../../store/stepsSlice";
import { Field, Form, Formik } from "formik";
import CustomSelect, { OptionType } from "../CustomSelect/CustomSelect";
import { locations } from "../../utils/locations";
import { handleFilterEndDate, handleFilterStartDate } from "../../store/filterSlice";

type Props = {
  car: CarModel;
  screenWidth: boolean;
};

export const ReservationDetailsCard = (props: Props) => {

  const screenWidth = props.screenWidth;
  const filterState = useSelector((state: RootState) => state.filter);
  const rentalLocationState = useSelector((state: RootState) => state.rental.locations);
  const loginState = useSelector((state:RootState) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Car
  const car = props.car;

  // Date
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date(filterState.startDate));
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date(filterState.endDate));
   //  Converting dates to JSON string format to send them Redux store as a seriliazed value
  const serializedStartDate = selectedStartDate.toJSON();
  const serializedEndDate = selectedEndDate.toJSON();

  const [days, setDays] = useState<number>(1);

  //  Total Price
  const [totalPrice, setTotalPrice] = useState<number>(car.dailyPrice);

  // Rentals response
  const [rentalsResponse, setRentalsResponse] = useState<RentalResponseModel[]>([]);
  // The variable indicating whether a valid date is chosen.
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  // The variable holding the error message to be displayed via the JSX element with id "warning-message".
  const [errorMessage, setErrorMessage] = useState("");

  let  alreadyFetch = 0;

  useEffect(() => {
    if (!alreadyFetch++) // This line ensures that rentals fetched only once during initial component mount
      fetchRentals();
    calculateTotalPrice(days);
    availabilityCheck();
  }, [selectedEndDate, selectedStartDate, days]);


  const fetchRentals =() => {
    RentalService.getAll().then((response) => {
      setRentalsResponse(response.data);
      return response.data;
    })
  }

  // Function to check the availability of the car on selected days
  const availabilityCheck = () => {
    // listing all previous leases of the car that have not yet been returned
    const rentals : RentalResponseModel[] | undefined = rentalsResponse.filter((rental) => rental.car.id === car.id && calculateDatesDifference(new Date(), new Date(rental.endDate)) >= 0);
    setErrorMessage("");
    let isExist = rentals?.some(rental =>
              calculateDatesDifference(new Date(rental.endDate), new Date(selectedStartDate)) <= 0 &&
              calculateDatesDifference(new Date(selectedEndDate), new Date(rental.startDate)) <= 0)
    setIsAvailable(!isExist);
  }

  // Date Choosing Functions for date picker
  //    Start date:
  const handleStartDateChange = (date: Date) => {
      setSelectedStartDate(date);
      if (calculateDatesDifference(date, selectedEndDate) < 0)
        setSelectedEndDate(date);
      calculateReservationDays(date ,selectedEndDate);
  };
  //    End date:
  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date);
    calculateReservationDays(selectedStartDate, date);
  };

  // Number of Reservation days
  const calculateReservationDays = (startDate: Date, endDate: Date): number => {
    let datesDifference = calculateDatesDifference(startDate, endDate);
    if(datesDifference == 0) datesDifference = 1; // This line allows us daily/hourly renting
    setDays(datesDifference);
    return days;
  };

  //Total Price
  // Function to calculate the total price based on the total number of days and the daily amount of the car
  const calculateTotalPrice = (days: number) => {
    calculateReservationDays(selectedStartDate, selectedEndDate);
    setTotalPrice(car.dailyPrice * days);
  };

  // FORMIK OBJECT DEFINITIONS AND VALIDATIONS
  //  Define options for pickup and dropoff locations by mapping location data
  const locationOptions : OptionType[] = locations.map((location, i) => {return {label: location.name, value: i}});
  //  Define the shape of form values
  interface ValuesType {
    pickupOption: OptionType | null;
    dropoffOption: OptionType | null;
  }
  //  Initialize form values with null
  const initialLocations : ValuesType = {
    pickupOption : null,
    dropoffOption : null,
  }
  const selectedLocations = () : ValuesType => {
    let pickupOption = null;
    let dropoffOption = null;
    if (rentalLocationState.pickUp?.name)
      pickupOption = {label: rentalLocationState.pickUp.name, value: locations.findIndex((location) => location.name === rentalLocationState.pickUp.name)};
    if (rentalLocationState.dropOff?.name)
      dropoffOption = {label: rentalLocationState.dropOff.name, value: locations.findIndex((location) => location.name === rentalLocationState.dropOff.name)};
    return {pickupOption: pickupOption, dropoffOption: dropoffOption};
  }
  //  Validation function for checking if a location is selected
  function validateLocations (value : OptionType) : string | undefined {
    if (!value)
      return "Please select a location!";
    return undefined;
  };

  // BUTTON CLICK EVENT
  //  Function that updates the rental state.
  //  Rental and filter states are changed only on the button click event.
  const addReceivedDatasToRentalState = (values : ValuesType) => {
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
    else {
      setErrorMessage("The vehicle is not available on the selected dates.");
    }
  };

  return (
    <div className="container-fluid mt-5" style={{ marginRight: 15 }}>
      <div
        className={`row d-flex justify-content-center ${
          screenWidth ? "custom-fixed" : ""
        }`}
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
            className="table table-borderless w-75 justify-content-center"
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
                      selectedValues={selectedLocations().pickupOption}
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
                      selectedValues={selectedLocations().dropoffOption}
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
            className="row d-flex justify-content-center"
            style={{color: "red"}}>
              {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
