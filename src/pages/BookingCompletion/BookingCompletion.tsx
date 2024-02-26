import React, { useEffect, useState } from "react";
import BookingStepsCard from "../../components/BookingStepsCard/BookingStepsCard";
import { useDispatch } from "react-redux";
import { IconComponent } from "../../utils/icons";
import { clearAllFilters } from "../../store/filterSlice";
import { setStepLevel } from "../../store/stepsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import BookingSummaryCard from "../../components/CompletionCards/BookingSummaryCard/BookingSummaryCard";
import TimeAndLocationInformationCard from "../../components/CompletionCards/TimeAndLocationInformationCard/TimeAndLocationInformationCard";
import InvoicePDFCard from "../../components/CompletionCards/InvoicePDFCard/InvoicePDFCard";

type Props = {};

const BookingCompletion: React.FC = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const  [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    dispatch(setStepLevel(0));
    dispatch(clearAllFilters());
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
          <BookingSummaryCard/>
        </div>
      </div>

      <div className="container mb-4">
        <TimeAndLocationInformationCard/>
      </div>

      <InvoicePDFCard />
    </div>
  );
};

export default BookingCompletion;
