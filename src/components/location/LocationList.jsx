import React from 'react'
import { IonItem, IonLabel, IonList } from '@ionic/react'

import { connect } from 'react-redux'
import { setMapView } from '../../redux/actions'

// TODO Fix map view
export const LocationList = ({ locations, history }) => {
  const onLocationClick = location => {
    console.log('location :>> ', location)
    setMapView({ lat: location.lat, lng: location.lng })
    history.push('/map')
  }

  return (
    <IonList>
      {locations.map(location => (
        <IonItem
          button
          key={location.id}
          onClick={() => onLocationClick(location)}
        >
          <IonLabel>{location.denominazione}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  )
}

const mapStateToProps = state => ({
  locations: Object.values(state.location),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList)
