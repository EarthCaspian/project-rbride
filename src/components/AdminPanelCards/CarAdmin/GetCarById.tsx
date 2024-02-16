import React, {useState} from 'react'
import CarService from '../../../services/CarService';
import { CarModel } from '../../../models/response/CarModel';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

type Props = {}

const GetCarById = (props: Props) => {
    const [id, setId] = useState<number | null>(null);
    const [car, setCar] = useState<CarModel | null>(null);
  
    const getCar = () => {
      if (id !== null) {
        CarService.getById(id).then(response => {
          setCar(response.data);
        });
      }
    };
  
    const deleteCar = (id: number) => {
      CarService.delete(id).then((response) => {
        getCar();
        toast.success(response.data.message); 
      });
    };


    return (
      <div>
        <h1>Get Car By ID</h1>
        <p>Enter the car id to get the desired car entry.Please refer to the update/delete column for related operations.</p>
            <div className="d-flex align-items-center mt-3 mb-3">
            <input
                type="number"
                className="form-control me-2"
                onChange={(e) => setId(Number(e.target.value))}
                placeholder="Enter Car ID"
            />
            <button className="btn btn-primary" onClick={getCar}>
                Get Car
            </button>
            </div>
  
        {car && (
          <table className="table table-bordered">
            {/* Table headers */}
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
            {/* Table body */}
            <tbody>
              <tr>
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
            </tbody>
          </table>
        )}
      </div>
    );
  };
  
  export default GetCarById;