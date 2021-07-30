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

export const LocationModal = ({ loc }) => {

  return (
    <IonContent>
    <IonHeader>
        <IonToolbar>
            <IonItem>
            <IonTitle>
            {loc.denominazione}
            </IonTitle>
                <IonIcon
                        color={ categoryConfig[loc.category.denominazione].color }
                        icon={categoryConfig[loc.category.denominazione].icon}
                        slot="end"
                    />
            </IonItem>
        </IonToolbar>
    </IonHeader>
    <IonList>
      <IonItem>
        <IonLabel>Indirizzo {loc.indirizzo}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Distretto {loc.district.denominazione}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Category {loc.category.denominazione}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Civico {loc.civico}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Email {loc.email}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Telefono {loc.telefono}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Sito {loc.sito}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Orario {loc.orario}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel className="ion-text-wrap">Descrizione {loc.descrizione}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Cover {loc.cover.name}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Latitudine {loc.lat}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Longitudine {loc.lng}</IonLabel>
      </IonItem>
    </IonList>
  </IonContent>
  )
}

export default LocationModal