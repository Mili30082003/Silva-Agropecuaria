import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar></Sidebar>
      <Navbar></Navbar>
      <h2>Bienvenido al Dashboard de la granja </h2>
      <p>Selecciona una seccion del menu para continuar</p>
    </div>
  )
}

export default Dashboard
