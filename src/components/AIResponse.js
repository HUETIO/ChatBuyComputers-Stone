import React from 'react';

function AIResponse({ response }) {
  return (
    <div>
      <h3>Respuesta de la IA:</h3>
      <p>{response}</p>
    </div>
  );
}

export default AIResponse;