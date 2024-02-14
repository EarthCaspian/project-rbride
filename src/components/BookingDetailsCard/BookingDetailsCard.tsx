import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { formatStringDate } from "../../utils/formatDate";
import { IconComponent } from "../../utils/icons";

type Props = {};

const BookingDetailsCard = (props: Props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [tax, setTax] = useState(0);

  //  Reaching redux store
  const rentalAllState = useSelector((state: RootState) => state.rental);
  const rentalState = rentalAllState.rental;
  const rentalInsuranceState = rentalAllState.insurance;
  const rentalExtraServicesState = rentalAllState.extraServices;

  //  Additional Service Total Price Calculation (Insurance + Extra Services)
  let additionalServiceTotalPrice: number = rentalInsuranceState.price;
  rentalExtraServicesState.forEach(
    (extra) => (additionalServiceTotalPrice += extra.price)
  );

  // Calculation of tax value and total amount implemented tax rate
  useEffect(() => {
    setTax((rentalState.totalPrice + additionalServiceTotalPrice) * 0.18);
    setTotalAmount(
      (rentalState.totalPrice + additionalServiceTotalPrice) * 1.18
    );
  }, []);

  // Formatting dates
  const bookingDateInfo = () => {
    const startDateFormatted = formatStringDate(rentalState.startDate);
    const endDateFormatted = formatStringDate(rentalState.endDate);
    return { startDateFormatted, endDateFormatted };
  };
  const { startDateFormatted, endDateFormatted } = bookingDateInfo();

  //  Reaching choosen insurance information
  const insuranceHeader = rentalInsuranceState.header;

  return (
    <div>
      {/* Booking Details 1 */}
      <div className="card bg-light border-light mb-4">
        {/* Title */}
        <div className="card-body">
          <h4 className="card-title">Booking Details</h4>
        </div>

        <div className="card-body">
          <h5 className="card-subtitle mb-2 text-body-secondary">
            DATES & HOURS
          </h5>
          <div className="d-flex">
            <h6 className="card-text col-4">Pick-up date:</h6>
            <p className="card-text col-8">{startDateFormatted}</p>
          </div>
          <div className="d-flex">
            <h6 className="card-text col-4">Drop-off date:</h6>
            <p className="card-text col-8">{endDateFormatted}</p>
          </div>
        </div>

        {/* PICKUP AND RETURN LOCATION */}
        <div className="card-body">
          <h5 className="card-subtitle mb-3 text-body-secondary">
            PICKUP AND RETURN LOCATION
          </h5>
          <div className="d-flex">
            <h6 className="card-text col-2">from </h6>
            <p className="card-text col-8">İstanbul Sabiha Gökçen Havalimanı</p>
          </div>
          <div className="d-flex">
            <h6 className="card-text col-2">to </h6>
            <p className="card-text col-8">İstanbul Sabiha Gökçen Havalimanı</p>
          </div>
        </div>

        {/* ADDITIONAL DETAILS */}
        <div className="card-body">
          <h5 className="card-subtitle mb-2 text-body-secondary">
            ADDITIONAL DETAILS
          </h5>
          <div className="d-flex">
            <h6 className="card-text col-4">Insurance:</h6>
            <p className="card-text col-8">{insuranceHeader}</p>
          </div>
          <div className="d-flex">
            <h6 className="card-text col-4">Extras:</h6>
            <p className="card-text col-8">
              {rentalExtraServicesState
                .map((extras) => {
                  return extras.header;
                })
                .join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Details 2*/}
      <div className="card bg-light mb-4 border-light">
        {/* Car */}
        <div className="card-body pb-0">
          <h3 className="card-title">
            {rentalState.car.model.brand.name +
              " " +
              rentalState.car.model.name}
          </h3>
          <div className="d-flex">
            <div className="col-6 my-auto">
              <div className="d-flex my-2">
                {/* Gear Type */}
                <div className="d-flex me-5">
                  <IconComponent iconName="CarFromFront" />
                  <h6 className="card-subtitle pt-2 text-body-secondary ms-1">
                    Manuel
                  </h6>
                </div>
                {/* Fuel Type */}
                <div className="d-flex">
                  <IconComponent iconName="FuelPump" />
                  <h6 className="card-subtitle pt-2 text-body-secondary ms-1">
                    Benzin
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-6 my-auto">
              <img
                className="mx-auto d-block"
                src={rentalState.car.imagePath}
                style={{
                  position: "relative",
                  objectFit: "contain",
                  width: "70%",
                  height: "70%",
                }}
              ></img>
            </div>
          </div>
        </div>

        {/* Car Rental Price */}
        <div className="card-body">
          <h5 className="card-subtitle mb-2 text-body-secondary">
            RENTAL PRICE DETAILS
          </h5>
          <div className="d-flex border-bottom">
            <div className="col-6">
              <p className="card-text text-start">
                {rentalState.totalPrice / rentalState.car.dailyPrice} days
                rental ₺{rentalState.car.dailyPrice}/day
              </p>
              <p className="card-text">Additional Services</p>
            </div>
            <div className="col-6 ">
              <p className="text-end">₺{rentalState.totalPrice}</p>
              <p className="text-end">₺{additionalServiceTotalPrice}</p>
            </div>
          </div>

          <div className="mt-3">
            <div className="d-flex">
              <h5 className="card-text col-6">Taxes</h5>
              <p className="text-end col-6">₺{tax}</p>
            </div>
            <div className="d-flex">
              <h3 className="card-text col-6">Total Amount</h3>
              <h3 className="text-end col-6">₺{totalAmount}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsCard;
