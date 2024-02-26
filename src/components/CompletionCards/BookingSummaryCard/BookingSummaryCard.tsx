import React from 'react'
import { IconComponent } from '../../../utils/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';

type Props = {}

const BookingSummaryCard = (props: Props) => {

    const rentalState = useSelector((state: RootState) => state.rental.rental);

  return (
    <div className="row g-0">
        <div className="col-md-4">
          <img
            src={rentalState.car.imagePath}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
    <div className="card-body">
        <h2 className="card-title">Reservation Overview</h2>

        <h3 className="card-text">
          <strong>
            {" "}
            {rentalState.car.model.brand.name +
              " " +
              rentalState.car.model.name}{" "}
          </strong>
        </h3>
        <p>
          <IconComponent iconName="CarFromFront" />
          Manuel
          {"   "}
          <IconComponent iconName="FuelPump" />
          Benzin - Our cars come with a full tank.
        </p>

        <p className="card-text mb-1">We kindly remind you! </p>

        <p className="card-text text-body-secondary mb-1">
          <small>
            Any changes to the rental period must be communicated and
            agreed upon by both parties.Renters must possess a valid
            driver's license and meet the minimum age requirement as per
            local regulations.
          </small>
        </p>
        <p className="card-text text-body-secondary mb-1">
          <small>
            The rented vehicle is for personal use only and may not be
            used for commercial purposes unless specified and agreed
            upon.
          </small>
        </p>

        <p className="card-text">
          <small className="text-body-secondary">
            Should you have any inquiries regarding the booking details,
            please don't hesitate to contact us!
          </small>
        </p>
        <h6>
          Contact with us
          <IconComponent iconName="Telephone" />
          0212 444 55 88
        </h6>
      </div>
    </div>
  </div>
  )
}

export default BookingSummaryCard;