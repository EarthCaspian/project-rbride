import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CarModel } from "../../models/response/CarModel";
import DateChooser from "../DateChooser/DateChooser";
import {
  addRentalSelectedCar,
  handleRentalEndDate,
  handleRentalStartDate,
  handleRentalTotalPrice,
} from "../../store/rentalSlice";

type Props = {
  car: CarModel;
  screenWidth: boolean;
};

export const PaymentDetailsCard = (props: Props) => {
  const screenWidth = props.screenWidth;

  const dispatch = useDispatch();

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
  useEffect(() => {
    calculateTotalPrice(days);
  }, [days]);

  // Date Choosing Functions for date picker
  //    Start date:
  const handleStartDateChange = (date: Date) => {
      setSelectedStartDate(date);
      if (calculateDaysDifference(date, selectedEndDate) < 0)
        setSelectedEndDate(date);
      calculateDaysDifference(date ,selectedEndDate);
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
  };

  //Total Price
  // Function to calculate the total price based on the total number of days and the daily amount of the car
  const calculateTotalPrice = (days: number) => {
    calculateDaysDifference(selectedStartDate, selectedEndDate);
    setTotalPrice(car.dailyPrice * days);
  };

  //BUTTON CLICK EVENT
  //Function that updates the rental state.
  //Rental State is changed only on the button click event.
  const addReceivedDatasToRentalState = () => {
    if (car && totalPrice) {
      //Both dates have been serialized to string format to comply with JSON standards.
      dispatch(handleRentalStartDate(serializedStartDate));
      dispatch(handleRentalEndDate(serializedEndDate));
      dispatch(addRentalSelectedCar(car));
      dispatch(handleRentalTotalPrice(totalPrice));
    }
    else {
      // The variable indicating whether a valid date is chosen.
      // if set to false, triggers the display of a warning message through the JSX element with the id "warning-message".
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
          <Link 
            to={`${totalPrice ? "/additionalservices" : "" }`}
            className="custom-btn w-75 shadow p-3 mb-2 rounded"
            onClick={addReceivedDatasToRentalState}
          >
            <b>Book Now</b>
          </Link>
            <p id="warning-message"
              className="row d-flex justify-content-center"
              style={{color: "red"}}>
                {!isDateSelectionValid ? "Please choose a date!" : ""}
            </p>
        </div>
      </div>
    </div>
  );
};
