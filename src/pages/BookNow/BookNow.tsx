import React, { useEffect, useState } from "react";
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const CustomerState = useSelector((state: RootState) => state.customer);
  const RentalState = useSelector((state: RootState) => state.rental.rental);
  const UserState = useSelector((state : RootState) => state.user);
  const dispatch = useDispatch();
  //const IsBookedState = useSelector((state: RootState) => state.booking.isBookedCompleted);

  const togglePopup = () => {
    console.log("Toggle popup is working"); //Delete!!!!! 
  };

  useEffect(() => {
    CompleteBooking();
  }, [CustomerState.isValid]);

  const CompleteBooking = async () => {
     if (CustomerState.isValid) {

      const customerModel: CustomerModel = {
        firstName: CustomerState.customer.firstName,
        lastName: CustomerState.customer.lastName,
        birthdate:new Date(CustomerState.customer.birthdate),
        internationalId: CustomerState.customer.internationalId,
        licenceIssueDate: new Date(CustomerState.customer.licenceIssueDate),
        userId: UserState.userId,
      };  

      const rentalModel: AddRentalRequestModel = {
        startDate: new Date(RentalState.startDate),
        endDate: new Date(RentalState.endDate),
        carId: RentalState.car.id,
        userId: UserState.userId,
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
    }
  };
  return (
    <div id="bookNow">

      {/* BOOKING STEPS CARD */}
      <div className="container-fluid text-center border-bottom py-4">
        <BookingStepsCard stepPage="BookNow"></BookingStepsCard>
        <h1>Check & Complete Booking</h1>
      </div>

      <div className="container mt-5">
        <div className="row">

          {/* BOOKING DETAILS CARD */}
          <div className="col-4">
            <BookingDetailsCard></BookingDetailsCard>
          </div>
          <div className="col-8">
            {/* CUSTOMER FORM CARD */}
            <CustomerFormCard />
            {/* PAYMENT DETAILS CARD */}
            <PaymentDetailsCard />

            {/* COMPLETE BOOKING BUTTON */}
            <div className="col-12 fw-bold mb-2">
              <button id="complete-booking" 
                  className="btn btn-success" 
                  form="customer-form" 
                  type="submit"
                  onClick={CompleteBooking}
              >
                Complete Booking
              </button>

              {isPopupOpen && (
                <Popup onClose={togglePopup} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
