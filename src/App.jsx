import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';
import TASKS from './data/tasks.js';

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const handleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, complete: !task.isComplete } : task
      )
    );
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
        <div>{<TaskList tasks={TASKS} />}</div>
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
