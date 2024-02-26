import { Dispatch } from "redux";
import { CustomerStateModel, handleCustomerBirthdate, handleCustomerFirstName, handleCustomerInternationalId, handleCustomerLastName, handleCustomerLicenceIssueDate, setCustomerIsValid } from "../../../store/customerSlice";
import * as Yup from "yup";
import { RentalState } from "../../../store/rentalSlice";
import { handleDiscountRateForInvoice, handleInvoiceNoForInvoice, handleTaxRateForInvoice, handleTotalPriceForInvoice } from "../../../store/invoiceSlice";


  //CUSTOMER INFOS
  
  const currentDate = new Date();

  //  Customer cannot be under 18 years of age
  const maxAllowedBirthdate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const minAllowedBirthdate = new Date(
    maxAllowedBirthdate.getFullYear() - 90,
    maxAllowedBirthdate.getMonth(),
    maxAllowedBirthdate.getDate()
  );

  //  Customer cannot have less than 2 years experience
  const minAllowedLicenceDate = new Date(
    currentDate.getFullYear() - 10,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const maxAllowedLicenceDate = new Date(
    currentDate.getFullYear() - 2,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const initialValues: CustomerStateModel = {
    firstName: "",
    lastName: "",
    birthdate: "",
    internationalId: "",
    licenceIssueDate: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Please enter your firstname!")
      .min(2, "Please enter a valid firstname!")
      .max(30, "The firstname cannot exceed 30 characters!"),
    lastName: Yup.string()
      .required("Please enter your lastname!")
      .min(2, "Please enter a valid lastname!")
      .max(40, "The lastname cannot exceed 40 characters!"),
    birthdate: Yup.date()
      .required("Please enter your birthdate!"),
    internationalId: Yup.string()
      .required("Please enter your national id!")
      .min(11, "Please enter a valid national id!")
      .max(11, "The national id cannot exceed 11 characters!")
      .matches(/^\d+$/, "Please enter a valid national id with only numbers"),
    licenceIssueDate: Yup.date()
      .required("Please enter yout licence issue date!"),
  });

    // Handle form submission
    const updateCustomerState = (values : CustomerStateModel, dispatch : Dispatch) => {
      dispatch(handleCustomerFirstName(values.firstName));
      dispatch(handleCustomerLastName(values.lastName));
      dispatch(handleCustomerInternationalId(values.internationalId));
      if (values.birthdate)
        dispatch(handleCustomerBirthdate(values.birthdate));
      if (values.licenceIssueDate)
        dispatch(handleCustomerLicenceIssueDate(values.licenceIssueDate));
      dispatch(setCustomerIsValid(true));
    };


    //INVOICE INFOS
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


  export {maxAllowedBirthdate, minAllowedBirthdate, maxAllowedLicenceDate, minAllowedLicenceDate, initialValues, validationSchema, updateCustomerState, updateInvoiceState};