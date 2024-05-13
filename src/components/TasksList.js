import React from "react";
import { useEffect, useState } from "react";
import Task from "./Task";

function TasksList({ tasks }) {
  console.log(tasks);
  return (
    <div>
      {tasks.map((task, index) => (
        <Task task={task} key={index} />
      ))}
    </div>
  );
}

export default TasksList;
