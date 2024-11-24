import React, { useState, useRef, useEffect } from "react";
import "./CompleteTask.css";
import { useNavigate, useLocation } from "react-router-dom";
import LeftPanelVaribales from "./LeftPanelVariables";
import LeftPanelMethods from "./LeftPanelMethods";
import LeftPanelClasses from "./LeftPannelClasses";
import Draggable from "react-draggable";

function CompleteTask() {
  const [variables, setVariables] = useState([]);
  const [methods, setMethods] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);


  const [activePanel, setActivePanel] = useState("Variables");

  const [umlBlocks, setUmlBlocks] = useState(() => {
    // Retrieve saved UML blocks from localStorage or initialize as empty array
    const savedBlocks = localStorage.getItem("umlBlocks");
    return savedBlocks ? JSON.parse(savedBlocks) : [];
  });
  
    useEffect(() => {
    // Save UML blocks to localStorage whenever they change
    localStorage.setItem("umlBlocks", JSON.stringify(umlBlocks));
  }, [umlBlocks]);

  const umlPanelRef = useRef(null);

  const location = useLocation();
  const { task } = location.state;

  const navigate = useNavigate();


  useEffect(() => {
    const fetchDiagram = async () => {
      try {
        const response = await fetch(
          `https://localhost:7217/api/StarterDiagram/${task.diagramId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch diagram data");
        }
        const diagram = await response.json();
        // Update the states with fetched diagram data
        setVariables(diagram.attributes || []);
        setMethods(diagram.methods || []);
        setClasses(diagram.classNames || []);
      } catch (error) {
        console.error("Error fetching diagram data:", error);
      }
    };

    fetchDiagram();
  }, [task.diagramId]);
  
  // [
  //   {
  //     id: 1,
  //     name: 'Make UML',
  //     deadline: '01.12.2024',
  //     maxMark: 10,
  //     description: 'This is a first task to get introduced with UML modeling of different things with some random description in it to not leave empty space and fill this page with text to demonstrate this to everyone.',
  //     timeToComplete: 30,
  //     studentId: 101, 
  //     isDone: false,
  //     mark: null, 
  //     comment: 'Good effort, but needs improvement in diagram accuracy.',
  //   },
  // ];

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

  // Timer state
  const [timeLeft, setTimeLeft] = useState(() => {
    // Retrieve the timer value from localStorage or initialize it
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime ? parseInt(savedTime, 10) : parseInt(task.durationTime) * 60; // Default to task duration in seconds
  });
  
  // Timer countdown logic
  useEffect(() => {
    // Save the timeLeft to localStorage whenever it changes
    localStorage.setItem("timeLeft", timeLeft);
  
    // Timer countdown logic
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
  
  // Clear the timer from localStorage when task is submitted
  const SubmitTask = () => {
    localStorage.removeItem("timeLeft");
    console.log("Task is submitted.");
    alert("Task was submitted.");
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

        <button className="toggle-right-panel-btn" onClick={toggleRightPanel}>
          {isRightPanelVisible ? ">>" : "<<"}
        </button>

        <div className={`right-panel ${!isRightPanelVisible ? 'hidden' : ''}`}>
          {isRightPanelVisible && (
            <>
              <br/><br/>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
            </>
          )}
        </div>
        </div>

      {/* Always visible timer and submit button */}
      <div className="always-visible-panel">
        <div className="timer">Time left: {formatTime(timeLeft)}</div>
        <button className="submit-btn" onClick={SubmitTask}>Submit task</button>
      </div>
    </div>
  );
}

export default CompleteTask;
