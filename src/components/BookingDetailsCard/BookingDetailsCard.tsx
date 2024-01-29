import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

type Props = {};

const BookingDetailsCard = (props: Props) => {
    
  const [totalAmount, setTotalAmount] = useState(0);
  const [tax, setTax] = useState(0);

  const rentalAllState = useSelector((state: RootState)=> state.rental);
  const rentalState = rentalAllState.rental;
  const rentalInsuranceState = rentalAllState.insurance;
  const rentalExtraServicesState = rentalAllState.extraServices;
    
  let additionalServiceTotalPrice :number = rentalInsuranceState.price;
  rentalExtraServicesState.forEach((extra) => additionalServiceTotalPrice += extra.price);

  useEffect(() => {
    setTax((rentalState.totalPrice + additionalServiceTotalPrice)*0.18);
    setTotalAmount((rentalState.totalPrice + additionalServiceTotalPrice)*1.18);
  }, [])

  return (
    <div>
      {/* Booking Details 1 */}
      <div className="card bg-light border-light mb-4">
        {/* Title */}
        <div className="card-body">
          <h4 className="card-title">Booking Details</h4>
        </div>

        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-body-secondary">
            DATES & HOURS
          </h6>
          <p className="card-text">{rentalState.startDate}</p>
          <p className="card-text">{rentalState.endDate}</p>
        </div>

        {/* PICKUP AND RETURN LOCATION */}
        <div className="card-body">
          <h6 className="card-subtitle mb-3 text-body-secondary">
            PICKUP AND RETURN LOCATION
          </h6>
          <p className="card-text">İstanbul Sabiha Gökçen Havalimanı</p>
          <p className="card-text">İstanbul Sabiha Gökçen Havalimanı</p>
        </div>

        {/* ADDITIONAL DETAILS */}
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-body-secondary">
            ADDITIONAL DETAILS
          </h6>
          <p className="card-text">Insurance:</p>
          <p className="card-text">Promotion:</p>
        </div>
      </div>

      {/* Booking Details 2*/}
      <div className="card bg-light border-light mb-4">
        {/* Car */}
        <div className="card-body">
          <h4 className="card-title">
            {rentalState.car.model.brand.name + " " + 
              rentalState.car.model.name}</h4>
          <div className="d-flex">
            <div>
              <div className="d-flex my-2">
                {/* Gear Type */}
                <div className="d-flex me-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-car-front"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                  </svg>
                  <h6 className="card-subtitle mb-2 text-body-secondary ms-1">
                    Manuel
                  </h6>
                </div>
                {/* Fuel Type */}
                <div className="d-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-fuel-pump"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z" />
                    <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1q.846-.002 1.412.336c.383.228.634.551.794.907.295.655.294 1.465.294 2.081v3.175a.5.5 0 0 1-.5.501H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1zm9 0a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v13h8z" />
                  </svg>
                  <h6 className="card-subtitle mb-2 text-body-secondary ms-1">
                    Benzin
                  </h6>
                </div>
              </div>

            </div>

            <div>
              <img
                src={rentalState.car.imagePath}
                style={{
                  position: "relative",
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </div>
          </div>
        </div>

        {/* Car Rental Price */}
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-body-secondary">
            RENTAL PRICE DETAILS
          </h6>
          <div className="d-flex border-bottom">
            <div className="col-6">
              <p className="card-text text-start">{rentalState.totalPrice / rentalState.car.dailyPrice} days rental ₺{rentalState.car.dailyPrice}/day</p>
              <p className="card-text">Additional Services</p>
            </div>
            <div className="col-6 ">
              <p className="text-end">₺ 
              {
                rentalState.totalPrice
              }
              </p>
              <p className="text-end">₺
              {additionalServiceTotalPrice}
              </p>
            </div>
          </div>

          <div className="d-flex mt-3">
            <div className="col-6">
              <p className="card-text fs-6">Taxes</p>
              <p className="card-text fs-4">Total Amount</p>
            </div>
            <div className="col-6">
              <p className="text-end fs-6">₺{tax}</p>
              <p className="text-end fs-2 mt-4">₺{totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsCard;
