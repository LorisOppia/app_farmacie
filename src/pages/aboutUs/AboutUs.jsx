import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from '@ionic/react'
  import React from 'react'
  
  const AboutUs = (props) => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>37100 LAB</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h1>APP sviluppata da 37100 LAB</h1>
        </IonContent>
      </IonPage>
    )
  }
  
  export default AboutUs
  