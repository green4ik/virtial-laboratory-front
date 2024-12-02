import { useNavigate } from 'react-router-dom';
import './Home.css';

const TaskButton = ({ task }) => {
  const navigate = useNavigate();

  const handleStartTask = () => {
    if (!task.isDone) {
      navigate('/completeTask', { state: { task } });
    }
  };

  return (
    <button  
    onClick={handleStartTask}
    className={`start-task-button ${task.isDone ? 'disabled' : ''}`} 
    disabled={task.isDone} 
    >
      Start Task
    </button>
  );
};

export default TaskButton;
