import React, {useEffect, useState} from 'react'
import { supabase } from '../../supabaseClient'
const ProductosList = () => {
const [productos, setProductos] = useState([]);

const fetchProductos = async () => {
   const { data, error } = await supabase.from('productos').select('*');

   if (error) console.log(error);
    else setProductos(data);
}

 useEffect(() => { fetchProductos(); }, []);


  return (
    <div>
      <h2>Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Tipo Huevo</th>
            <th>Unidad</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{p.tipo_huevo}</td>
              <td>{p.unidad_empaque}</td>
              <td>{p.stock}</td>
              <td>{p.precio_unitario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductosList
