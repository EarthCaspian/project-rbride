import { RentalStateModel } from "../../../models/response/RentalStateModel";
import { RentalState } from "../../../store/rentalSlice";
import { formatStringDate } from "../../../utils/formatDate";

  //  Additional Service Total Price Calculation (Insurance + Extra Services)
  const additionalServicePriceCalculation = (rentalState : RentalState) : number => {
        let additionalServiceTotalPrice = rentalState.insurance.price;
        rentalState.extraServices.forEach((extra) => additionalServiceTotalPrice += extra.price);
        return additionalServiceTotalPrice;
  }

  // Calculation of tax value and total amount implemented tax rate then parse floating numbers to fixed
  const taxCalculation = (rentalTotalPrice : number, additionalServiceTotalPrice : number) => {
    const tax = ((rentalTotalPrice + additionalServiceTotalPrice) * 0.18).toFixed(2);
    return (tax);
  }

  const totalAmountCalculation = (rentalTotalPrice : number, additionalServiceTotalPrice : number) => {
    const totalAmount = ((rentalTotalPrice + additionalServiceTotalPrice) * 1.18).toFixed(2);
    return totalAmount;
  }

    // Formatting dates
  const bookingDateInfo = (rentalState : RentalStateModel) => {
    const startDateFormatted = formatStringDate(rentalState.startDate);
    const endDateFormatted = formatStringDate(rentalState.endDate);
    return { startDateFormatted, endDateFormatted };
  };

  export {bookingDateInfo, taxCalculation, totalAmountCalculation, additionalServicePriceCalculation};