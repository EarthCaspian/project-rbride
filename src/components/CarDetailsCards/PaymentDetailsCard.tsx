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
import { calculateDatesDifference, formatLocalDateToYYYYMMDD } from "../../utils/formatDate";
import { Button } from "react-bootstrap";
import { RentalModel } from "../../models/response/RentalModel";
import RentalService from "../../services/RentalService";
import CarService from "../../services/CarService";
import { filterCarByDates } from "../../utils/filterCarsByOptions";

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
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
    //  Converting dates to JSON string format to send them Redux store as a seriliazed value
  const serializedStartDate = selectedStartDate.toJSON();
  const serializedEndDate = selectedEndDate.toJSON();

  const [days, setDays] = useState<number>(1);
 
  const [isDateSelectionValid, setIsDateSelectionValid] = useState<boolean>(true);
  
  //  Total Price
  const [totalPrice, setTotalPrice] = useState<number>(car.dailyPrice);
  const [rentalsResponse, setRentalsResponse] = useState<RentalModel[]>([]);
  const [carsResponse, setCarsResponse] = useState<CarModel[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  let  alreadyFetch = 0;
  //Total Price
  useEffect(() => {
    calculateTotalPrice(days);
    if (!alreadyFetch++)
      fetchCarsAndRentals();
  }, [selectedEndDate, selectedStartDate, days]);

  
  const fetchCarsAndRentals = async () => {
    try {
      const [carsResponse, rentalsResponse] = await Promise.all([
        CarService.getAll(),
        RentalService.getAll()
      ]);
      setCarsResponse(carsResponse.data);
      setRentalsResponse(rentalsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Date Choosing Functions for date picker
  //    Start date:
  const handleStartDateChange = (date: Date) => {
      setSelectedStartDate(date);
      if (calculateDatesDifference(date, selectedEndDate) < 0)
        setSelectedEndDate(date);
      calculateDaysDifference(date ,selectedEndDate);
      // setDays(calculateDatesDifference(selectedStartDate, selectedEndDate));
  };
  //    End date:
  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date);
    calculateDaysDifference(selectedStartDate, date);
  };

  // Number of Reservation days
  const calculateDaysDifference = (startDate: Date, endDate: Date): number => {
    // Convert both dates to UTC to ensure consistency
    const utcStartDate = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const utcEndDate = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );
    // Calculate the difference in milliseconds
    const timeDifference = utcEndDate - utcStartDate;
    // Convert the difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysDifference < 0) return -1;  // End Date can not be earlier than start date
    if(daysDifference == 0) return 1;   // This line allows us daily/hourly renting
    else setDays(daysDifference);
    return days;
    // setDays(calculateDatesDifference(selectedStartDate, date));
  };

  //Total Price
  // Function to calculate the total price based on the total number of days and the daily amount of the car
  const calculateTotalPrice = (days: number) => {
    setDays(calculateDatesDifference(selectedStartDate, selectedEndDate));
    setTotalPrice(car.dailyPrice * days);
  };

  //BUTTON CLICK EVENT
  //Function that updates the rental state.
  //Rental State is changed only on the button click event.
  const addReceivedDatasToRentalState = () => {
      //Both dates have been serialized to string format to comply with JSON standards.

    //Both dates have been serialized to string format to comply with JSON standards.
    //dispatch(handleRentalStartDate(selectedStartDate.toLocaleDateString()));
    //dispatch(handleRentalEndDate(selectedEndDate.toLocaleDateString()));
    dispatch(addRentalSelectedCar(car));
    dispatch(handleRentalTotalPrice(totalPrice));
    //Check whether this car is available for rent on the selected dates. If it is not, isAvailable variable set undefined,so it cannot pass the condition.
    const isAvailable = filterCarByDates(carsResponse, rentalsResponse, rentalState).find(filteredCar => filteredCar.id === car.id);

    if (car && isAvailable && totalPrice) {

      dispatch(handleRentalStartDate(serializedStartDate));
      dispatch(handleRentalEndDate(serializedEndDate));
      dispatch(addRentalSelectedCar(car));
      dispatch(handleRentalTotalPrice(totalPrice));
      loginState.isLoggedIn ? navigate("/additionalservices") : navigate("/login");
    }
    else {
      // The variable indicating whether a valid date is chosen.
      // if set to false, triggers the display of a warning message through the JSX element with the id "warning-message".
      setErrorMessage("The vehicle is not available on the selected dates.")
      if (isAvailable)
        setErrorMessage("Please choose at least 1 day.");
      setIsDateSelectionValid(false);
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
                {!isDateSelectionValid ? errorMessage : ""}
            </p>
        </div>
      </div>
    </div>
  );
};
