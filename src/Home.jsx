import React, { useEffect, useState } from "react";
import './App.css';
import './Home.css';
import "@fontsource/mulish";
import list from './images/list.png';
import search from './images/search.png';
import lines from './images/lines.png';
import atoz from "./images/from-a-to-z.png"
import taskimg from './images/task-img.png';
import TaskButton from './TaskButton';
import { Link } from 'react-router-dom';

function Home({ tasks }) {
  const [activeTab, setActiveTab] = useState('tasks'); // Default to 'tasks'
  const [selectedTask, setSelectedTask] = useState(null); // Track selected task
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [taskData, setTaskData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [sortOrder, setSortOrder] = useState("asc"); // Track sort order (asc/desc)
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const tasksPerPage = 4;

  useEffect(() => {
    if (!user) return;

    const fetchTaskData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://localhost:7217/api/Task/byStudentId/${user.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTaskData(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const filteredData = taskData
    .filter(task => activeTab === 'tasks' || task.isDone) // Filter by tab
    .filter(task => task.name.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by search query
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const totalPages = Math.ceil(filteredData.length / tasksPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, sortOrder]);

  return (
    <div className="App">
      <div className="App-header">
        <p className="user-heading">Hello, {user?.username || "User"}!</p>

        <div className="links">
          <button
            className={`tasks-link ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
          <button
            className={`rates-link ${activeTab === 'rates' ? 'active' : ''}`}
            onClick={() => setActiveTab('rates')}
          >
            Grades
          </button>
        </div>

        <div className="search-bar">
          <button
            className="search-button"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <img src={lines} alt="Sort"/>
          </button>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            <img src={search} alt="Search" />
          </button>
        </div>

        <div className="tasks-container">
          {currentData.length > 0 ? (
            currentData.map(item => {
              const maxMark = item.maxGrade || 10; // Use task-specific maxMark, default to 10
              const range = maxMark / 4; // Calculate range dynamically for each task
              const grade = item.grade; // Grade is only relevant if the task is done
              const moreThen100 = grade >= 100 ? 'task-mark100' : 'task-mark';

              const markClass =
                grade > maxMark - range
                  ? 'mark-circle-green'
                  : grade > maxMark - 2 * range
                  ? 'mark-circle-yellow'
                  : grade > maxMark - 3 * range
                  ? 'mark-circle-orange'
                  : grade > 0
                  ? 'mark-circle-red'
                  : grade ===0 
                  ?'mark-circle-darkred'
                  :'';

              return (
                <div
                  className={`task-card ${selectedTask && selectedTask.id === item.id ? 'selected-task' : ''}`}
                  key={item.id}
                  onClick={() => {
                    console.log("Selected Task: ", item);
                    setSelectedTask(item);
                  }}
                >
                  <span className="task-name">{item.name}</span>
                  <div className="task-details">
                    {activeTab === 'tasks' ? (
                      item.isDone ? (
                        <span className="task-status">Done!</span>
                      ) : (
                        <span className="task-deadline">Up to: {formatDate(item.deadline)}</span>
                      )
                    ) : (
                      <div className={`mark-circle ${markClass}`}>
                        <span className={moreThen100}>
                          <strong>{grade}</strong>
                        </span>
                      </div>
                    )}
                    <img src={list} alt="list" className="illustration" />
                  </div>
                </div>
              );
            })
          ) : (
            <p>No {activeTab === 'tasks' ? 'tasks' : 'grades'} available</p>
          )}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-button"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`page-button ${currentPage === index + 1 ? "active-page" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            &gt;
          </button>
        </div>
      </div>
      {selectedTask && (
    <div className="task-details-panel">
        <div className='task-header'>
            <h2>{selectedTask.name}</h2>
            <p className="task-expiry">Expires: { formatDate(selectedTask.deadline)}</p>
        </div>
        <p>
           Description: <br/> <strong>{selectedTask.description}</strong>
        </p>
        <p>
            Max Grade:<br/> <strong>{selectedTask.maxGrade}</strong>
        </p>
        <p>
            Time to complete: <br/>  <strong>{selectedTask.durationTime} mins</strong>
        </p>
        {selectedTask.isDone && selectedTask.comment ? (
          <p className="task-comment">
            Teacher's Comment: <br /> <strong>{selectedTask.comment}</strong>
          </p>
        ) : (
          <img src={taskimg} alt="Task illustration" />
        )}
        <div className="task-button-container">
            <button className="close-button" onClick={() => setSelectedTask(null)}>
                Close
            </button>
            <TaskButton task={selectedTask} />
        </div>
    </div>
)}
    </div>
  );
}

export default Home;
