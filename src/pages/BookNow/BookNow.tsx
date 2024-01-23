import React from "react";
import "./style.css";
import BookingDetailsCard from "../../components/BookingDetailsCard/BookingDetailsCard";
import InvoiceInformationCard from "../../components/InvoiceInformationCard/InvoiceInformationCard";
import PaymentDetailsCard from "../../components/PaymentDetailsCard/PaymentDetailsCard";
import BookingStepsCard from "../../components/BookingStepsCard/BookingStepsCard";

type Props = {};

const BookNow = (props: Props) => {
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
            <InvoiceInformationCard></InvoiceInformationCard>
            <PaymentDetailsCard></PaymentDetailsCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
