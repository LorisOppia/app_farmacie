import React from 'react'
import { connect } from 'react-redux'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import farmacia from '../../assets/icons/locations/farmacia.svg'
import Location from './Location'
import { showLocationModal } from '../../redux/actions'

const farmaciaIcon = L.icon({
  iconUrl: farmacia,
  iconSize: [30, 30],
})

const locationConfig = {
  farmacia: {
    icon: farmaciaIcon,
  },
}

export const LocationList = ({ myloc, locations, showLocationModal }) => {

  return (
    <div>
      {myloc &&
        myloc.length &&
        myloc.map(loc => (
          <Marker
            key={loc.id}
            position={[loc.geometry.coordinates[1], loc.geometry.coordinates[0]]}
            eventHandlers={{
              click: () => console.log("ciao")//showLocationModal({locationClicked:loc}),
            }}
            icon={locationConfig["farmacia"].icon}
          >
            <Popup>
              <Location location={loc.properties}/>
            </Popup>
           
          </Marker>
        ))}
    </div>
  )
}

const mapStateToProps = state => ({
  locations: Object.values(state.location),
})

const mapDispatchToProps = {showLocationModal}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList)
