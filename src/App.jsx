import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';
import TASKS from './data/contentTask.js';
import { useEffect } from 'react';
import axios from 'axios';

const kbaseURL = 'http://localhost:5000';

const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`).then((response) => response.data);
};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    caretaker: apiTask.caretaker ? apiTask.caretaker : 'Unknown',
    caretakerId: apiTask.caretaker_id ? apiTask.caretakerId : null,
    petCount: apiTask.pet_count,
  };

  delete newTask.pet_count;
  delete newTask.caretaker_id;
  return newTask;
};

// getAllCatsAPI().then((cats) => {
//   const newCats = cats.map(convertFromAPI);
//   console.log(newCats);
// });

const completeTaskAPI = (id) => {
  return axios.patch(`${kbaseURL}/tasks/${id}/complete`);
};

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const getAllTasks = () => {
    return getAllTasksAPI().then((tasks) => {
      const newTasks = tasks.map(convertFromAPI);
      setTasks(newTasks);
    });
  };

  // getAllTasks();

  useEffect(() => {
    getAllTasks();
  }, []);

  // const handleComplete = (id) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === id ? { ...task, isComplete: !task.isComplete } : task
  //     )
  //   );
  // };

  // const handleDelete = (id) => {
  //   setTasks((tasks) => {
  //     return tasks.filter((task) => task.id !== id);
  //   });
  // };

  const handleComplete = (id) => {
    // console.log(id);
    completeTaskAPI(id).then(() => {
      return setTasks((tasks) => {
        return tasks.map((task) =>
          task.id === id ? { ...task, isComplete: !task.isComplete } : task
        );
      });
    });
  };

  const handleDelete = (id) => {
    setTasks((tasks) => {
      return tasks.filter((task) => task.id !== id);
    });
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
      </main>
    </div>
  );
};

export default App;
