import React, { useState, useEffect } from 'react';
import '../css/InventoryForm.css';

function InventoryList({ computadoras, onUpdateComputer, onDeleteComputer }) {
  const [editComputer, setEditComputer] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [selectedComputers, setSelectedComputers] = useState([]);

  // Efecto para el estado indeterminado del checkbox
  useEffect(() => {
    const headerCheckbox = document.querySelector('thead input[type="checkbox"]');
    if (headerCheckbox) {
      headerCheckbox.indeterminate = 
        selectedComputers.length > 0 && 
        selectedComputers.length < computadoras.length;
    }
  }, [selectedComputers, computadoras.length]);

  const handleCheckboxChange = (computerId) => {
    setSelectedComputers(prev => 
      prev.includes(computerId)
        ? prev.filter(id => id !== computerId)
        : [...prev, computerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedComputers(prev => 
      prev.length === computadoras.length 
        ? [] 
        : computadoras.map(c => c.id)
    );
  };

  const handleDeleteSelected = () => {
    onDeleteComputer(selectedComputers);
    setSelectedComputers([]);
  };

  const handleEditClick = (computadora) => {
    setEditComputer(computadora.id);
    setEditedData({
      ...computadora,
      precio: parseFloat(computadora.precio),
      cantidad: parseInt(computadora.cantidad)
    });
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/computers/${editedData.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la computadora');
      }

      const updatedComputer = await response.json();
      onUpdateComputer(updatedComputer);
      setEditComputer(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>🚀 Inventario de Computadoras 🚀</h2>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                onChange={handleSelectAll} 
                checked={selectedComputers.length === computadoras.length} 
              />
            </th>
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
                <input
                  type="checkbox"
                  checked={selectedComputers.includes(computadora.id)}
                  onChange={() => handleCheckboxChange(computadora.id)}
                />
              </td>
              <td><img src={computadora.imagen} alt={computadora.modelo} width="50" /></td>
              <td>{editComputer === computadora.id ? 
                <input name="marca" value={editedData.marca} onChange={handleChange} /> : 
                computadora.marca}</td>
              <td>{editComputer === computadora.id ? 
                <input name="modelo" value={editedData.modelo} onChange={handleChange} /> : 
                computadora.modelo}</td>
              <td>{editComputer === computadora.id ? 
                <input name="cantidad" type="number" value={editedData.cantidad} onChange={handleChange} /> : 
                computadora.cantidad}</td>
              <td>{editComputer === computadora.id ? 
                <input name="procesador" value={editedData.procesador} onChange={handleChange} /> : 
                computadora.procesador}</td>
              <td>{editComputer === computadora.id ? 
                <input name="memoria" value={editedData.memoria} onChange={handleChange} /> : 
                computadora.memoria}</td>
              <td>{editComputer === computadora.id ? 
                <input name="almacenamiento" value={editedData.almacenamiento} onChange={handleChange} /> : 
                computadora.almacenamiento}</td>
              <td>{editComputer === computadora.id ? 
                <input name="tarjeta_grafica" value={editedData.tarjeta_grafica} onChange={handleChange} /> : 
                computadora.tarjeta_grafica}</td>
              <td>{editComputer === computadora.id ? 
                <input name="precio" type="number" step="0.01" value={editedData.precio} onChange={handleChange} /> : 
                computadora.precio}</td>
              <td>{editComputer === computadora.id ? 
                <input name="descripcion" value={editedData.descripcion} onChange={handleChange} /> : 
                computadora.descripcion}</td>
              <td>
                {editComputer === computadora.id ? (
                  <button onClick={handleUpdate}>Guardar 💾</button>
                  
                ) : (
                  <button onClick={() => handleEditClick(computadora)}>Editar ✏️</button>
                )}
              </td>
              
            </tr>
            
          ))}

        </tbody>
        <button onClick={handleDeleteSelected} disabled={selectedComputers.length === 0}>
        Eliminar ❌
      </button>
      </table>
      
    </div>
  );
}

export default InventoryList;
