// client/src/App.tsx
import React, { useState } from 'react';
import Whiteboard from './components/Whiteboard';
import ToolPanel from './components/ToolPanel';

const App: React.FC = () => {
  const [boardId] = useState('demo-board');
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);

  // Add a new state to keep track of the active tool
  // "brush" or "eraser"
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Real-Time Whiteboard</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <ToolPanel
          currentColor={color}
          setColor={setColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          tool={tool}
          setTool={setTool}
        />
      </div>

      <Whiteboard
        boardId={boardId}
        color={color}
        strokeWidth={strokeWidth}
        tool={tool}
      />
    </div>
  );
};

export default App;
