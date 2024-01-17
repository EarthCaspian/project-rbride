import { Link } from "react-router-dom";
import "./style.css";
import { CarModel } from "../../models/response/CarModel";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

type Props = {
  car: CarModel;
};

const CarCard = (car: Props) => {

  const dispatch = useDispatch();
  const addCarToCart = () => {
    dispatch(addToCart(car.car))
}


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
              />
            </div>
          </div>
        </div>

        {/* Car Image */}
        {/* <img src={car.car.imagePath} className="card-img-top" style={{objectFit:"cover", width:"100%",  height:"200px"}} alt="car image" /> */}
        <div className="card-wrapper" style={{position: "relative", paddingBottom: "50%", height: "0"}}>
        <img src={car.car.imagePath} className="card-img-top" style={{position: "absolute", objectFit: "cover", width: "100%", height: "100%"}} alt="car image" />
        </div>
        
        {/* Car Summary */}
        <div className="card-body bg-light">
          <p className="card-text fs-6 fw-light">{car.car.modelYear} Model</p>
          <p className="card-text fs-6 fw-light">{car.car.color.name}</p>
        </div>

        {/* Buttons */}
        <div className="card-body">
          <Link to={"/car-details/" + car.car.id} className="btn btn-primary me-3">
            See More
          </Link>
          {/* <Link to={"/"}  className="btn btn-success">
            Book Now
          </Link> */}
          <button onClick={addCarToCart} className="btn btn-success">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
