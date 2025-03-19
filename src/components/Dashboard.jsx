import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import '../css/Dashboard.css';

function Dashboard({ computadoras }) {
  // Cálculos de métricas
  const totalStock = computadoras.reduce((sum, comp) => sum + comp.cantidad, 0);
  const totalValue = computadoras.reduce((sum, comp) => sum + (comp.precio * comp.cantidad), 0);
  const lowStockItems = computadoras.filter(comp => comp.cantidad < 5).length;
  
  // Datos para gráficos
  const categoryData = computadoras.reduce((acc, comp) => {
    acc[comp.marca] = (acc[comp.marca] || 0) + comp.cantidad;
    return acc;
  }, {});

  const priceDistribution = [
    { name: '< $500', count: computadoras.filter(comp => comp.precio < 500).length },
    { name: '$500-$1000', count: computadoras.filter(comp => comp.precio >= 500 && comp.precio < 1000).length },
    { name: '$1000-$2000', count: computadoras.filter(comp => comp.precio >= 1000 && comp.precio < 2000).length },
    { name: '> $2000', count: computadoras.filter(comp => comp.precio >= 2000).length },
  ];

  const chartData = Object.entries(categoryData).map(([marca, cantidad]) => ({
    name: marca,
    cantidad
  }));

  return (
    <div className="dashboard-container">
      <h2>Panel de Control del Inventario</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Stock Total</h3>
          <div style={{ width: '100px', margin: '0 auto' }}>
            <CircularProgressbar
              value={totalStock}
              maxValue={200}
              text={`${totalStock}`}
              styles={buildStyles({
                pathColor: totalStock > 150 ? '#ff6384' : '#4caf50',
                textColor: '#333',
              })}
            />
          </div>
        </div>

        <div className="metric-card">
          <h3>Valor Total</h3>
          <div className="value-metric">
            ${totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="metric-card">
          <h3>Bajo Stock (&lt;5)</h3>
          <div className="alert-metric">{lowStockItems}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h4>Distribución por Marca</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="cantidad"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h4>Distribución de Precios</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="low-stock-list">
        <h4>Productos con Bajo Stock</h4>
        {computadoras.filter(comp => comp.cantidad < 5).map(comp => (
          <div key={comp.id} className="low-stock-item">
            <span>{comp.marca} {comp.modelo}</span>
            <span className="stock-count">{comp.cantidad} unidades</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;