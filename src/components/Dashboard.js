import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Dashboard({ computadoras }) {
  const totalStock = computadoras.reduce((sum, comp) => sum + comp.cantidad, 0);
  const maxStock = 100; // Ajusta según el límite de referencia

  return (
    <div style={{ width: '200px', margin: '20px auto' }}>
      <h2>Inventario Total</h2>
      <CircularProgressbar
        value={(totalStock / maxStock) * 100}
        text={`${totalStock} unidades`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: totalStock > maxStock * 0.7 ? 'red' : 'green',
          textColor: '#000',
          trailColor: '#d6d6d6'
        })}
      />
    </div>
  );
}

export default Dashboard;
