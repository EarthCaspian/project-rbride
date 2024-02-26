import React from 'react'
import { IconComponent } from '../../../utils/icons';
import GoogleMapLocations from '../../../utils/GoogleMapLocations';
import { formatStringDate } from '../../../utils/formatDate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';

type Props = {}

const TimeAndLocationInformationCard = (props: Props) => {

  const rentalState = useSelector((state: RootState) => state.rental.rental);
  const rentalLocationsState = useSelector((state: RootState) => state.rental.locations);
  
  return (
    <div>
        <div className="row">
          <div className="col-4 mx-auto">
            <div className="">
              <h4>Pick-up Information</h4>
              <p>
                <IconComponent iconName="Clock" />
                {formatStringDate(rentalState.startDate)}
              </p>
              <GoogleMapLocations locationName={rentalLocationsState.pickUp?.name} />
            </div>
          </div>
          <div className="col-4 mx-auto">
            <div className="">
              <h4>Drop-off Information</h4>
              <p>
                <IconComponent iconName="Clock" />
                {formatStringDate(rentalState.endDate)}
              </p>
              <GoogleMapLocations locationName={rentalLocationsState.dropOff?.name} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default TimeAndLocationInformationCard;