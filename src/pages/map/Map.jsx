import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
} from '@ionic/react'

import stringManager from '../../utility/stringManager'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
  GeoJSON,
  LayersControl,
} from 'react-leaflet'

import {dismissLocationModal} from '../../redux/actions'
import classes from './Map.module.css'

import LocationMarkers from '../../components/location/LocationMarkers'
import LocationModal from '../../components/location/LocationModal'

import { Geolocation } from '@capacitor/geolocation'
import circoscrizioni from '../../data/circoscrizioni.json'
import quartieri from '../../data/quartieri.json'

const url='http://3.142.202.105:7484'

export class Map extends Component {
  
  state = {
    mapContainer: false,
    farmacie:{},
    quartieri:{},
    circoscrizioni: {},
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

  OnEachQuartiere = (quartiere, layer) =>{
    layer.bindPopup(stringManager.titleCase(quartiere.properties.quartiere))
  }

  OnEachCircoscrizione = (paese, layer) =>{
    layer.bindPopup(stringManager.titleCase(paese.properties.circoscriz))
  }

  render() {
    const { center, zoom, locationClicked, showModal } = this.props.map
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Farmacie a Verona</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="content" fullscreen>


          <IonModal isOpen={showModal} backdropDismiss={false}>   
            { locationClicked && ( <LocationModal loc={locationClicked}/> )}
            <IonButton onClick={() => this.props.dismissLocationModal()}>
              Dismiss
            </IonButton>
          </IonModal>

          {this.state.mapContainer && (
            <MapContainer
              className={classes.mapContainer}
              center={center}
              zoom={zoom}
            >

            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Mappa base">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>   
              <LayersControl.BaseLayer name="Circoscrizioni">
                <GeoJSON key='circoscrizioni' data={circoscrizioni.features} onEachFeature={this.OnEachCircoscrizione} />
              </LayersControl.BaseLayer>      
              <LayersControl.BaseLayer name="Quartieri">
                <GeoJSON key='quartieri' data={quartieri.features} onEachFeature={this.OnEachQuartiere} />
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
                <Popup>Tu sei qui</Popup>
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

const mapDispatchToProps = {dismissLocationModal}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
