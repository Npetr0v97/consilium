import React from "react";

function Task({ task }) {
  return (
    <div>
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Is Prioritized: {task.isPrioritized ? "Yes" : "No"}</p>
      <ul>
        {task.labels.map((label, labelIndex) => (
          <li key={labelIndex}>{label}</li>
        ))}
      </ul>
      <p>Completed: {task.completed ? "Yes" : "No"}</p>
    </div>
  );
}

export default Task;
