import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import CarCard from "../../components/CarCard/CarCard";
import { CarModel } from "../../models/response/CarModel";
import CarService from "../../services/CarService";
import fourOhFour from "../404/FourOhFour";

const CarList = () => {
  const [cars, setCars] = useState<CarModel[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    CarService.getAll().then((response: AxiosResponse<CarModel[]>) => {
      setCars(response.data);
    });
  };

  return (
    <div className="row">
      {cars && cars.length > 0 ? (
        cars.map((car) => <CarCard key={car.plate} car={car} />)
      ) : (
        <p>No cars available.</p>
      )}
    </div>
  );
};

export default CarList;
