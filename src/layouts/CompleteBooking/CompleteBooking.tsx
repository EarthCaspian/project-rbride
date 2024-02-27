import React, { useEffect } from 'react'
import CustomerFormCard from '../../components/BooknowCards/CustomerFormCard/CustomerFormCard'
import PaymentDetailsCard from '../../components/BooknowCards/PaymentDetailsCard/PaymentDetailsCard'
import { useDispatch, useSelector } from "react-redux";
import CustomerService from "../../services/CustomerService";
import { RootState } from "../../store/configureStore";
import RentalService from "../../services/RentalService";
import { setStepLevel } from "../../store/stepsSlice";
import { useNavigate } from "react-router-dom";
import { setCustomerIsValid } from "../../store/customerSlice";
import InvoiceService from "../../services/InvoiceService";
import { customerInfos, invoiceInfos, rentalInfos } from './helpers';
import { toast } from 'react-toastify';
import { setReferringPage } from '../../store/referringPageSlice';
import { availabilityCheck } from '../../components/CarDetailsCards/ReservationDetailsCard/helpers';


type Props = {}

const CompleteBook = (props: Props) => {

  const customerState = useSelector((state: RootState) => state.customer);
  const rentalState = useSelector((state: RootState) => state.rental.rental);
  const invoiceState = useSelector((state : RootState) => state.invoice.invoice);
  const userState = useSelector((state : RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect (() => {
    dispatch(setReferringPage(window.location.pathname));
  }, []);

  useEffect(() => {
    CompleteBooking();
    return () => {
      dispatch(setCustomerIsValid(false));
    }
  }, [customerState.isValid]);

  const isCarAvailable = async () => {
   return RentalService.getAll().then((response) => {
      const isExist = availabilityCheck(response.data, rentalState.car, new Date(rentalState.startDate), new Date (rentalState.endDate));
      if (isExist) {
        return isExist;
      }
      else {
        throw new Error("We're sorry, the car you selected is already rented out. Please choose another car and try again.");
      }
    });
  }

  const CompleteBooking = async () => {
    if (customerState.isValid) {

      try {
        await isCarAvailable();
        const rentalId = await RentalService.add(rentalInfos(rentalState, userState));
        await CustomerService.add(customerInfos(customerState, userState));
        await InvoiceService.add(invoiceInfos(invoiceState, rentalId));
        navigate("/completion");
        dispatch(setStepLevel(3));
        toast.success("Booking successfully completed.");
      } catch (error) {
         console.error("Error while adding rental, customer or invoice", error);
         toast.error("Something went wrong. Please try again later." + error);
      }
    }
   };

  return (
    <div>
      {/* CUSTOMER FORM CARD */}
      <CustomerFormCard />
      {/* PAYMENT DETAILS CARD */}
      <PaymentDetailsCard />
      {/* COMPLETE BOOKING BUTTON */}
      <div className="col-12 fw-bold mb-2">
        <button id="complete-booking" 
            className="booknow-btn btn btn-success" 
            form="customer-form" 
            type="submit"
            onClick={CompleteBooking}
        >
          Complete Booking
        </button>
      </div>
    </div>
  )
}

export default CompleteBook;