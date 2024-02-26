import React from "react";
import "./style.css";
import BookingStepsCard from "../../components/BookingStepsCard/BookingStepsCard";
import BookingDetailsCard from "../../components/BooknowCards/BookingDetailsCard/BookingDetailsCard";

import CompleteBook from "../../layouts/CompleteBooking/CompleteBooking";

type Props = {};

const BookNow = (props: Props) => {

  return (
    <div id="bookNow">

      {/* BOOKING STEPS CARD AND HEADER*/}
      <div className="container-fluid text-center border-bottom py-4">
        <BookingStepsCard stepPage="BookNow"></BookingStepsCard>
        <h1 className="book-now-title">Check & Complete Booking</h1>
      </div>

      <div className="container mt-5">
        
        <div className="row">

          {/* BOOKING DETAILS CARD */}
          <div className="col-4">
            <BookingDetailsCard />
          </div>
          <div className="col-8">
            <CompleteBook />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BookNow;
