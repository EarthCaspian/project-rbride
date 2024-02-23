
import { CarModel } from "../../../models/response/CarModel";
import { RentalResponseModel } from "../../../models/response/RentalResponseModel";
import { LocationsStateModel } from "../../../store/rentalSlice";
import { CarsAvailabilityCheckByDates, getActiveRentalsByCar } from "../../../utils/filterCarsByOptions";
import { calculateDatesDifference } from "../../../utils/formatDate";
import { locations } from "../../../utils/locations";
import { OptionType } from "../../CustomSelect/CustomSelect";


// FORMIK OBJECT DEFINITIONS AND VALIDATIONS
  //  Define options for pickup and dropoff locations by mapping location data
  const locationOptions : OptionType[] = locations.map((location, i) => {return {label: location.name, value: i}});
  //  Define the shape of form values
  export type LocationsValuesType = {
    pickupOption: OptionType | null;
    dropoffOption: OptionType | null;
  }
  //  Initialize form values with null
  const initialLocations : LocationsValuesType = {
    pickupOption : null,
    dropoffOption : null,
  }
  
  //  Validation function for checking if a location is selected
  function validateLocations (value : OptionType) : string | undefined {
    if (!value)
      return "Please select a location!";
    return undefined;
  };

  //  Get previously selected selections.
  const selectedLocations = (rentalLocationState :  LocationsStateModel) : LocationsValuesType => {
    let pickupOption = null;
    let dropoffOption = null;
    if (rentalLocationState.pickUp?.name)
      pickupOption = {label: rentalLocationState.pickUp.name, value: locations.findIndex((location) => location.name === rentalLocationState.pickUp.name)};
    if (rentalLocationState.dropOff?.name)
      dropoffOption = {label: rentalLocationState.dropOff.name, value: locations.findIndex((location) => location.name === rentalLocationState.dropOff.name)};
    return {pickupOption: pickupOption, dropoffOption: dropoffOption};
  }

  // Number of Reservation days
  function calculateReservationDays (startDate: Date, endDate: Date): number {
    let datesDifference = calculateDatesDifference(startDate, endDate);
    if(datesDifference == 0) datesDifference = 1; // This line allows us daily/hourly renting
    return datesDifference;
  };

  //Total Price
  // Function to calculate the total price based on the total number of days and the daily amount of the car
  function calculateTotalPrice (car : CarModel, days : number) {
    return car.dailyPrice * days;
  };

  // Availability Check
  //  Function to check the availability of the car on selected days
  const availabilityCheck = (rentalsResponse : RentalResponseModel[], car : CarModel, selectedStartDate : Date, selectedEndDate : Date) => {
    // listing all previous leases of the car that have not yet been returned
    const rentals : RentalResponseModel[] | undefined = getActiveRentalsByCar(rentalsResponse, car);
    const isExist = CarsAvailabilityCheckByDates(rentals, selectedStartDate, selectedEndDate);
    return isExist;
  }

  export {locationOptions, initialLocations, validateLocations, calculateReservationDays, calculateTotalPrice, availabilityCheck, selectedLocations};