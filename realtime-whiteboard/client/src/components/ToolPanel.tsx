// client/src/components/ToolPanel.tsx
import React from 'react';

interface ToolPanelProps {
  currentColor: string;
  setColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  tool: 'brush' | 'eraser';
  setTool: (tool: 'brush' | 'eraser') => void;
}

const ToolPanel: React.FC<ToolPanelProps> = ({
  currentColor,
  setColor,
  strokeWidth,
  setStrokeWidth,
  tool,
  setTool,
}) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(Number(e.target.value));
  };

  return (
    <div>
      {/* Color Picker */}
      <label>Pen Color: </label>
      <input
        type="color"
        value={currentColor}
        onChange={handleColorChange}
        disabled={tool === 'eraser'} // optional, disable color picker if using eraser
      />

      {/* Brush Size Slider */}
      <label style={{ marginLeft: '1rem' }}>Brush Size: </label>
      <input
        type="range"
        min={1}
        max={50}
        value={strokeWidth}
        onChange={handleStrokeWidthChange}
      />
      <span style={{ marginLeft: '8px' }}>{strokeWidth}px</span>

      {/* Buttons to Switch Tools */}
      <button
        onClick={() => setTool('brush')}
        style={{
          marginLeft: '1rem',
          backgroundColor: tool === 'brush' ? '#666' : '#ccc',
          color: '#fff',
          padding: '0.5rem 1rem',
        }}
      >
        Brush
      </button>

      <button
        onClick={() => setTool('eraser')}
        style={{
          marginLeft: '0.5rem',
          backgroundColor: tool === 'eraser' ? '#666' : '#ccc',
          color: '#fff',
          padding: '0.5rem 1rem',
        }}
      >
        Eraser
      </button>
    </div>
  );
};

export default ToolPanel;
