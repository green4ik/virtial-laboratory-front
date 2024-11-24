import React from "react";
import './CompleteTask.css';

function LeftPanelClasses({ classes, handleDragStart }) {
  return (
    <div className="left-panel-variables">
      {classes.map((className) => (
        <div
          key={className}
          draggable
          onDragStart={(e) => handleDragStart(e, "class", className)} 
          className="left-panel-button"
        >
          {className}
        </div>
      ))}
    </div>
  );
}

export default LeftPanelClasses;
