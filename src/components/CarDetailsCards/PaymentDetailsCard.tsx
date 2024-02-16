import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CarModel } from "../../models/response/CarModel";
import DateChooser from "../DateChooser/DateChooser";
import {
  addRentalSelectedCar,
  handleRentalEndDate,
  handleRentalStartDate,
  handleRentalTotalPrice,
} from "../../store/rentalSlice";
import { RootState } from "../../store/configureStore";
import { calculateDatesDifference } from "../../utils/formatDate";
import { Button } from "react-bootstrap";
import RentalService from "../../services/RentalService";
import { RentalResponseModel } from "../../models/response/RentalResponseModel";
import { setStepLevel } from "../../store/stepsSlice";

type Props = {
  car: CarModel;
  screenWidth: boolean;
};

export const PaymentDetailsCard = (props: Props) => {
  
  const screenWidth = props.screenWidth;
  const rentalState = useSelector((state: RootState) => state.rental.rental);
  const loginState = useSelector((state:RootState) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Car
  const car = props.car;

  // Date
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date(rentalState.startDate));
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date(rentalState.endDate));
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
    console.log(rentals); 
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

  //BUTTON CLICK EVENT
  //Function that updates the rental state.
  //Rental State is changed only on the button click event.
  const addReceivedDatasToRentalState = () => {
    if (car && isAvailable) {
      if (loginState.isLoggedIn)
        dispatch(setStepLevel(1));
      else
        dispatch(setStepLevel(0));
      dispatch(handleRentalStartDate(serializedStartDate));
      dispatch(handleRentalEndDate(serializedEndDate));
      dispatch(addRentalSelectedCar(car));
      dispatch(handleRentalTotalPrice(totalPrice));
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
        {/* RESERVATION DETAIL TABLE */}
        <table
          id="payment-table"
          className="table table-borderless w-75 "
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
            {/* Delivery row */}
            <tr >
              <td className="col-4 text-start align-middle">
                <h6 style={{ color: "rgb(38, 214, 117)" }}> Delivery from</h6>
              </td>
              <td className="col-8 text-center">
                <div className="d-flex justify-content-center">
                  İstanbul Havalimanı
                </div>
              </td>
            </tr>
            {/* Arrival row */}
            <tr >
              <td className="col-4 text-start align-middle">
                <h6 style={{ color: "rgb(38, 214, 117)" }}> Delivery from</h6>
              </td>
              <td className="col-8 text-center">
                <div className="d-flex justify-content-center">
                  İstanbul Sabiha Gökçen Havalimanı
                </div>
              </td>
            </tr>

            {/* Start Date row */}
            <tr id="days" className="table-group-divider">
              <td className="col-4 text-start align-middle">
                <h6 style={{ color: "rgb(38, 214, 117)" }}> Start Date:</h6>
              </td>
              <td className="col-8 text-center">
                {/* Choose - Start Date row */}
                <div className="d-flex justify-content-center">
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
                <div className="d-flex justify-content-center">
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
              <td className="col-4">
                <h6> Daily Price: </h6>
              </td>
              <td className="col-8 text-center">
                <h5>₺{car.dailyPrice}</h5>
              </td>
            </tr>
            {/* Total price row */}
            <tr id="total-price">
              <td className="col-4">
                <h6> Total Price: </h6>
              </td>
              <td className="col-8 text-center">
                <h5>₺{totalPrice}</h5>
              </td>
            </tr>
          </tbody>
        </table>

        {/* BOOK NOW BUTTON */}
        <div
          id="book-now-button"
          className="buton row d-flex justify-content-center"
        >
          <Button
            className="custom-btn w-75 shadow p-3 mb-2 rounded"
            onClick={addReceivedDatasToRentalState}
          >
            <b>Book Now</b>
          </Button>
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
