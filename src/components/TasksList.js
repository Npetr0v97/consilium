import React from "react";

import Task from "./Task";

function TasksList({ tasks, deleteHandler }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task task={task} deleteHandler={deleteHandler} key={task._id} />
      ))}
    </div>
  );
}

export default TasksList;
