import React from "react";
import TaskItem from './TaskItem'

const TaskList = ({tasks, onTaskSelect, deleteTask}) => {
    return (
    <div>
    <h2>Task List</h2>
    {tasks.map(task => (
        <TaskItem key={task.id} task={task} onTaskSelect={onTaskSelect} deleteTask={deleteTask} />
    ))}
    </div>
    )
}

export default TaskList;

