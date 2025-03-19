import React from 'react';
import '../css/InventoryForm.css';  // Importar los estilos

function InventoryList({ computadoras }) {
  return (
    <div>
      <h2>Inventario de Computadoras</h2>
      {computadoras.length === 0 ? (
        <p>No hay computadoras en el inventario.</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Cantidad</th>
              <th>Procesador</th>
              <th>Memoria</th>
              <th>Almacenamiento</th>
              <th>Tarjeta Gráfica</th>
              <th>Precio</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {computadoras.map((computadora) => (
              <tr key={computadora.id}>
                <td><img src={computadora.imagen} alt={computadora.modelo} /></td>
                <td>{computadora.marca}</td>
                <td>{computadora.modelo}</td>
                <td>{computadora.cantidad}</td>
                <td>{computadora.procesador}</td>
                <td>{computadora.memoria}</td>
                <td>{computadora.almacenamiento}</td>
                <td>{computadora.tarjetaGrafica}</td>
                <td>{computadora.precio}</td>
                <td>{computadora.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InventoryList;