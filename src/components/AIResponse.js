import React from 'react';
import '../css/AIResponse.css';

function AIResponse({ response }) {
  return (
    <div>
      <h3>Respuesta de la IA:</h3>
      <p>{response}</p>
    </div>
  );
}

export default AIResponse;