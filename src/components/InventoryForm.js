import React, { useState } from 'react';
import '../css/InventoryForm.css';

function InventoryForm({ onAddComputer }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado de visibilidad
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
      tarjeta_grafica: tarjetaGrafica,
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
    <div>
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Ocultar formulario' : 'Agregar Nueva Computadora'}
      </button>

      <div className={`inventory-form-container ${mostrarFormulario ? 'show' : ''}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="marca">Marca:</label>
          <input id="marca" type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />

          <label htmlFor="modelo">Modelo:</label>
          <input id="modelo" type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required />

          <label htmlFor="cantidad">Cantidad:</label>
          <input id="cantidad" type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required min="0" />

          <label htmlFor="procesador">Procesador:</label>
          <input id="procesador" type="text" value={procesador} onChange={(e) => setProcesador(e.target.value)} />

          <label htmlFor="memoria">Memoria:</label>
          <input id="memoria" type="text" value={memoria} onChange={(e) => setMemoria(e.target.value)} />

          <label htmlFor="almacenamiento">Almacenamiento:</label>
          <input id="almacenamiento" type="text" value={almacenamiento} onChange={(e) => setAlmacenamiento(e.target.value)} />

          <label htmlFor="tarjetaGrafica">Tarjeta Gráfica:</label>
          <input id="tarjetaGrafica" type="text" value={tarjetaGrafica} onChange={(e) => setTarjetaGrafica(e.target.value)} />

          <label htmlFor="precio">Precio:</label>
          <input id="precio" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required min="0" />

          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

          <label htmlFor="imagen">Imagen (URL):</label>
          <input id="imagen" type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />

          <button type="submit">Guardar Datos</button>
        </form>
      </div>
    </div>
  );
}

export default InventoryForm;
