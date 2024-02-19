import React, { useEffect } from "react";
import "./SubmitBookingPopUp.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { Link } from "react-router-dom";
import {
  handleDiscountRateForInvoice,
  handleInvoiceNoForInvoice,
  handleTaxRateForInvoice,
  handleTotalPriceForInvoice,
} from "../../store/invoiceSlice";

interface Props {
  onClose: () => void;
}

const SubmitBookingPopUp: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const rentalState = useSelector((state: RootState) => state.rental.rental);
  const rentalExtraState = useSelector((state: RootState) => state.rental);
  const taxRate = 0.18;

  const totalExtraPrice = () => {
    return rentalExtraState.extraServices.reduce(
      (total, service) => total + service.price,
      0
    );
  };
  const finalPrice =
    (rentalState.totalPrice +
      rentalExtraState.insurance.price +
      totalExtraPrice()) *
    (1 + taxRate);

  useEffect(() => {
    dispatch(handleTaxRateForInvoice(taxRate));
    dispatch(handleDiscountRateForInvoice(0));
    dispatch(handleTotalPriceForInvoice(finalPrice));
    dispatch(handleInvoiceNoForInvoice(generateInvoiceNumber()));
  }, []);

  function generateInvoiceNumber(): string {
    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number
    const invoiceNumber = `RbRide${currentYear}${randomDigits}`;
    return invoiceNumber;
  }

  const handleClose = () => {
    onClose(); // Close the popup
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Your reservation is now confirmed!</h2>
        <p>
          Kindly proceed to view your reservation details and invoice. We're
          delighted to have you as our valued customer.
        </p>
        <Link
          to={"/completion"}
          className="btn btn-primary "
          onClick={handleClose}
        >
          View Reservation Details
        </Link>
      </div>
    </div>
  );
};

export default SubmitBookingPopUp;
