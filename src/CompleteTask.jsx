import React from "react";
import './CompleteTask.css';
function CompleteTask() {
    return(
        <div className="complete-task-body">
            <div className="container">
           <div className="left-panel">
        <h3>Variable/Method</h3>
        <div className="left-panel-variables">
        <button>Car</button>
        <button>+driver</button>
        <button>-driver</button>
        <button>Driver</button>
        <button>-name</button>
        <button>+name</button>
        <button>+car</button>
        </div>
        
        <button className="new-block-btn">Click to create new block</button>
      </div>


      <div className="uml-panel">
        <div className="uml-block">
          <div className="class-title">Car</div>
          <div className="class-attributes">
            <p>+driver</p>
            <p>+name</p>
          </div>
          <div className="class-methods">
            <p>-ride()</p>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="timer">Time left: 27:35</div>
        <h3>Task 1: Make UML</h3>
        <p>
          This is a first task to get introduced with UML modeling of different
          things with some random description in it to not leave empty space
          and fill this page with text to demonstrate this to everyone.
        </p>
        <button className="submit-btn">Submit task</button>
      </div>
      </div>
        </div>
    )
}
export default CompleteTask;