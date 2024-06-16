import React from "react";
import { useState, useEffect } from "react";

const TaskForm = ({ addTask, updateTask, selectedTask }) => {
    const [task, setTask] = useState({title: '', 
    description: '', 
    dueDate: '', 
    status: 'Pending'});

    useEffect(() => {
        if (selectedTask) {
            setTask(selectedTask);
        }
        else {
            setTask({title: '', 
            description: '', 
            dueDate: '', 
            status: 'Pending'})
        }
    }, [selectedTask]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask({ ...task, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.id) {
            updateTask(task);
        }
        else {
            addTask(task);
        }
        setTask({title: '', description: '', dueDate: '', status: 'Pending'});
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2>{task.id ? 'Edit Task' : 'Add Task'}</h2>
        <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" required />
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
        <select name="status" value={task.status} onChange={handleChange} required>
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
        <button type="submit">{task.id ? 'Update' : 'Add'} Task</button>
        </form>
    );
}

export default TaskForm;