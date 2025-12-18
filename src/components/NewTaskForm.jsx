import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onHandleSubmit }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title,
      description: '',
    };
    onHandleSubmit(newTask);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Task Name:</label>
      <input
        type='text'
        id="title"
        title='title'
        value={title}
        onChange={handleTitleChange}
      />
      <div>
        <input type="submit" value="Add a task" />
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
