import React, { useState, useRef, useEffect } from "react";
import "./CompleteTask.css";
import { useNavigate } from "react-router-dom";
import LeftPanelVaribales from "./LeftPanelVariables";
import LeftPanelMethods from "./LeftPanelMethods";
import LeftPanelClasses from "./LeftPannelClasses";
import Draggable from "react-draggable";
import {ReactComponent as AggregationArrow} from "./assets/aggregation-head.svg"
import  Xarrow, {Xwrapper,useXarrow} from "react-xarrows";

function CompleteTask() {
  const [variables, setVariables] = useState(["Var1", "Var2", "Var3"]);
  const [methods, setMethods] = useState(["Method1", "Method2", "Method3"]);
  const [classes, setClasses] = useState(["Class1", "Class2", "Class3"]);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);

  const [connections, setConnections] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPointId, setStartPointId] = useState(null);
  const [blockStartPointId, setBlockStartPointId] = useState(null);
  const [anchorPoint, setAnchorPoint] = useState(null);
  const [activePanel, setActivePanel] = useState("Variables");
  const [umlBlocks, setUmlBlocks] = useState([]);
  const umlPanelRef = useRef(null);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    blockId: null,
    subItem: null,
    in: 1
  });
  const navigate = useNavigate();
 
  useEffect(() => {
    // Функція для отримання даних з API
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7217/api/StarterDiagram/1");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Оновлення станів на основі отриманих даних
        setVariables(data.attributes || []);
        setMethods(data.methods || []);
        setClasses(data.classNames || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Викликаємо функцію
  }, []);
  const currentTaskData = [
    {
      id: 1,
      name: 'Make UML',
      deadline: '01.12.2024',
      maxMark: 10,
      description: 'This is a first task to get introduced with UML modeling of different things with some random description in it to not leave empty space and fill this page with text to demonstrate this to everyone.',
      timeToComplete: 30,
      studentId: 101, 
      isDone: false,
      mark: null, 
      comment: 'Good effort, but needs improvement in diagram accuracy.',
    },
  ];
  
  
  const block = umlBlocks.find((b) => b.id === contextMenu.blockId);
  const updateXarrow = useXarrow();
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
            if (!block.attributes.includes(item)) {
              return { ...block, attributes: [...block.attributes, item] };
            }
          }
          if (type === "method" && targetType === "methods") {
            if (!block.methods.includes(item)) {
              return { ...block, methods: [...block.methods, item] };
            }
          }
          if (type === "class" && targetType === "title") {
            return { ...block, title: item };
          }
        }

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

  // Timer state
  const [timeLeft, setTimeLeft] = useState(
    parseInt(currentTaskData[0].timeToComplete) * 60 // Convert minutes to seconds
  );

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); // Clean up on unmount
    } else if (timeLeft === 0) {
      // Time is up: show popup and submit task
      alert("Time is up!");
      SubmitTask();
    }
  }, [timeLeft]);

  const SubmitTask = () => {
    console.log("Task is submitted.");
      alert("Task was automatically submitted because time is up.");
      navigate("/home");
  };

  // Format time to mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleRightPanel = () => {
    setIsRightPanelVisible((prevState) => !prevState);
  };
    

  const handleContextMenu = (e, blockId, subItem = null) => {
    e.preventDefault();
    
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      blockId,
      subItem, // Додано для вибору конкретного елемента
      arrowIndex: null,
    });
    console.log(contextMenu)
    console.log(block?.attributes)
  };

  const handleDeleteBlock = () => {
    setUmlBlocks((prevBlocks) =>
      prevBlocks.filter((block) => block.id !== contextMenu.blockId)
    );
    setConnections((prevConnections) =>
      prevConnections.filter(
        (connection) =>
          connection.start !== `point-${contextMenu.blockId}` &&
          connection.end !== `point-${contextMenu.blockId}`
      )
    );
    setContextMenu({ visible: false, x: 0, y: 0, blockId: null });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, blockId: null, arrowIndex: null });
  };

  const handleStartArrow = (pointId,blockId) => {
    setIsDrawing(true);
    setStartPointId(pointId);
    setBlockStartPointId(blockId);
    
  };

  const handleEndArrow = (pointId,endpos,bend) => {
    
    if (isDrawing && startPointId && (startPointId !== pointId) && endpos) {
      setConnections([...connections, { start: startPointId, end: pointId, endAnchor: endpos,label:"none",bstart:blockStartPointId,bend:bend }]);
    }
    setIsDrawing(false);
    setStartPointId(null);
    console.log(connections)
  };
  const handleContextMenuOnArrow = (e, connectionIndex) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      arrowIndex: connectionIndex, // Зберігаємо індекс стрілки
      blockId: null,
      pointId: null,
    });
  };
  
  // Оновлення лейблу на вибрану опцію
  const handleChangeArrowLabel = (newLabel) => {
    setConnections((prevConnections) =>
      prevConnections.map((connection, index) =>
        index === contextMenu.arrowIndex
          ? { ...connection, label: newLabel } // Оновлюємо лейбл
          : connection
      )
    );
    closeContextMenu();
  };
  
  
  const handleDeleteArrow = () => {
    setConnections((prevConnections) =>
      prevConnections.filter((_, index) => index !== contextMenu.arrowIndex)
    );
    closeContextMenu();
  };
  const handleDeleteTitle = () => {
    setUmlBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === contextMenu.blockId ? { ...block, title: "" } : block
      )
    );
    closeContextMenu();
  };
  
  const handleDeleteAttribute = (attribute) => {
    setUmlBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === contextMenu.blockId
          ? {
              ...block,
              attributes: block.attributes.filter((attr) => attr !== attribute),
            }
          : block
      )
    );
    closeContextMenu();
  };
  
  const handleDeleteMethod = (method) => {
    setUmlBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === contextMenu.blockId
          ? {
              ...block,
              methods: block.methods.filter((meth) => meth !== method),
            }
          : block
      )
    );
    closeContextMenu();
  };

  useEffect(() => {
    const updatedJson = generateUmlJson();
    console.log("Updated UML JSON:", JSON.stringify(updatedJson, null, 2));
    // Якщо потрібно передавати дані на сервер, можна зробити POST-запит тут
  }, [umlBlocks, connections]);
  const generateUmlJson = () => {
    console.log("UML Blocks:", umlBlocks);
    console.log("Connections:", connections);
    return {
      id: 1,
      classes: umlBlocks.map((block) => ({
        id : block.id,
        name: block.title || "Unnamed",
        attributes: block.attributes,
        methods: block.methods,
        relatedClasses: connections
          .filter((conn) => conn.bstart == block.id)
          .map((conn) => ({
            [umlBlocks.find((block)=>(block.id == conn.bend)).title]: conn.label,               // Тип зв'язку
          })),
      })),
    };
  };
  const downloadJson = () => {
    const data = generateUmlJson();
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uml-diagram.json";
    a.click();
  };


  return (
    <div className="complete-task-body" onClick={closeContextMenu}>

<button onClick={downloadJson} className="export-json-btn">
    Export JSON
  </button>
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

          {activePanel === "Variables" && (
            <LeftPanelVaribales
              variables={variables}
              handleDragStart={handleDragStart}
            />
          )}
          {activePanel === "Methods" && (
            <LeftPanelMethods
              methods={methods}
              handleDragStart={handleDragStart}
            />
          )}
          {activePanel === "Classes" && (
            <LeftPanelClasses
              classes={classes}
              handleDragStart={handleDragStart}
            />
          )}
          <button className="new-block-btn" onClick={addNewBlock}>
            Click to create new block
          </button>
        </div>

        <Xwrapper>
          <div className="uml-panel" ref={umlPanelRef}>
            {umlBlocks.map((block) => (
              <Draggable
                key={block.id}
                handle=".drag-handle"
                bounds="div.uml-panel"
                onDrag={updateXarrow} 
                onStop={updateXarrow}
              >
                <div
                  className="uml-block"
                  id={`block-${block.id}`}
                  onContextMenu={(e) => handleContextMenu(e, block.id)}
                >
                  <div className="drag-handle">☰</div>
                  <div
                    className="class-title"
                    onContextMenu={(e) => {e.stopPropagation();
                      handleContextMenu(e, block.id, "title");} }
                    
                    onDrop={(e) => handleDrop(e, block.id, "title")}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {block.title ? (
                      <div
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, "class", block.title, block.id)
                        }
                      >
                        {block.title}
                      </div>
                    ) : (
                      <div className="placeholder">Drag here class name</div>
                    )}
                  </div>

                  <div
                    className="class-attributes"
                    onDrop={(e) => handleDrop(e, block.id, "attributes")}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {block.attributes.length > 0 ? (
                      block.attributes.map((attr, index) => (
                        <div
                          key={index}
                          draggable
                          onContextMenu={(e) => {e.stopPropagation();
                            handleContextMenu(e, block.id, attr);} }
                          onDragStart={(e) =>
                            handleDragStart(e, "variable", attr, block.id)
                          }
                        >
                          {attr}
                        </div>
                      ))
                    ) : (
                      <div className="placeholder">Drag here variables</div>
                    )}
                  </div>

                  <div
                    className="class-methods"
                    onDrop={(e) => handleDrop(e, block.id, "methods")}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {block.methods.length > 0 ? (
                      block.methods.map((method, index) => (
                        <div
                          key={index}
                          draggable
                          onContextMenu={(e) => {e.stopPropagation();
                            handleContextMenu(e, block.id, method);} }
                          onDragStart={(e) =>
                            handleDragStart(e, "method", method, block.id)
                          }
                        >
                          {method}
                        </div>
                      ))
                    ) : (
                      <div className="placeholder">Drag here methods</div>
                    )}
                  </div>

                  {/* Точки для з'єднання */}
                  <div className="points">
                    <div
                      id={`point-${block.id}-top`}
                      className="point top"
                      onMouseDown={() =>
                        handleStartArrow(`point-${block.id}-top`,block.id)
                      }
                      onMouseUp={() => handleEndArrow(`point-${block.id}-top`,"top",block.id)}
                    />
                    <div
                      id={`point-${block.id}-right`}
                      className="point right"
                      onMouseDown={() =>
                        handleStartArrow(`point-${block.id}-right`,block.id)
                      }
                      onMouseUp={() =>
                        handleEndArrow(`point-${block.id}-right`,"right",block.id)
                      }
                    />
                    <div
                      id={`point-${block.id}-bottom`}
                      className="point bottom"
                      onMouseDown={() =>
                        handleStartArrow(`point-${block.id}-bottom`,block.id)
                      }
                      onMouseUp={() =>
                        handleEndArrow(`point-${block.id}-bottom`,"bottom",block.id)
                      }
                    />
                    <div
                      id={`point-${block.id}-left`}
                      className="point left"
                      onMouseDown={() =>
                        handleStartArrow(`point-${block.id}-left`,block.id)
                      }
                      onMouseUp={() => handleEndArrow(`point-${block.id}-left`,"left",block.id)}
                    />
                  </div>
                </div>
              </Draggable>
            ))}
            {connections.map((connection, index) => (
              <div
              key={index}
              onContextMenu={(e) => handleContextMenuOnArrow(e, index)}
              style={{ position: "absolute",padding: "10px", 
                cursor: "pointer", }}
            >
              <Xarrow
                key={index}
                start={connection.start}
                end={connection.end}
                endAnchor={connection.endAnchor}
                lineColor="white"
                headColor="#FF9F67"
                strokeWidth="2"
                path="grid"
                labels={<div style={{color:"#FF9F67"}}>{connection.label}</div>} // Відображаємо лейбл
     

                // dashness={true}
                animateDrawing="1"
               
              />
              </div>
            ))}
          </div>
        </Xwrapper>
        <button className="toggle-right-panel-btn" onClick={toggleRightPanel}>
          {isRightPanelVisible ? ">>" : "<<"}
        </button>

        <div className={`right-panel ${!isRightPanelVisible ? 'hidden' : ''}`}>
          {isRightPanelVisible && currentTaskData.length > 0 && (
            <>
              <br/><br/>
              <h3>{currentTaskData[0].name}</h3>
              <p>{currentTaskData[0].description}</p>
              <button className="submit-btn" onClick={SubmitTask}>Submit task</button>
            </>
          )}
        </div>
        <div className="always-visible-panel">
        <div className="timer">Time left: {formatTime(timeLeft)}</div>
        
      </div>
      </div>

      {contextMenu.visible && (
  <div
    className="context-menu"
    style={{
      top: `${contextMenu.y}px`,
      left: `${contextMenu.x}px`,
    }}
  >
    {contextMenu.arrowIndex !== null && (
      <div className="arrow-buttons">
        <button onClick={() => handleChangeArrowLabel('Association')}>
          Association
        </button>
        <button onClick={() => handleChangeArrowLabel('Navigable association')}>
          Navigable association
        </button>
        <button onClick={() => handleChangeArrowLabel('Inheritance')}>
          Inheritance
        </button>
        <button onClick={() => handleChangeArrowLabel('Implementaion')}>
          Implementaion
        </button>
        <button onClick={() => handleChangeArrowLabel('Dependency')}>
          Dependency
        </button>
        <button onClick={() => handleChangeArrowLabel('Aggregation')}>
          Aggregation
        </button>
        <button onClick={() => handleChangeArrowLabel('Composition')}>
          Composition
        </button>
      </div>
    )}
    {contextMenu.arrowIndex !== null ? (
      <div>
        <button onClick={handleDeleteArrow}>Delete Arrow</button>
      </div>
    ): contextMenu.subItem === "title" ? (
      <button onClick={handleDeleteTitle}>Delete Class Title</button>
    ) : block?.attributes.includes(contextMenu.subItem) ? (
      <button onClick={() => handleDeleteAttribute(contextMenu.subItem)}>
        Delete Attribute
      </button>
    ) : block?.methods.includes(contextMenu.subItem) ? (
      <button onClick={() => handleDeleteMethod(contextMenu.subItem)}>
        Delete Method
      </button>
    ) : (
      <button onClick={handleDeleteBlock}>Delete Block</button>
    )}

    
  </div>   
  )}
    

    </div>
  );
}

export default CompleteTask;
