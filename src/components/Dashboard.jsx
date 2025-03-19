import React, { useMemo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'react-circular-progressbar/dist/styles.css';
import '../css/Dashboard.css';

function Dashboard({ computadoras }) {
  // Calcula métricas usando useMemo
  const totalStock = useMemo(() =>
    computadoras.reduce((sum, comp) => sum + comp.cantidad, 0),
    [computadoras]
  );

  const totalValue = useMemo(() =>
    computadoras.reduce((sum, comp) => sum + (comp.precio * comp.cantidad), 0),
    [computadoras]
  );

  const lowStockItems = useMemo(() =>
    computadoras.filter(comp => comp.cantidad < 5).length,
    [computadoras]
  );

  // Datos para gráficos
  const categoryData = useMemo(() => {
    return Object.entries(
      computadoras.reduce((acc, comp) => {
        acc[comp.marca] = (acc[comp.marca] || 0) + comp.cantidad;
        return acc;
      }, {})
    ).map(([marca, cantidad]) => ({ name: marca, value: cantidad }));
  }, [computadoras]);

  const priceDistribution = useMemo(() => [
    { name: '< $500', count: computadoras.filter(comp => comp.precio < 500).length },
    { name: '$500-$1000', count: computadoras.filter(comp => comp.precio >= 500 && comp.precio < 1000).length },
    { name: '$1000-$2000', count: computadoras.filter(comp => comp.precio >= 1000 && comp.precio < 2000).length },
    { name: '> $2000', count: computadoras.filter(comp => comp.precio >= 2000).length },
  ], [computadoras]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {/* Indicadores principales */}
      <div className="stats-container">
        <div className="stat-item">
          <h3>Total Stock</h3>
          <CircularProgressbar 
            value={totalStock} 
            maxValue={totalStock + 50} 
            text={`${totalStock}`} 
            styles={buildStyles({ pathColor: "#4caf50", textColor: "#333" })} 
          />
        </div>

        <div className="stat-item">
          <h3>Valor Total</h3>
          <CircularProgressbar 
            value={totalValue} 
            maxValue={totalValue + 5000} 
            text={`$${totalValue.toFixed(2)}`} 
            styles={buildStyles({ pathColor: "#2196f3", textColor: "#333" })} 
          />
        </div>

        <div className="stat-item">
          <h3>Stock Bajo</h3>
          <CircularProgressbar 
            value={lowStockItems} 
            maxValue={computadoras.length} 
            text={`${lowStockItems}`} 
            styles={buildStyles({ pathColor: "#ff5722", textColor: "#333" })} 
          />
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-container">
        <div className="chart">
          <h3>Distribución por Marca</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>Distribución de Precios</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
