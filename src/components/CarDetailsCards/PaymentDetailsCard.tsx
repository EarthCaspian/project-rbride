import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CarModel } from "../../models/response/CarModel";
import DateChooser from "../DateChooser/DateChooser";
import {
  addCarToRent,
  handleRentalEndDate,
  handleRentalStartDate,
  handleRentalTotalPrice,
} from "../../store/rentalSlice";
import { addToCart } from "../../store/cartSlice";

type Props = {
  car?: CarModel;
  screenWidth: boolean;
};

export const PaymentDetailsCard = (props: Props) => {
  
  const car = props.car;
  const screenWidth = props.screenWidth;

  const currentDate = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(currentDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(currentDate);
  const [days, setDays] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateSelection, setDateSelection] = useState<boolean>(true);
  
  const dispatch = useDispatch();
  
  //Total Price
  useEffect(() => {
    calculateTotalPrice(days);
  }, [days]);

  // DATE CHOOSING
  //    Start date
  const handleStartDateChange = (date: Date) => {
      setSelectedStartDate(date);
      if (calculateDaysDifference(date, selectedEndDate) < 0)
        setSelectedEndDate(date);
  };
  //    End date
  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date);
    calculateDaysDifference(selectedStartDate, date);
  };

  // DAYS CALCULATING
  // Function to calculate the number of days between two dates
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
    if (daysDifference < 0)
      return -1;
    setDays(daysDifference);
    return days;
  };

  const calculateTotalPrice = async (days: number): Promise<number> => {
    
    const dailyPrice = car?.dailyPrice;
    if (dailyPrice != null) {
      const daysDifference = calculateDaysDifference(
        selectedStartDate,
        selectedEndDate
      );
      const total = dailyPrice * daysDifference;
      setTotalPrice(total);
    }
    return totalPrice;
  };

  //Rental State is changed only on the button click event.
  const addTheCarToRent = () => {
    if (car && totalPrice) {
      //Both dates have been serialized to string format to comply with JSON standards.
      dispatch(handleRentalStartDate(selectedStartDate.toLocaleDateString()));
      dispatch(handleRentalEndDate(selectedEndDate.toLocaleDateString()));
      dispatch(addCarToRent(car));
      dispatch(handleRentalTotalPrice(totalPrice));
      //dispatch(addToCart(car));
    }
    else {
      setDateSelection(false);
    }
  };

  return (
    <div className="container-fluid mt-5" style={{ marginRight: 15 }}>
      <div
        className={`row d-flex justify-content-center ${
          screenWidth ? "custom-fixed" : ""
        }`}
      >
        {/* PAYMENT TABLE */}
        <table
          id="payment-table"
          className="table table-borderless w-75 "
          style={{ height: 0.2 }}
        >
          {/* HEADER */}
          <thead>
            <tr>
              <td colSpan={2}>
                <p className="display-6"> Payment Details </p>
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
                    minDate={currentDate}
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
                <h5>₺{car?.dailyPrice}</h5>
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
            onClick={addTheCarToRent}
          >
            <b>Book Now</b>
          </Link>
            <p 
              className="row d-flex justify-content-center"
              style={{color: "red"}}>
                {!dateSelection ? "Please choose a date and time." : ""}
            </p>
        </div>
      </div>
    </div>
  );
};
