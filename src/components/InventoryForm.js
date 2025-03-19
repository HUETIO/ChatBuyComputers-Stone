import React, { useState } from 'react';

import '../css/InventoryForm.css';

function InventoryForm({ onAddComputer }) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [procesador, setProcesador] = useState('');
  const [memoria, setMemoria] = useState('');
  const [almacenamiento, setAlmacenamiento] = useState('');
  const [tarjetaGrafica, setTarjetaGrafica] = useState('');
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const nuevaComputadora = {
      id: Date.now(),
      marca,
      modelo,
      cantidad: parseInt(cantidad),
      procesador,
      memoria,
      almacenamiento,
      tarjeta_grafica: tarjetaGrafica,  // Asegúrate de incluir este campo
      precio: parseFloat(precio),
      descripcion,
      imagen,
    };

    onAddComputer(nuevaComputadora);

    // Limpiar los campos del formulario
    setMarca('');
    setModelo('');
    setCantidad(0);
    setProcesador('');
    setMemoria('');
    setAlmacenamiento('');
    setTarjetaGrafica('');
    setPrecio(0);
    setDescripcion('');
    setImagen('');
  };

  return (
    
    <form onSubmit={handleSubmit}className="inventory-form-container">
      <h2>Agregar Computadora al Inventario</h2>

      <label>Marca:</label>
      <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />

      <label>Modelo:</label>
      <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required />

      <label>Cantidad:</label>
      <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />

      <label>Procesador:</label>
      <input type="text" value={procesador} onChange={(e) => setProcesador(e.target.value)} />

      <label>Memoria:</label>
      <input type="text" value={memoria} onChange={(e) => setMemoria(e.target.value)} />

      <label>Almacenamiento:</label>
      <input type="text" value={almacenamiento} onChange={(e) => setAlmacenamiento(e.target.value)} />

      <label>Tarjeta Gráfica:</label>
      <input type="text" value={tarjetaGrafica} onChange={(e) => setTarjetaGrafica(e.target.value)} />

      <label>Precio:</label>
      <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />

      <label>Descripción:</label>
      <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

      <label>Imagen (URL):</label>
      <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />

      <button type="submit">Agregar Computadora</button>
    </form>
  );
}

export default InventoryForm;