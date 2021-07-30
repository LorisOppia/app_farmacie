import React from 'react'

// TODO implement location popup
const Location = ({ location }) => {
  return (
    <div>
      <h3>{"Nome: "+location.denominazi}</h3>
      <h3>{"Indirizzo: "+location.indirizzo}</h3>    
    </div>
  )
}

export default Location
