import { Link } from "react-router-dom";
import "./style.css";
import { CarModel } from "../../models/response/CarModel";

type Props = {
  car: CarModel;
};

const CarCard = (car: Props) => {
  return (
    <div className="col-12 col-md-10 col-xl-5 col-xxl-3 mb-3">
      <div className="card">
        {/* Card Title */}
        <div className="container border-bottom">
          <div className="row">
            {/* Car Model */}
            <div className="col-9">
              <p className="card-title fs-4 ">
                {car.car.model.name}
              </p>
              <p className="card-title fs-6 fw-light">{car.car.model.brand.name}</p>
            </div>
            {/* Car Brand */}
            <div className="col-3 container mt-2">
              <img
                src={car.car.model.brand.logoPath}
                className="brandLogo float-end mb-2"
                alt="brand logo"
              />
            </div>
          </div>
        </div>

        {/* Car Image */}
        <img src={car.car.imagePath} className="card-img-top" alt="car image" />

        {/* Car Summary */}
        <div className="card-body bg-light">
          <p className="card-text fs-6 fw-light">{car.car.modelYear} Model</p>
          <p className="card-text fs-6 fw-light">{car.car.color.name}</p>
        </div>

        {/* Buttons */}
        <div className="card-body">
          <Link to={"/"} className="btn btn-primary me-3">
            See More
          </Link>
          <Link to={"/"} className="btn btn-success">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
