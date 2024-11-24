import React, { useState, useEffect } from 'react';
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
  const [taskData, setTaskData] = useState([]); // Store fetched task data
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const tasksPerPage = 4;

  useEffect(() => {
    const fetchTaskData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://localhost:7217/api/Task/byStudentId/3');
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
  // const taskData = [
  //   {
  //     id: 1,
  //     name: 'Make UML',
  //     deadline: '01.12.2024',
  //     maxMark: 10,
  //     description: 'This is a first task to get introduced with UML modeling of different things with some random description in it to not leave empty space and fill this page with text to demonstrate this to everyone.',
  //     timeToComplete: '2 hours',
  //     studentId: 101, 
  //     isDone: true,
  //     mark: 1, 
  //     comment: 'Good effort, but needs improvement in diagram accuracy.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Task 1 Example',
  //     deadline: '02.12.2024',
  //     maxMark: 10,
  //     description: 'Complete the first task example.',
  //     timeToComplete: '1.5 hours',
  //     studentId: 102, 
  //     isDone: true,
  //     mark: 5, 
  //   comment: 'Well done! Keep up the good work.',
  //   },
  //   {
  //     id: 3,
  //     name: 'Another Task',
  //     deadline: '03.12.2024',
  //     maxMark: 10,
  //     description: 'Work on another example task.',
  //     timeToComplete: '3 hours',
  //     studentId: 103, 
  //     isDone: true,
  //     mark: 7, 
  //     comment: 'Satisfactory work, but the explanation was a bit unclear.',
  //   },
  //   {
  //     id: 4,
  //     name: 'One More Task',
  //     deadline: '04.12.2024',
  //     maxMark: 10,
  //     description: 'Finish one more task for practice.',
  //     timeToComplete: '1 hour',
  //     studentId: 104,
  //     isDone: true,
  //     mark: 8, 
  //     comment: null,
  //   },
  //   {
  //     id: 5,
  //     name: 'One More more Task',
  //     deadline: '05.12.2024',
  //     maxMark: 10,
  //     description: 'More task for practice.',
  //     timeToComplete: '15 hour',
  //     studentId: 105,
  //     isDone: false,
  //     mark: null, 
  //     comment: null,
  //   },
  // ];

      // Calculate total pages
      
      const filteredData = activeTab === 'tasks' 
      ? taskData 
      : taskData.filter(task => task.isDone);

    const totalPages = Math.ceil(filteredData.length / tasksPerPage);

    // Get data for the current page
    const currentData = filteredData.slice(
      (currentPage - 1) * tasksPerPage,
      currentPage * tasksPerPage
    );

    // Handle pagination
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    // Reset pagination when switching tabs
    useEffect(() => {
      setCurrentPage(1);
    }, [activeTab]);

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
              Grades
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
          {currentData.length > 0 ? (
            currentData.map(item => (
              <div
                className={`task-card ${selectedTask && selectedTask.id === item.id ? 'selected-task' : ''}`}
                key={item.id}
                onClick={() => setSelectedTask(item)}
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
                    <div className="mark-circle">
                      <strong>{item.mark}</strong>
                    </div>
                  )}
                  <img src={list} alt="list" className="illustration" />
                </div>
              </div>
            ))
          ) : (
            <p>No {activeTab === 'tasks' ? 'tasks' : 'grades'} available</p>
          )}
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