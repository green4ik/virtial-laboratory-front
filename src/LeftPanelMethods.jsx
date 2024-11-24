import React from "react";
import { useState,useEffect } from "react";
import './CompleteTask.css';
function LeftPanelMethods ({methods,handleDragStart}) {


    return(
        <div className="left-panel-variables">
             { methods.map((method) => (
              <div
                key={method}
                draggable
                onDragStart={(e) => handleDragStart(e, "method", method)}
                className="left-panel-button"
              >
                {method}
              </div>
            ))}
        </div>
   
    )
    
}
export default LeftPanelMethods;