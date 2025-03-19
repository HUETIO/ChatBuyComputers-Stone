import React, { useState } from 'react';
import '../css/InventoryForm.css';

function InventoryList({ computadoras, onUpdateComputer }) {
  const [editComputer, setEditComputer] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (computadora) => {
    setEditComputer(computadora.id);
    setEditedData(computadora);
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdateComputer(editedData);
    setEditComputer(null);
  };

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
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {computadoras.map((computadora) => (
              <tr key={computadora.id}>
                <td>
                  <img src={computadora.imagen} alt={computadora.modelo} />
                </td>
                {editComputer === computadora.id ? (
                  <>
                    <td><input name="marca" value={editedData.marca} onChange={handleChange} /></td>
                    <td><input name="modelo" value={editedData.modelo} onChange={handleChange} /></td>
                    <td><input name="cantidad" type="number" value={editedData.cantidad} onChange={handleChange} /></td>
                    <td><input name="procesador" value={editedData.procesador} onChange={handleChange} /></td>
                    <td><input name="memoria" value={editedData.memoria} onChange={handleChange} /></td>
                    <td><input name="almacenamiento" value={editedData.almacenamiento} onChange={handleChange} /></td>
                    <td><input name="tarjeta_grafica" value={editedData.tarjeta_grafica} onChange={handleChange} /></td>
                    <td><input name="precio" type="number" value={editedData.precio} onChange={handleChange} /></td>
                    <td><input name="descripcion" value={editedData.descripcion} onChange={handleChange} /></td>
                    <td>
                      <button onClick={handleUpdate}>Guardar</button>
                      <button onClick={() => setEditComputer(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{computadora.marca}</td>
                    <td>{computadora.modelo}</td>
                    <td>{computadora.cantidad}</td>
                    <td>{computadora.procesador}</td>
                    <td>{computadora.memoria}</td>
                    <td>{computadora.almacenamiento}</td>
                    <td>{computadora.tarjeta_grafica}</td>
                    <td>{computadora.precio}</td>
                    <td>{computadora.descripcion}</td>
                    <td>
                      <button onClick={() => handleEditClick(computadora)}>Editar</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InventoryList;
