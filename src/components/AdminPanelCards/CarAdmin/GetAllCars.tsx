import React , {useState, useEffect} from 'react'
import CarService from '../../../services/CarService';
import { AxiosResponse } from 'axios';
import { CarModel } from '../../../models/response/CarModel';
import { toast } from 'react-toastify';
import { Link, Outlet } from 'react-router-dom';


type Props = {}

const GetAllCars = (props: Props) => {

    const [cars, setCars] = useState<CarModel[]>([]);

    useEffect(() => {
        fetchCars();
      }, []);
    
      const fetchCars = () => {
        CarService.getAll().then((response: AxiosResponse<CarModel[]>) => {
          setCars(response.data);
        });
      };

      const deleteCar = (id: number) => {
        CarService.delete(id).then((response) => {
          fetchCars();
          toast.success(response.data.message); 
        });
      };

  return (
    <div>
        <h2>All Cars</h2>
        <p>Table listing of all the cars currently in the database.Please refer to the update/delete column for related operations.</p>
        <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Model Year</th>
          <th>Plate</th>
          <th>minFindeksRate</th>
          <th>Kilometer</th>
          <th>Daily Price</th>
          <th>Image</th>
          <th>Model Name</th>
          <th>Color</th>
          <th>Update/Delete</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => 
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.modelYear}</td>
            <td>{car.plate}</td>
            <td>{car.minFindeksRate}</td>
            <td>{car.kilometer}</td>
            <td>{car.dailyPrice}</td>
            <td><img height={50} src={car.imagePath} alt="car-image" /></td>
            <td>{car.model.name}</td>
            <td>{car.color.name}</td>
            <td>
              <Link to={`/admin/getAllCars/update/${car.id}`} className='btn btn-warning me-2'>Update</Link>
              <button className='btn btn-danger' onClick={() => deleteCar(car.id)}>Delete</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  )
}

export default GetAllCars