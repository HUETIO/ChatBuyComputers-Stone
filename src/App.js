import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importar axios
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';
import TextInput from './components/TextInput';
import './App.css';


function App() {
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false); // Estado para indicar si la petición está en curso
  const [computadoras, setComputadoras] = useState([]); // Estado para almacenar las computadoras
  const [showForm, setShowForm] = useState(false);

  const handleSendText = async (text) => {
    setLoading(true); // Indica que la petición está en curso
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Corrección aquí
      console.log("apiKey:", apiKey); // Agrega esta línea
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA0VBjsYv86iZacuPWQUgXiFdShUEuRkg8`;

      const prompt = `Recomienda una computadora de mi inventario que sea adecuada para: ${text}.  Proporciona la marca, modelo y una breve justificación.  Mi inventario es: ${JSON.stringify(computadoras)}.`;

      const response = await axios.post(apiUrl, {
        contents: [{
          parts: [{ text: prompt }] // Usa el prompt con la preferencia del cliente y el inventario
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

  useEffect(() => {
   
   
    const fetchComputadoras = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/computers/'); // Reemplaza con la URL de tu API de Django
        setComputadoras(response.data);
      } catch (error) {
        console.error('Error fetching computadoras:', error);
      }
    };

    fetchComputadoras();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  const handleAddComputer = async (nuevaComputadora) => {
    try {
      // Asegúrate de que los datos estén en el formato correcto
      const data = {
        marca: nuevaComputadora.marca,
        modelo: nuevaComputadora.modelo,
        cantidad: parseInt(nuevaComputadora.cantidad),  // Asegúrate de que sea un número
        procesador: nuevaComputadora.procesador,
        memoria: nuevaComputadora.memoria,
        almacenamiento: nuevaComputadora.almacenamiento,
        tarjeta_grafica: nuevaComputadora.tarjeta_grafica,
        precio: parseFloat(nuevaComputadora.precio),  // Asegúrate de que sea un número decimal
        descripcion: nuevaComputadora.descripcion,
        imagen: nuevaComputadora.imagen,
      };
  
      const response = await axios.post('http://localhost:8000/api/computers/', data, {
        headers: {
          'Content-Type': 'application/json',  // Asegúrate de que los datos se envíen como JSON
        },
      });
      setComputadoras([...computadoras, response.data]); // Agrega la nueva computadora al estado
    } catch (error) {
      console.error('Error adding computadora:', error);
      console.error('Detalles del error:', error.response?.data); // Muestra más detalles del error
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatBuyComputers</h1>
        
        <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Ocultar formulario" : "Mostrar formulario"}
         </button>
         {showForm && <InventoryForm onAddComputer={handleAddComputer} />}
        
        <InventoryList computadoras={computadoras} />
        <TextInput onSendText={handleSendText} />
        {loading ? <p>Loading...</p> : <p>{aiResponse}</p>}
      </header>
    </div>
  );
}

export default App;