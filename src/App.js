import React, { useState } from 'react';
import axios from 'axios';
import TextInput from './components/TextInput';
import AIResponse from './components/AIResponse';
import './App.css';

function App() {
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false); // Estado para indicar si la petición está en curso

  const handleSendText = async (text) => {
    setLoading(true); // Indica que la petición está en curso
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Corrección aquí
      console.log("apiKey:", apiKey); // Agrega esta línea
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA0VBjsYv86iZacuPWQUgXiFdShUEuRkg8`;

      const response = await axios.post(apiUrl, {
        contents: [{
          parts: [{ text: text }] // Usa el texto ingresado por el usuario
        }]
      });

      setAiResponse(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse('Error fetching response from AI.');
    } finally {
      setLoading(false); // Indica que la petición ha terminado (éxito o error)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatBuyComputers</h1>
        <TextInput onSendText={handleSendText} />
        {loading ? <p>Cargando...</p> : <AIResponse response={aiResponse} />}
      </header>
    </div>
  );
}

export default App;