import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Shop from './components/Shop/Shop'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  

  return (
    <div className="App">
      <Header></Header>
      <Shop></Shop>
      
    </div>
  )
}


export default App
