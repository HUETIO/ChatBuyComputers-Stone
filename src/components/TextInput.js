import React, { useState } from 'react';

function TextInput({ onSendText }) {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    onSendText(text); // Llama a la función onSendText con el texto ingresado
    setText(''); // Limpia el campo de texto después de enviar
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Escribe tu consulta aquí..."
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default TextInput;