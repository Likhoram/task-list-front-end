import TaskList from './components/TaskList.jsx';
import './App.css';
import NewTaskForm from "./components/NewTaskForm.jsx";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const kbaseURL = 'http://localhost:5000';

const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`).then((response) => response.data);
};

// Complete task API call by "mark_complete" as wave04 required
const toggleTaskAPI = (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';
  return axios.patch(`${kbaseURL}/tasks/${id}/${endpoint}`);
};

const deleteTaskAPI = (id) => {
  return axios.delete(`${kbaseURL}/tasks/${id}`);
};

const convertFromAPI = (apiTask) => {
  return {
    id: apiTask.id,
    title: apiTask.title,
    description: apiTask.description,
    isComplete: apiTask.is_complete,
  };
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    return getAllTasksAPI().then((tasks) => {
      const newTasks = tasks.map(convertFromAPI);
      setTasks(newTasks);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleComplete = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    toggleTaskAPI(id, !task.isComplete)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
          )
        );
      })
      .catch((error) => {console.error('Error toggling task:', error);});
  };

  const handleDelete = (id) => {
    deleteTaskAPI(id)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {console.error('Error deleting task:', error);});
  };

  const onHandleSubmit = (data) => {
    axios
      .post(`${kbaseURL}/tasks`, data)
      .then((result) => {
        setTasks((prevTasks) => [convertFromAPI(result.data), ...prevTasks]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={tasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
        <NewTaskForm onHandleSubmit={onHandleSubmit} />
      </main>
    </div>
  );
};

export default App;
