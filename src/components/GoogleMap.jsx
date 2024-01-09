
import React from 'react';
import {Map} from '@vis.gl/react-google-maps';

const GoogleMap = () => {

    return (
        <Map
            mapContainerStyle={{height: "100vh", width: "100%"}}
            zoom={3}
            center={{lat: 22.54992, lng: 0}}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        />
    )
}
export default GoogleMap;