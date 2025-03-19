import React, { useMemo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import 'react-circular-progressbar/dist/styles.css';
import '../css/Dashboard.css';

// Función para formatear números en formato COP
const formatCOP = (number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(number);
};

// Componente personalizado para barras con forma de edificio
const BuildingBar = (props) => {
  const { x, y, width, height, fill } = props;
  const buildingHeight = height;
  const windowSpacing = 4;
  
  return (
    <g>
      {/* Estructura principal del edificio */}
      <rect x={x} y={y} width={width} height={buildingHeight} fill={fill} />
      
      {/* Ventanas */}
      {[...Array(Math.floor(buildingHeight / 10)).keys()].map((i) => (
        <rect
          key={i}
          x={x + windowSpacing}
          y={y + windowSpacing + i * 10}
          width={width - windowSpacing * 2}
          height={4}
          fill="rgba(255, 255, 255, 0.6)"
        />
      ))}
    </g>
  );
};

function Dashboard({ computadoras }) {
  // Calcula métricas usando useMemo
  const totalStock = useMemo(() =>
    computadoras.reduce((sum, comp) => sum + comp.cantidad, 0),
    [computadoras]
  );

  const totalValue = useMemo(() =>
    computadoras.reduce((sum, comp) => sum + (comp.precio * 4000 * comp.cantidad), 0),
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

  const convertToMillions = (price) => (price * 4000) / 1000000;
  const priceDistribution = useMemo(() => [
    { name: '< $3M COP', count: computadoras.filter(comp => convertToMillions(comp.precio) < 3).length },
    { name: '$3M-$6M COP', count: computadoras.filter(comp => convertToMillions(comp.precio) >= 3 && convertToMillions(comp.precio) < 6).length },
    { name: '$6M-$10M COP', count: computadoras.filter(comp => convertToMillions(comp.precio) >= 6 && convertToMillions(comp.precio) < 10).length },
    { name: '> $10M COP', count: computadoras.filter(comp => convertToMillions(comp.precio) >= 10).length }
  ], [computadoras]);

  const BUILDING_COLORS = ['#4B9CD3', '#1E90FF', '#87CEEB', '#4682B4'];

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
            maxValue={totalValue + 50000000} 
            text={formatCOP(totalValue).replace('COP', '')} 
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
              <Pie 
                data={categoryData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BUILDING_COLORS[index % BUILDING_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} unidades`}/>
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
              <Bar 
                dataKey="count" 
                barSize={40}
                shape={<BuildingBar />}
              >
                {priceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BUILDING_COLORS[index % BUILDING_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;