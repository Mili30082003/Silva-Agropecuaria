import React from 'react'
import { Link } from 'react-router'

const Sidebar = () => {
  return (
    <div className='sidebar'>
       <h2>Mi Granja</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/animales">Animales</Link></li>
          <li><Link to="/empleados">Empleados</Link></li>
          <li><Link to="/ventas">Ventas</Link></li>
          <li><Link to="/pagos">Pagos</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
