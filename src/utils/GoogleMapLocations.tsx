import React from 'react';
import { IconComponent } from './icons';
import { LocationModel, locations } from './locations';

type GoogleLocation = {
    locations: LocationModel[];
}

export const googleLocations: GoogleLocation = {
    locations: locations
};

const GoogleMapLocation = ({ location }: { location: LocationModel }) => {
    return (
        <div>
            <h5>
                <IconComponent iconName='Location' />
                {location.name}
                </h5>
            <div dangerouslySetInnerHTML={{ __html: location.location }} />
        </div>
    );
};

const GoogleMapLocations = ({ locationName }: { locationName: string | undefined }) => {
    const location = googleLocations.locations.find(loc => loc.name === locationName);

    if (!location) {
        return null;
    }

    return <GoogleMapLocation location={location} />;
};

export default GoogleMapLocations;
