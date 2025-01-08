// client/src/App.tsx

import React, { useState } from 'react';
import Whiteboard from './components/Whiteboard';
import ToolPanel from './components/ToolPanel';

const App: React.FC = () => {
  const [boardId] = useState('demo-board'); // In a real app, get this from URL or user input
  const [color, setColor] = useState('#000000');

  return (
    <div>
      <h1>Real-Time Whiteboard</h1>
      <ToolPanel currentColor={color} setColor={setColor} />
      <Whiteboard boardId={boardId} color={color} />
    </div>
  );
};

export default App;
