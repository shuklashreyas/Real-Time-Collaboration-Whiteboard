// client/src/components/ToolPanel.tsx

import React from 'react';

interface ToolPanelProps {
  currentColor: string;
  setColor: (color: string) => void;
}

const ToolPanel: React.FC<ToolPanelProps> = ({ currentColor, setColor }) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Pen Color: </label>
      <input
        type="color"
        value={currentColor}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default ToolPanel;
