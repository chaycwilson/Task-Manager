import React from "react";

const TaskItem = ({ task, onTaskSelect, deleteTask }) => {
    return (
    <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        <p>Status: {task.status}</p>
        <button onClick={() => onTaskSelect(task)}>Edit</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
    );
};


export default TaskItem;