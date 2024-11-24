import React from "react";
import { useState,useEffect } from "react";
import './CompleteTask.css';
function LeftPanelVaribales ({variables,handleDragStart}) {


    return(
        <div className="left-panel-variables">
            { variables.map((variable) => (
              <div
                key={variable}
                draggable
                onDragStart={(e) => handleDragStart(e, "variable", variable)}
                className="left-panel-button"
              >
                {variable}
              </div>
            ))}
        </div>
   
    )
    
}
export default LeftPanelVaribales;