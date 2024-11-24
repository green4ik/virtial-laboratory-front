import React, { useState } from 'react';
import './App.css';
import './Home.css';
import "@fontsource/mulish";
import list from './images/list.png';
import search from './images/search.png';
import lines from './images/lines.png';
import taskimg from './images/task-img.png';
import { Link } from 'react-router-dom';

function Home() {
  const [activeTab, setActiveTab] = useState('tasks'); // Default to 'tasks'
  const [selectedTask, setSelectedTask] = useState(null); // Track selected task
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const tasksPerPage = 4;

  const taskData = [
    {
      id: 1,
      name: 'Make UML',
      deadline: '01.12.2024',
      maxMark: 10,
      description: 'This is a first task to get introduced with UML modeling of different things with some random description in it to not leave empty space and fill this page with text to demonstrate this to everyone.',
      timeToComplete: '2 hours',
      studentId: 101, 
      isDone: true,
      mark: 1, 
      comment: 'Good effort, but needs improvement in diagram accuracy.',
    },
    {
      id: 2,
      name: 'Task 1 Example',
      deadline: '02.12.2024',
      maxMark: 10,
      description: 'Complete the first task example.',
      timeToComplete: '1.5 hours',
      studentId: 102, 
      isDone: true,
      mark: 5, 
    comment: 'Well done! Keep up the good work.',
    },
    {
      id: 3,
      name: 'Another Task',
      deadline: '03.12.2024',
      maxMark: 10,
      description: 'Work on another example task.',
      timeToComplete: '3 hours',
      studentId: 103, 
      isDone: true,
      mark: 7, 
      comment: 'Satisfactory work, but the explanation was a bit unclear.',
    },
    {
      id: 4,
      name: 'One More Task',
      deadline: '04.12.2024',
      maxMark: 10,
      description: 'Finish one more task for practice.',
      timeToComplete: '1 hour',
      studentId: 104,
      isDone: true,
      mark: 8, 
      comment: null,
    },
    {
      id: 5,
      name: 'One More more Task',
      deadline: '05.12.2024',
      maxMark: 10,
      description: 'More task for practice.',
      timeToComplete: '15 hour',
      studentId: 105,
      isDone: false,
      mark: null, 
      comment: null,
    },
  ];

   // Calculate total pages
   const totalPages = Math.ceil(taskData.length / tasksPerPage);

   // Get tasks for the current page
   const currentTasks = taskData.slice(
     (currentPage - 1) * tasksPerPage,
     currentPage * tasksPerPage
   );
 
   // Handle pagination button click
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };
 
  
  return (
    <div className="App">
      <div className="App-header">
        {/* <div> */}
          <p className="user-heading">Hello, student User1!</p>

          {/* Tasks / Rates selection */}
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
              Rates
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <button className="search-button">
              <img src={lines} alt="Lines" className="search-lines-icon" />
            </button>
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-button">
              <img src={search} alt="Search" />
            </button>
          </div>
        {/* </div> */}

        {/* Dynamic Content */}
        <div className="tasks-container">
              { currentTasks.length > 0 ? (activeTab === 'tasks' &&
          currentTasks.map((task) => (
            <div
              className={`task-card ${selectedTask && selectedTask.id === task.id ? 'selected-task' : ''}`}
              key={task.id}
              onClick={() => setSelectedTask(task)} // Select the clicked task
            >
              <span className="task-name">{task.name}</span>
              <div className="task-details">
                <span className="task-deadline">Up to: {task.deadline}</span>
                <img src={list} alt="list" className="illustration" />
              </div>
            </div>
          ))
          ) : (
            <p>No tasks available</p>
          )}

          {activeTab === 'rates' &&
            currentTasks.map((rate) => {
              const maxMark = rate.maxMark || 10; // Use task-specific maxMark, default to 10
              const range = maxMark / 4; // Calculate range dynamically for each task
          
              // Determine the color class for the rate's mark
              const markClass = rate.mark === null
                ? ''
                : rate.mark > maxMark - range
                ? 'mark-circle-green' // Top range (green)
                : rate.mark > maxMark - 2 * range
                ? 'mark-circle-yellow' // Second range (yellow)
                : rate.mark > maxMark - 3 * range
                ? 'mark-circle-orange' // Third range (orange)
                : rate.mark > 0
                ? 'mark-circle-red' // Fourth range (red)
                : 'mark-circle-dark-red';
               return(
                <div className={`task-card ${selectedTask && selectedTask.id === taskData.id ? 'selected-task' : ''}`}
                key={rate.id} onClick={() => setSelectedTask(rate)}>
                <span className="task-name">{rate.name}</span>
                <div className="task-details">
                <div className={`mark-circle ${markClass}`}>   
                  <span className='task-mark'> <strong>{rate.mark}</strong></span> 
                </div>
                  <img src={list} alt="list" className="illustration" />
                </div>
              </div>
            ); 
            })}
        </div>

        {/* Pagination */}
        <div className='pagination-block'>
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
              className={`page-button ${
                currentPage === index + 1 ? "active-page" : ""
              }`}
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
      </div>

      {/* Task Details */}
      {selectedTask && (
    <div className="task-details-panel">
        <div className='task-header'>
            <h2>{selectedTask.name}</h2>
            <p className="task-expiry">Expires: {selectedTask.deadline}</p>
        </div>
        <p>
           Description: <br/> <strong>{selectedTask.description}</strong>
        </p>
        <p>
            Max Rate:<br/> <strong>0-{selectedTask.maxMark}</strong>
        </p>
        <p>
            Time to complete: <br/>  <strong>{selectedTask.timeToComplete}</strong>
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
            <button className="start-task-button">Start Task</button>
        </div>
    </div>
)}
    </div>
  );
}

export default Home;




// is done bool, studentid 
  // const tasks = [
  //   { id: 1, name: 'Make UML', deadline: '01.12.2024', maxMark: 10, description: 'This is a first task to get introduced with uml modeling of different things with some' + 
  //                               'random description in it to not leave empty space and fill this page with text to demonstrate this to everyone.', timeToComplete: '2 hours' },
  //   { id: 2, name: 'Task 1 Example', deadline: '02.12.2024', maxMark: 8, description: 'Complete the first task example.', timeToComplete: '1.5 hours' },
  //   { id: 3, name: 'Another Task', deadline: '03.12.2024', maxMark: 9, description: 'Work on another example task.', timeToComplete: '3 hours' },
  //   { id: 4, name: 'One More Task', deadline: '04.12.2024', maxMark: 7, description: 'Finish one more task for practice.', timeToComplete: '1 hour' },
  // ];

  // //studentid
  // const rates = [
  //   { id: 1, name: 'Make UML', mark: 1 },
  //   { id: 2, name: 'Task 1 Example', mark: 5 },
  //   { id: 3, name: 'Another Task', mark: 7 },
  //   { id: 4, name: 'One More Task', mark: 10 },
  // ];