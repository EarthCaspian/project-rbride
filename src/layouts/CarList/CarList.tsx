import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import CarCard from "../../components/CarsCards/CarCard/CarCard";
import { CarModel } from "../../models/response/CarModel";
import CarService from "../../services/CarService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import RentalService from "../../services/RentalService";
import { RentalModel } from "../../models/response/RentalModel";
import { filterCarByBrand, filterCarByColor, filterCarByDates, filterCarByModel, filterCarByPrice } from "../../utils/filterCarsByOptions";

const CarList = () => {

  const [cars, setCars] = useState<CarModel[]>([]);
  const filterState = useSelector((state: RootState) => state.filter);
  const rentalState = useSelector((state: RootState) => state.rental.rental);
  let rentalsResponse : RentalModel[];
  let carsResponse : CarModel[];

  useEffect(() => {
    fetchRentalsAndCarsThenApplyFilters();
  }, [filterState]);

  const fetchRentalsAndCarsThenApplyFilters = async () => {
    rentalsResponse = await fetchRentals();
    carsResponse = await fetchCars();
    applyFiltersToCars();
  };

  const fetchRentals = () :Promise<RentalModel[]> => {
    return (
      RentalService.getAll().then((rentalResponse: AxiosResponse<RentalModel[]>) => {
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
  const applyFiltersToCars = () => {
    // Apply date, brand, model, color, and price filters sequentially
    let filteredCarsList = filterCarByDates(carsResponse, rentalsResponse, rentalState);
    filteredCarsList = filterCarByBrand(filteredCarsList, filterState);
    filteredCarsList = filterCarByModel(filteredCarsList, filterState);
    filteredCarsList = filterCarByColor(filteredCarsList, filterState);
    filteredCarsList = filterCarByPrice(filteredCarsList, filterState);
    // Set the new filtered list of cars
    setCars(filteredCarsList);
  };

  return (
    <div className="row" >
      {cars && cars.length > 0 ? (
        cars.map((car) => <CarCard key={car.plate} car={car} />)
      ) : (
        <p>No cars available.</p>
      )}
    </div>
  );
};

export default CarList;
