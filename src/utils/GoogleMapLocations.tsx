import React from 'react';
import { IconComponent } from './icons';

export interface Location {
    name: string;
    location: string;
}

type GoogleLocation = {
    locations: Location[];
}

export const googleLocations: GoogleLocation = {
    locations: [
        {
            name: 'İstanbul Airport',
            location: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.2105145089313!2d28.739853176434874!3d41.26075210384016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409ffff60abc95a9%3A0x380ce02cc824e506!2zxLBzdGFuYnVsIEhhdmFsaW1hbsSx!5e0!3m2!1str!2str!4v1707746049020!5m2!1str!2str" width="400" height="300"   loading="lazy" ></iframe>'
        },
        {
            name: 'New York City',
            location: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387271.4968810857!2d-74.25987562982936!3d40.69767000553222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1707746057608!5m2!1sen!2suk" width="400" height="300"   loading="lazy" ></iframe>'
        }
    ]
};

const GoogleMapLocation = ({ location }: { location: Location }) => {
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

const GoogleMapLocations = ({ locationName }: { locationName: string }) => {
    const location = googleLocations.locations.find(loc => loc.name === locationName);

    if (!location) {
        return null;
    }

    return <GoogleMapLocation location={location} />;
};

export default GoogleMapLocations;
