import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
  LayersControl,
} from 'react-leaflet'

import classes from './Map.module.css'

import LocationMarkers from '../../components/location/LocationMarkers'

import { Geolocation } from '@capacitor/geolocation'

const url='http://3.142.202.105:7484'

export class Map extends Component {
  state = {
    mapContainer: false,
    farmacie:{},
    latPos: null,
    longPos: null,
  }

  async componentDidMount() {
    const res = await Geolocation.getCurrentPosition()
    this.latPos=res.coords.latitude;
    this.longPos=res.coords.longitude;
    this.GetFarmacie();
    if (this.state.mapContainer) return

    setTimeout(() => {
      this.setState({ mapContainer: true })
    }, 500)
  }

  GetFarmacie(){
    fetch(url+'/get/farmacie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({farmacie : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  //ON EACH METHODS
  OnEachFarmacia = (farmacia, layer) =>{
    layer.bindPopup(farmacia.properties.denominazi)
  }

  render() {
    const { center, zoom } = this.props.map
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Map</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="content" fullscreen>
          {this.state.mapContainer && (
            <MapContainer
              className={classes.mapContainer}
              center={center}
              zoom={zoom}
            >
              <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>

    </LayersControl>  
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapConsumer>
                {map => {
                  map.setView(center)
                  return null
                }}
              </MapConsumer>
              <Marker position={[this.latPos, this.longPos]}>
                <Popup>You Are Here</Popup>
              </Marker>
              <LocationMarkers myloc={this.state.farmacie.features}/>
            </MapContainer>
          )}
        </IonContent>
      </IonPage>
    )
  }
}

const mapStateToProps = state => ({
  map: state.map,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
