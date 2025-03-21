import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';
import TextInput from './components/TextInput';
import Dashboard from './components/Dashboard';
import './App.css';
import './css/AIResponse.css';

function App() {
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [computadoras, setComputadoras] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Cargar computadoras desde el backend
  useEffect(() => {
// En el useEffect de carga inicial:
const fetchComputadoras = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/computers/');
    const data = response.data.map(comp => ({
      ...comp,
      precio: parseFloat(comp.precio),
      cantidad: parseInt(comp.cantidad)
    }));
    setComputadoras(data);
  } catch (error) {
    console.error('Error fetching computadoras:', error);
    toast.error('Error al cargar el inventario');
  }
};

fetchComputadoras();
}, []);

  const handleDeleteComputer = async (ids) => {
    try {
      await Promise.all(
        ids.map(id => 
          axios.delete(`http://localhost:8000/api/computers/${id}/`)
        )
      );
      
      setComputadoras(prev => prev.filter(c => !ids.includes(c.id)));
      toast.success(`${ids.length} elementos eliminados correctamente`);
      
    } catch (error) {
      console.error('Error eliminando computadoras:', error);
      toast.error('Error al eliminar los elementos seleccionados');
    }
  };

  // Función para actualizar una computadora
  const updateComputer = async (updatedComputer) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/computers/${updatedComputer.id}/`,
        updatedComputer
      );
      setComputadoras(computadoras.map((comp) => 
        comp.id === updatedComputer.id ? response.data : comp
      ));
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const handleSendText = async (text) => {
    setLoading(true);
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA0VBjsYv86iZacuPWQUgXiFdShUEuRkg8`;
      const prompt = `Recomienda una computadora de mi inventario que sea adecuada para: ${text}. Proporciona la marca, modelo y una breve justificación. Mi inventario es: ${JSON.stringify(computadoras)}.`;

      const response = await axios.post(apiUrl, {
        contents: [{
          parts: [{ text: prompt }]
        }]
      });

      setAiResponse(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse('Error fetching response from AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComputer = async (nuevaComputadora) => {
    try {
      const data = {
        ...nuevaComputadora,
        cantidad: parseInt(nuevaComputadora.cantidad),
        precio: parseFloat(nuevaComputadora.precio)
      };

      const response = await axios.post('http://localhost:8000/api/computers/', data);
      setComputadoras([...computadoras, response.data]);
    } catch (error) {
      console.error('Error adding computadora:', error.response?.data || error);
    }
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="App-header">
        <h1>ChatBuyComputers</h1>
        <div>
          <h1>Inventario de Computadoras</h1>
          <Dashboard computadoras={computadoras} />
          <ToastContainer />
        </div>
        
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Ocultar formulario" : "Mostrar formulario"}
        </button>

        <div className={`inventory-form-container ${showForm ? "show" : ""}`}>
          <InventoryForm onAddComputer={handleAddComputer} />
        </div>

        <InventoryList 
          computadoras={computadoras} 
          onUpdateComputer={updateComputer} 
          onDeleteComputer={handleDeleteComputer}  // ← Esta línea faltaba
        />
        
        <TextInput onSendText={handleSendText} />
        
        <div className="ai-response">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;