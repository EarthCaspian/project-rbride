import { FilterState } from '../store/filterSlice';
import { CarModel } from "../models/response/CarModel";
import { calculateDatesDifference } from './formatDate';
import { RentalStateModel } from '../models/response/RentalStateModel';
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
    let filteredCarsList = cars.filter((car) => {
        //check if there is any rental record for this car in the rentalsResponse
        const rentals : RentalResponseModel[] | undefined = rentalsResponse.filter((rentals) => rentals.car.id === car.id);   
        let bool = true;
        //If the record exists, check if it the car already rented on the selected dates
        //if rented, return false, they will not be added to the filter.
        rentals?.some((rental) => {
            if (calculateDatesDifference(new Date(rental.endDate), new Date(selectedStartDate)) <= 0 && calculateDatesDifference(new Date(selectedEndDate), new Date(rental.startDate)) <= 0)
                bool = false;
        })
        return bool;
    })
    return filteredCarsList;
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