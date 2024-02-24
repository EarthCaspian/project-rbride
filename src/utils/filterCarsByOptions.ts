import { FilterState } from '../store/filterSlice';
import { CarModel } from "../models/response/CarModel";
import { calculateDatesDifference } from './formatDate';
import { RentalResponseModel } from '../models/response/RentalResponseModel';

//filter cars by selected brands
export const filterCarByBrand = (cars : CarModel[], filterState : FilterState) => {
    let filteredCarsList;
    
    //if no brand is chosen, include all cars.
    if (filterState.brands.length === 0)
        filteredCarsList =  cars;
    else {
        filteredCarsList = cars.filter((car) => {
            return filterState.brands.some(brand => car.model.brand.id === brand.id)
        });
    }
    return filteredCarsList;
}

//filter cars by selected min price and max price range
export const filterCarByPrice = (cars : CarModel[],  filterState : FilterState) => {
    let filteredCarsList = cars.filter((car) => 
        car.dailyPrice >= filterState.minDailyPrice && car.dailyPrice <= filterState.maxDailyPrice
    );
    return filteredCarsList;
}

//filter cars by availability on selected dates
export const filterCarByDates = (cars: CarModel[], rentalsResponse : RentalResponseModel[], filterState : FilterState) => {
    const selectedStartDate = filterState.startDate;
    const selectedEndDate = filterState.endDate;
    const filteredCarsList : CarModel[] | undefined = cars.filter((car) => {
        const rentals = getActiveRentalsByCar(rentalsResponse, car);
        return CarsAvailabilityCheckByDates(rentals, new Date(selectedStartDate), new Date(selectedEndDate));
    })
    return filteredCarsList;
}

//get if there is any rental record for the sending car in the rentalsResponse
export const getActiveRentalsByCar = (rentalsResponse : RentalResponseModel[], car : CarModel) => {
    const activeRentals : RentalResponseModel[] | undefined = 
      rentalsResponse.filter((rental) => rental.car.id === car.id && calculateDatesDifference(new Date(), new Date(rental.endDate)) >= 0);
    return activeRentals;
}

//Check if rental record exists, if does not exist, return true.
//Else, check if it the car already rented on the selected dates
//if rented, return false, else return true.
export const CarsAvailabilityCheckByDates = (rentals : RentalResponseModel[] | undefined, selectedStartDate : Date, selectedEndDate : Date) => {
    let isCarAvailable : boolean = true;
    if (rentals) {
        isCarAvailable = !rentals.some(rental =>
            calculateDatesDifference(new Date(rental.endDate), selectedStartDate) <= 0 &&
            calculateDatesDifference(selectedEndDate, new Date(rental.startDate)) <= 0)
    }
    return isCarAvailable;
}

//filter cars by selected models
export const filterCarByModel = (cars: CarModel[], filterState : FilterState) => {
    let filteredCarsList;

    //if no model is chosen, include all cars.
    if (filterState.models.length === 0)
        filteredCarsList = cars;
    else {
        filteredCarsList = cars.filter((car) => {
            return filterState.models.some(model => car.model.id === model.id);
        });
    }
    return filteredCarsList;
}

//filter cars by selected colors
export const filterCarByColor = (cars : CarModel[], filterState : FilterState) => {
    let filteredCarsList;
    
    //if no color is chosen,include all cars.
    if (filterState.colors.length === 0)
        filteredCarsList = cars;
    else {
        filteredCarsList = cars.filter((car) => {
            return filterState.colors.some((color) => car.color.id === color.id)
        });
    }
    return filteredCarsList;
}