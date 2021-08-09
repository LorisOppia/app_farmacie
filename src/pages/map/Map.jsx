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
  IonFooter,
  IonImg,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonToast,
  IonList,
  IonItem,
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

import sponsor from '../../assets/img/sponsor.jpg'
import { locateSharp } from 'ionicons/icons'

//NUOVI IMPORT
import L from 'leaflet'
import $ from "jquery"
import _proxy from "jquery"


const url='http://3.142.202.105:7484'

export class Map extends Component {
  
  state = {
    mapContainer: false,
    farmacie:{},
    quartieri:{},
    circoscrizioni: {},
    center:[45.438351, 10.99171],
    mapCont:null,
    gpsError:false,
  }

  async componentDidMount() {
    try {
    
    const res = await Geolocation.getCurrentPosition()
    this.center=[res.coords.latitude, res.coords.longitude]

    } catch (e) {
        this.setState({ gpsError: true })
    }

    this.GetFarmacie()
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
  OnEachQuartiere = (quartiere, layer) =>{
    layer.bindPopup(stringManager.titleCase(quartiere.properties.quartiere))
  }

  OnEachCircoscrizione = (paese, layer) =>{
    layer.bindPopup(stringManager.titleCase(paese.properties.circoscriz))
  }

  componentDidCatch() {
    this.setState({gpsError:true})
  }

  render() {
    L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({

      onAdd: function (map) {
        // Triggered when the layer is added to a map.
        //   Register a click listener, then do all the upstream WMS things
        L.TileLayer.WMS.prototype.onAdd.call(this, map);
        map.on('click', this.getFeatureInfo, this);
      },
    
      onRemove: function (map) {
        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        L.TileLayer.WMS.prototype.onRemove.call(this, map);
        map.off('click', this.getFeatureInfo, this);
      },
    
      getFeatureInfo: function (evt) {
        // Make an AJAX request to the server and hope for the best
        var url = this.getFeatureInfoUrl(evt.latlng),
            showResults = L.Util.bind(this.showGetFeatureInfo, this);
        $.ajax({
          url: url,
          success: function (data, status, xhr) {
            var err = typeof data === 'string' ? null : data;
            showResults(err, evt.latlng, data);
          },
          error: function (xhr, status, error) {
            showResults(error);
          }
        });
      },
    
      getFeatureInfoUrl: function (latlng) {
        // Construct a GetFeatureInfo request URL given a point
        var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
            size = this._map.getSize(),
    
            params = {
              request: 'GetFeatureInfo',
              service: 'WMS',
              srs: 'EPSG:4326',
              styles: this.wmsParams.styles,
              transparent: this.wmsParams.transparent,
              version: this.wmsParams.version,
              format: this.wmsParams.format,
              bbox: this._map.getBounds().toBBoxString(),
              height: size.y,
              width: size.x,
              layers: this.wmsParams.layers,
              query_layers: this.wmsParams.layers,
              info_format: 'text/html'
            };
    
        params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
        params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    
        // return this._url + L.Util.getParamString(params, this._url, true);
    
        var url = this._url + L.Util.getParamString(params, this._url, true);
    
    
        /**
         * CORS workaround (using a basic php proxy)
         *
         * Added 2 new options:
         *  - proxy
         *  - proxyParamName
         *
         */
    
        // check if "proxy" option is defined (PS: path and file name)
        if(typeof this.wmsParams.proxy !== "undefined") {
    
          // check if proxyParamName is defined (instead, use default value)
          if(typeof this.wmsParams.proxyParamName !== "undefined")
            this.wmsParams.proxyParamName = 'url';
    
          // build proxy (es: "proxy.php?url=" )
          _proxy = this.wmsParams.proxy + '?' + this.wmsParams.proxyParamName + '=';
    
          url = _proxy + encodeURIComponent(url);
    
        }
    
        return url;
    
      },
    
      showGetFeatureInfo: function (err, latlng, content) {
        if (err) { console.log(err); return; } // do nothing if there's an error
    
        // Otherwise show the content in a popup, or something.
        L.popup({ maxWidth: 800})
          .setLatLng(latlng)
          .setContent(content)
          .openOn(this._map);
      }
    });
    
    L.tileLayer.betterWms = function (url, options) {
      return new L.TileLayer.BetterWMS(url, options);
    };
    
    const { zoom, locationClicked, showModal } = this.props.map

    const centerPosition = () => {
      console.log(this.center)
      if(this.center)
        this.state.mapCont.flyTo(this.center)
      if(typeof this.center==='undefined')
        this.setState({ gpsError: true })
    }
    if(this.state.gpsError)
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
            <IonTitle>Farmacie a Verona</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonList>
            <IonItem>
            <IonLabel className="ion-text-wrap">Errore nell'avvio dell'applicazione</IonLabel>
            </IonItem>
            <IonItem>
            <IonLabel className="ion-text-wrap">Assicurarsi che il Geolocalizzazione 
            e la connessione internet siano attive</IonLabel>
            </IonItem>
            </IonList>
          </IonContent>
        </IonPage>
      )
    else
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
              Chiudi
            </IonButton>
          </IonModal>
          
          {this.state.mapContainer && (
            <MapContainer
              className={classes.mapContainer}
              center={this.center}
              zoom={zoom}
              whenCreated={mapCont => this.setState({ mapCont })}
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
                  map.setView(this.center)
                  var wmsfarmacie_url="http://172.16.22.166:8080/geoserver/geoapp/wms?service=WMS&version=1.1.0&request=GetMap&layers=geoapp%3Afarmacie&bbox=10.899255752563477%2C45.38235855102539%2C11.06281566619873%2C45.49650573730469&width=768&height=535&srs=EPSG%3A4326&styles=&format=application/openlayers"
                  var layer = L.tileLayer.betterWms("http://172.16.22.166:8080/geoserver/wms", {
                    layers: "geoapp:farmacie",
                    format: "image/png",
                    transparent: true,
                    attribution: "mylayerPARCHI",
                   });
                  layer.addTo(map);
                  return null
                }}
              </MapConsumer>
              <Marker position={this.center}>
                <Popup>Tu sei qui</Popup>
              </Marker>
             
            </MapContainer>
          )}

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => centerPosition()}>
              <IonIcon icon={locateSharp} />
            </IonFabButton>
          </IonFab>
        </IonContent>

        <IonFooter>
            <IonImg src={sponsor}
            style={{maxWidth: "500px" , margin: "auto"}}
            />
        </IonFooter>
        <IonToast
        isOpen={this.state.gpsError}
        color="danger"
        onDidDismiss={() => 
          this.setState({ gpsError: false })}
        message="Problema di caricamento mappa. Il GPS è attivo?"
        buttons={[
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              this.setState({ gpsError: false })
            }
          }
        ]}
      />
    </IonPage>
    
    )
  }
}
const mapStateToProps = state => ({
  map: state.map,
})

const mapDispatchToProps = {dismissLocationModal}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
