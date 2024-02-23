import { AxiosResponse } from "axios";
import { RentalResponseModel } from "../../models/response/RentalResponseModel";
import CarService from "../../services/CarService";
import RentalService from "../../services/RentalService";
import { CarModel } from "../../models/response/CarModel";
import { filterCarByBrand, filterCarByColor, filterCarByDates, filterCarByModel, filterCarByPrice } from "../../utils/filterCarsByOptions";
import { FilterState } from "../../store/filterSlice";

const fetchRentalsAndCarsThenApplyFilters = async (filterState : FilterState) : Promise<CarModel[]> => {
    const rentalsResponse = await fetchRentals();
    const carsResponse = await fetchCars();
    return applyFiltersToCars(rentalsResponse, carsResponse, filterState);
  };

  const fetchRentals = () :Promise<RentalResponseModel[]> => {
    return (
      RentalService.getAll().then((rentalResponse: AxiosResponse<RentalResponseModel[]>) => {
        return (rentalResponse.data);
      })
    );
  };

  const fetchCars = () : Promise<CarModel[]> => {
    return (
      CarService.getAll().then((carResponse: AxiosResponse<CarModel[]>) => {
        return(carResponse.data);
      })
    );
  };

    // Applies filters sequentially to create a new list of cars and updates it.
    const applyFiltersToCars = (rentalsResponse : RentalResponseModel[], carsResponse : CarModel[], filterState : FilterState) => {
        // Apply date, brand, model, color, and price filters sequentially
        let filteredCarsList = filterCarByBrand(carsResponse, filterState);
        filteredCarsList = filterCarByModel(filteredCarsList, filterState);
        filteredCarsList = filterCarByColor(filteredCarsList, filterState);
        filteredCarsList = filterCarByPrice(filteredCarsList, filterState);
        filteredCarsList = filterCarByDates(filteredCarsList, rentalsResponse, filterState);
        // Set the new filtered list of cars
        return filteredCarsList;
      };

    export {fetchRentalsAndCarsThenApplyFilters};