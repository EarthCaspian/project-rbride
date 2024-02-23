import { Dispatch } from 'redux';
import { handleDiscountRateForInvoice, handleInvoiceNoForInvoice, handleTaxRateForInvoice, handleTotalPriceForInvoice } from '../../store/invoiceSlice';
import { RentalState } from '../../store/rentalSlice';

const taxRate = 0.18;

function generateInvoiceNumber(): string {
    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number
    const invoiceNumber = `RbRide${currentYear}${randomDigits}`;
    return invoiceNumber;
  }

  const finalPrice = (rentalState : RentalState) => {

      const extraServicesPrice = rentalState.extraServices.reduce((total, service) => total + service.price, 0);
      
      const insurancePrice = rentalState.insurance.price;
      
      const totalAmount = (rentalState.rental.totalPrice + extraServicesPrice + insurancePrice) * (1 + taxRate);

      return totalAmount;
    }

  const updateInvoiceState = (dispatch : Dispatch, rentalState : RentalState) => {
    dispatch(handleTaxRateForInvoice(taxRate));
    dispatch(handleDiscountRateForInvoice(0));
    dispatch(handleTotalPriceForInvoice(finalPrice(rentalState)));
    dispatch(handleInvoiceNoForInvoice(generateInvoiceNumber()));
  }

export {updateInvoiceState};