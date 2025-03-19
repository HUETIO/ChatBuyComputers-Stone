import React from 'react';

function ComputerSelector({ computadoras, onSelect }) {
  return (
    <select onChange={onSelect}>
      <option value="">Selecciona una computadora</option>
      {computadoras.map((comp) => (
        <option key={comp.id} value={comp.id}>
          {comp.marca} {comp.modelo}
        </option>
      ))}
    </select>
  );
}

export default ComputerSelector;