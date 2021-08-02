import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import farmacia from '../../assets/icons/locations/farmacia.svg'
import Location from './Location'

const farmaciaIcon = L.icon({
  iconUrl: farmacia,
  iconSize: [30, 30],
})

const locationConfig = {
  farmacia: {
    icon: farmaciaIcon,
  },
}

export const LocationList = ({ myloc }) => {

  return (
    <div>
      {myloc &&
        myloc.length &&
        myloc.map(loc => (
          <Marker
            key={loc.id}
            position={[loc.geometry.coordinates[1], loc.geometry.coordinates[0]]}
            icon={locationConfig["farmacia"].icon}
          >
            <Popup>
              <Location location={loc}/>
            </Popup>
           
          </Marker>
        ))}
    </div>
  )
}



export default LocationList
