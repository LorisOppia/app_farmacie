import React from 'react'

import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonList,
    IonItem,
    IonIcon,
    IonNote
  } from '@ionic/react'

  import { medkitOutline, leafOutline } from 'ionicons/icons'
  import stringManager from '../../utility/stringManager'

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

export const LocationModal = ({ loc }) => {
  //if don't have loc.properties or its attributes throw internal error text,
  // just to easily customize the app farmacie in to other apps
  if(
     (
      loc.properties &&
      ( !('denominazi' in loc.properties) || !('indirizzo' in loc.properties)||!('quartiere' in loc.properties))
     )
     || !loc.properties
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
                {stringManager.titleCase(loc.properties.denominazi)}
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
        <IonNote slot="start" color="primary">Indirizzo</IonNote>
        <IonLabel className="ion-text-wrap">{stringManager.titleCase(loc.properties.indirizzo)}</IonLabel>
      </IonItem>
      <IonItem>
        <IonNote slot="start" color="primary">Quartiere</IonNote>
        <IonLabel>{stringManager.titleCase(loc.properties.quartiere)}</IonLabel>
      </IonItem>
      <IonItem>
        <IonNote slot="start" color="primary">Circosc.</IonNote>
        <IonLabel>{stringManager.titleCase(loc.properties.circoscriz)}</IonLabel>
      </IonItem>
    </IonList>
  </IonContent>
  )
}

export default LocationModal