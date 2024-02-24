import { useEffect, useState } from "react";
import CarCard from "../../components/CarsCards/CarCard/CarCard";
import { CarModel } from "../../models/response/CarModel";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { fetchRentalsAndCarsThenApplyFilters } from "./helper";

const CarList = () => {

  const [cars, setCars] = useState<CarModel[]>([]);
  const filterState = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    const getFilteredCars = async () => {
      const filteredCars = await fetchRentalsAndCarsThenApplyFilters(filterState);
      setCars(filteredCars);
    }
    getFilteredCars();
  }, [filterState]);

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
