import React from "react";
import "./SubmitBookingPopUp.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { Button } from "react-bootstrap";
import { updateInvoiceState } from "./helpers";

interface Props {
  onClose: () => void;
}

const SubmitBookingPopUp: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const rentalState = useSelector((state: RootState) => state.rental);

  updateInvoiceState(dispatch, rentalState);

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
        <Button
          className="btn btn-primary "
          onClick={handleClose}
        >
          View Reservation Details
        </Button>
      </div>
    </div>
  );
};

export default SubmitBookingPopUp;
