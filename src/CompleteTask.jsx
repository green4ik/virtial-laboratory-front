import React, { useState, useRef } from "react";
import "./CompleteTask.css";
import LeftPanelVaribales from "./LeftPanelVariables";
import LeftPanelMethods from "./LeftPanelMethods";
import LeftPanelClasses from "./LeftPannelClasses";
import Draggable from "react-draggable";

function CompleteTask() {
  const [variables, setVariables] = useState(["Var1", "Var2", "Var3"]);
  const [methods, setMethods] = useState(["Method1", "Method2", "Method3"]);
  const [classes, setClasses] = useState(["Class1", "Class2", "Class3"]);

  const [activePanel, setActivePanel] = useState("Variables");

  const [umlBlocks, setUmlBlocks] = useState([]);
  const umlPanelRef = useRef(null);

  const addNewBlock = () => {
    setUmlBlocks([
      ...umlBlocks,
      { id: umlBlocks.length + 1, title: "", attributes: [], methods: [] },
    ]);
  };

  const handleDragStart = (e, type, item, sourceBlockId = null) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type, item, sourceBlockId })
    );
  };

  const handleDrop = (e, targetBlockId, targetType) => {
    e.preventDefault();
    const { type, item, sourceBlockId } = JSON.parse(
      e.dataTransfer.getData("application/json")
    );
  
    setUmlBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === targetBlockId) {
          if (type === "variable" && targetType === "attributes") {
            // Забороняємо дублювання
            if (!block.attributes.includes(item)) {
              return {
                ...block,
                attributes: [...block.attributes, item],
              };
            }
          }
          if (type === "method" && targetType === "methods") {
            // Забороняємо дублювання
            if (!block.methods.includes(item)) {
              return {
                ...block,
                methods: [...block.methods, item],
              };
            }
          }
          if (type === "class" && targetType === "title") {
            // Заміна старого заголовка на новий
            return { ...block, title: item };
          }
        }
  
        // Видалення з початкового блоку (переміщення між блоками)
        if (block.id === sourceBlockId) {
          if (type === "variable") {
            return {
              ...block,
              attributes: block.attributes.filter((attr) => attr !== item),
            };
          }
          if (type === "method") {
            return {
              ...block,
              methods: block.methods.filter((method) => method !== item),
            };
          }
        }
  
        return block;
      })
    );
  };

  return (
    <div className="complete-task-body">
      <div className="container">
        <div className="left-panel">
          <div className="left-panel-headers">
            <h3
              className={
                activePanel === "Variables"
                  ? "left-panel-header-active"
                  : "left-panel-header"
              }
              onClick={() => setActivePanel("Variables")}
            >
              Variables
            </h3>
            <h3>/</h3>
            <h3
              className={
                activePanel === "Methods"
                  ? "left-panel-header-active"
                  : "left-panel-header"
              }
              onClick={() => setActivePanel("Methods")}
            >
              Methods
            </h3>
            <h3>/</h3>
            <h3
              className={
                activePanel === "Classes"
                  ? "left-panel-header-active"
                  : "left-panel-header"
              }
              onClick={() => setActivePanel("Classes")}
            >
              Classes
            </h3>
          </div>

          {activePanel === "Variables" && <LeftPanelVaribales variables={variables}handleDragStart={handleDragStart} />}
          {activePanel === "Methods" && <LeftPanelMethods methods={methods}handleDragStart={handleDragStart} />}
          {activePanel === "Classes" && <LeftPanelClasses classes={classes}handleDragStart={handleDragStart} />}
          <button className="new-block-btn" onClick={addNewBlock}>
            Click to create new block
          </button>
        </div>

        <div
          className="uml-panel"
          ref={umlPanelRef}
          onDragOver={(e) => e.preventDefault()}
        >
          {umlBlocks.map((block) => (
            <Draggable
              key={block.id}
              handle=".drag-handle"
              bounds="div.uml-panel"
            >
              <div className="uml-block">
                <div className="drag-handle">☰</div>
                <div
                    className="class-title"
                    onDrop={(e) => handleDrop(e, block.id, "title")}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    
                    {block.title && (
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, "class", block.title, block.id)}
                        
                      >
                        {block.title}
                      </div>
                    )}
                  </div>

                <div
                  className="class-attributes"
                  onDrop={(e) => handleDrop(e, block.id, "attributes")}
                  onDragOver={(e) => e.preventDefault()}
                >
                  Attributes:
                  {block.attributes.map((attr, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, "variable", attr, block.id)
                      }
                    >
                      {attr}
                    </div>
                  ))}
                </div>
                <div
                  className="class-methods"
                  onDrop={(e) => handleDrop(e, block.id, "methods")}
                  onDragOver={(e) => e.preventDefault()}
                >
                  Methods:
                  {block.methods.map((method, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, "method", method, block.id)
                      }
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </Draggable>
          ))}
        </div>

        <div className="right-panel">
          <div className="timer">Time left: 27:35</div>
          <h3>Task 1: Make UML</h3>
          <p>
            This is a first task to get introduced with UML modeling of
            different things with some random description in it to not leave
            empty space and fill this page with text to demonstrate this to
            everyone.
          </p>
          <button className="submit-btn">Submit task</button>
        </div>
      </div>
    </div>
  );
}

export default CompleteTask;
