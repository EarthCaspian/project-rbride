import React, { useEffect, useState } from "react";
import BookingStepsCard from "../../components/BookingStepsCard/BookingStepsCard";
import { useDispatch, useSelector } from "react-redux";
import { IconComponent } from "../../utils/icons";
import { clearAllFilters } from "../../store/filterSlice";
import { setStepLevel } from "../../store/stepsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import BookingSummaryCard from "../../components/CompletionCards/BookingSummaryCard/BookingSummaryCard";
import TimeAndLocationInformationCard from "../../components/CompletionCards/TimeAndLocationInformationCard/TimeAndLocationInformationCard";
import InvoicePDFCard from "../../components/CompletionCards/InvoicePDFCard/InvoicePDFCard";
import { RootState } from "../../store/configureStore";
import { RentalState, clearAllStatesForRental } from "../../store/rentalSlice";

type Props = {};

const BookingCompletion: React.FC = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  
  const rentalState = useSelector((state: RootState) => state.rental);

  // The rentalState variable is cleared when the component mounts. 
  // This variable is created to allow users to continue viewing rental information when they refresh the page.
  const storedRentalData : RentalState = JSON.parse(localStorage.getItem("storedRental") || JSON.stringify({}));

  useEffect(() => {
    if (rentalState.rental.car.id !== 0)
      localStorage.setItem("storedRental", JSON.stringify(rentalState));
    dispatch(setStepLevel(0));
    dispatch(clearAllFilters());
    dispatch(clearAllStatesForRental());
  }, []);

  useEffect (() => {
    setCurrentPage(location.pathname);
    // Call handleBackButton function when the back button is pressed
    window.addEventListener('popstate', handleBackButton);
    return () => {
      // window.removeEventListener('popstate', handleBackButton);
    }
  }, []);

  const handleBackButton = (event : PopStateEvent) => {
    event.preventDefault(); // Prevent the default behavior of the back button
    // Show a confirmation message to keep the user on the page
    // alert("Rental successfully processed. Navigating back will redirect you to the homepage.");
    const confirmation = window.confirm("Rental successfully processed. Navigating back will redirect you to the homepage. Are you sure?");
    if (confirmation) {
      navigate('/');
    }
    else if (!confirmation){
       navigate(currentPage);
    }
    window.removeEventListener('popstate', handleBackButton);
};

  return (
    <div>
      <BookingStepsCard stepPage="StepCompletion"></BookingStepsCard>

      <div className="container text-center mt-5">
        <h2 className="">Thank you for selecting our services!</h2>
        <p>
          <IconComponent iconName="Mailbox" />
          Booking details have been sent to your email address. Please check
          your mailbox.
        </p>

        {/* Booking Summary Card */}
        <div className="card mb-3">
          {storedRentalData.rental && <BookingSummaryCard rentalState={storedRentalData.rental}/>}
        </div>
      </div>

      <div className="container mb-4">
        {storedRentalData.rental && <TimeAndLocationInformationCard rentalState={storedRentalData}/>}
      </div>

      {storedRentalData.rental && <InvoicePDFCard rentalState={storedRentalData}/>}
    </div>
  );
};

export default BookingCompletion;
