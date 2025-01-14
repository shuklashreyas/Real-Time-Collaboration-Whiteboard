// client/src/App.tsx
import React, { useState } from 'react';
import Whiteboard from './components/Whiteboard';
import ToolPanel from './components/ToolPanel';

const App: React.FC = () => {
  const [boardId] = useState('demo-board');
  const [color, setColor] = useState('#000000');

  // OPTIONAL: If you want a brush slider, include a strokeWidth state
  const [strokeWidth, setStrokeWidth] = useState(5);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A2A2A', // A dark background for contrast
        color: '#fff',              // White text
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Real-Time Whiteboard</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <ToolPanel currentColor={color} setColor={setColor} />
        
        {/* If adding a brush size slider */}
        <label style={{ marginLeft: '1rem' }}>Brush Size: </label>
        <input
          type="range"
          min={1}
          max={20}
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value, 10))}
          style={{ verticalAlign: 'middle' }}
        />
        <span style={{ marginLeft: '8px' }}>{strokeWidth}px</span>
      </div>

      <Whiteboard boardId={boardId} color={color} strokeWidth={strokeWidth} />
    </div>
  );
};

export default App;
