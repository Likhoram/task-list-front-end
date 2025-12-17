import TaskList from './components/TaskList.jsx';
import './App.css';
import {useState} from 'react';
import TASKS from './data/tasks.js';



const App = () => {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={TASKS} />}</div>
      </main>
    </div>
  );
};

export default App;
