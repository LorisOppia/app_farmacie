import React from 'react'

import{
IonButton,
} from '@ionic/react'

const Location = ({ location }) => {

  // let's put upper case every word's first char
  let titleCase=(str)=>{
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' ').trim(); 
  }

  return (
    <div>
      <h3>{titleCase(location.denominazi)}</h3> 
      
      <IonButton expand="block" fill="clear" color="transparent" onClick={() => console.log("ciao")}>
        Info
      </IonButton> 
    </div>
  )
}

export default Location
