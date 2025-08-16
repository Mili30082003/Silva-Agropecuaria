import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProductosList from './components/Productos/ProductosList';
import './App.css'

function App() {

  return (
  <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<ProductosList />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  )
}

export default App
