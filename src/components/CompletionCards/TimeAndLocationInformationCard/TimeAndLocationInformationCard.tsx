import React from 'react'
import { IconComponent } from '../../../utils/icons';
import GoogleMapLocations from '../../../utils/GoogleMapLocations';
import { formatStringDate } from '../../../utils/formatDate';
import { RentalState } from '../../../store/rentalSlice';

type Props = {
  rentalState: RentalState,
}

const TimeAndLocationInformationCard = (props: Props) => {

  const rentalState = props.rentalState.rental;
  const rentalLocationsState = props.rentalState.locations;
  
  return (
    <div>
        <div className="row">
          <div className="col col-md-6 mx-auto">            
              <h4>Pick-up Information</h4>
              <p>
                <IconComponent iconName="Clock" />
                {formatStringDate(rentalState.startDate)}
              </p>
              
                <GoogleMapLocations locationName={rentalLocationsState.pickUp?.name} /> 
              
                         
          </div>
          <div className="col col-md-6 mx-auto">          
              <h4>Drop-off Information</h4>
              <p>
                <IconComponent iconName="Clock" />
                {formatStringDate(rentalState.endDate)}
              </p>
              
                <GoogleMapLocations locationName={rentalLocationsState.dropOff?.name} />               
          </div>
        </div>
    </div>
  )
}

export default TimeAndLocationInformationCard;