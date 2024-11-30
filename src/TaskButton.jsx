import { useNavigate } from 'react-router-dom';
import './Home.css';

const TaskButton = ({ task }) => {
  const navigate = useNavigate();

  const handleStartTask = () => {
    // Navigate to `completeTask` and pass task data
    navigate('/completeTask', { state: { task } });
  };

  return (
    <button onClick={handleStartTask} className="start-task-button">
      Start Task
    </button>
  );
};

export default TaskButton;
