import { Link } from "react-router-dom";
import "../style.css";
import { CarModel } from "../../../models/response/CarModel";

type Props = {
  car: CarModel;
};

const CarCard = (car: Props) => {


  return (
    <div className="col-12 col-md-10 col-xl-5 col-xxl-3 mb-3 ">
      <div className="card h-100">
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
                height={50}
              />
            </div>
          </div>
        </div>

        {/* Car Image */}
        <div className="card-wrapper" style={{position: "relative", paddingBottom: "50%", height: "0"}}>
        <img src={car.car.imagePath} className="card-img-top" style={{objectFit:"cover", width:"100%",  height:"150px"}}  alt="car" />
        </div>
        
        {/* Car Summary */}
        <div className="card-body bg-light">
          <p className="card-text fs-6 fw-light">{car.car.modelYear} Model</p>
          <p className="card-text fs-6 fw-light">{car.car.color.name}</p>
        </div>

        {/* Daily Price */}
        <div className="row d-flex align-items-center">
          <div className="col-6  d-flex align-items-baseline justify-content-center">
            <h4>₺{car.car.dailyPrice}</h4>
            <h6>/day</h6>
          </div>
          {/* See more */}
          <div className="col-6 card-body text-center">
            <Link to={"/car-details/" + car.car.id} className="submit-btn btn btn-primary me-3 w-75">
              See More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
