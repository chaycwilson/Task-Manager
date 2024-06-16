import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${task.id}`, task);
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="App">
      <h1>Task Management System</h1>
      <TaskForm addTask={addTask} updateTask={updateTask} selectedTask={selectedTask} />
      <TaskList tasks={tasks} onTaskSelect={handleTaskSelect} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
