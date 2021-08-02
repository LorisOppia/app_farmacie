import React from 'react'

import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonList,
    IonItem,
    IonIcon
  } from '@ionic/react'

  import { medkitOutline, leafOutline } from 'ionicons/icons'

const categoryConfig = {
parco: {
    icon: leafOutline,
    color: 'success',
},
farmacia: {
    icon: medkitOutline,
    color: 'danger',
},
}
/*

  {
   "geometry":{
      "coordinates":[
         10.998106354,
         45.444332246
      ],
      "type":"Point"
   },
   "id":18,
   "properties":{
      "chiave":"7359-29A",
      "circoscriz":"CENTRO STORICO",
      "denominazi":"S. Anastasia",
      "farmacia":18,
      "indirizzo":"CORSO S. ANASTASIA 29A,\r\n37121 Verona",
      "omogenea":"Citta` Antica",
      "quartiere":"CITTA' ANTICA",
      "tooltip":"18 S. Anastasia",
      "url_rel":"modulo3/oggetto.aspx?oggetto=farmacia&id_oggetto=18"
   },
   "type":"Feature"
}
*/
export const LocationModal = ({ loc }) => {

  if(loc.properties &&
     (
      !('denominazi' in loc.properties) ||
      !('indirizzo' in loc.properties)||!('quartiere' in loc.properties)
     )
    )
        return(
          <IonContent>
            <h1>Internal Error</h1>
          </IonContent>
        )

  return (
    <IonContent>
    <IonHeader>
      <IonToolbar>
            <IonItem>
            <IonTitle>
              {loc.properties.denominazi}
            </IonTitle>
                <IonIcon
                        color={ categoryConfig["farmacia"].color }
                        icon={categoryConfig["farmacia"].icon}
                        slot="end"
                    />
            </IonItem>
        </IonToolbar>
    </IonHeader>
    <IonList>
      <IonItem>
        <IonLabel>Indirizzo {loc.properties.indirizzo}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Distretto {loc.properties.quartiere}</IonLabel>
      </IonItem>
    </IonList>
  </IonContent>
  )
}

export default LocationModal