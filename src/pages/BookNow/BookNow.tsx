import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import CustomerService from "../../services/CustomerService";
import { RootState } from "../../store/configureStore";
import { CustomerModel } from "../../models/requests/CustomerModel";
import { AddRentalRequestModel } from "../../models/requests/AddRentalRequestModel";
import RentalService from "../../services/RentalService";
import Popup from "../../components/SubmitBookingPopUp/SubmitBookingPopUp";
import BookingStepsCard from "../../components/BookingStepsCard/BookingStepsCard";
import BookingDetailsCard from "../../components/BookingDetailsCard/BookingDetailsCard";
import CustomerFormCard from "../../components/CustomerFormCard/CustomerFormCard";
import PaymentDetailsCard from "../../components/PaymentDetailsCard/PaymentDetailsCard";
import { setStepLevel } from "../../store/stepsSlice";

type Props = {};

const BookNow = (props: Props) => {
  const [rentalId, setRentalId] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const CustomerState = useSelector(
    (state: RootState) => state.customer.customer
  );
  const RentalState = useSelector((state: RootState) => state.rental.rental);
  const dispatch = useDispatch();
  //const IsBookedState = useSelector((state: RootState) => state.booking.isBookedCompleted);

  const togglePopup = () => {
    console.log("Toggle popup is working"); //Delete!!!!!
  };

  const CompleteBooking = async () => {
    console.log("Completing booking button works: "); //Delete!!!!!
    const customerModel: CustomerModel = {
      firstName: CustomerState.firstName,
      lastName: CustomerState.lastName,
      birthdate: CustomerState.birthdate,
      internationalId: CustomerState.internationalId,
      licenceIssueDate: CustomerState.licenceIssueDate,
      userId: 1,
    };

    const rentalModel: AddRentalRequestModel = {
      startDate: new Date(RentalState.startDate),
      endDate: new Date(RentalState.endDate),
      carId: RentalState.car.id,
      userId: 1,
    };

    dispatch(setStepLevel(3));
    
    try {
      await Promise.all([
        RentalService.add(rentalModel),
        CustomerService.add(customerModel),
      ]);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error while adding customer or rental", error);
    }
  };
  return (
    <div id="bookNow">
      <div className="container-fluid text-center border-bottom py-4">
        <BookingStepsCard stepPage="BookNow"></BookingStepsCard>
        <h1>Check & Complete Booking</h1>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-4">
            <BookingDetailsCard></BookingDetailsCard>
          </div>
          <div className="col-8">
            <CustomerFormCard />
            <PaymentDetailsCard />
            <div className="col-12 fw-bold mb-2">
              <button className="btn btn-success" onClick={CompleteBooking}>
                Complete Booking
              </button>
              {isPopupOpen && (
                <Popup onClose={togglePopup} rentalId={rentalId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
