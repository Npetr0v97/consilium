import React from "react";
import Task from "./Task";
import styles from "./TasksList.module.css";

function TasksList({ tasks, deleteHandler }) {
  return (
    <div className={styles.tasks_container}>
      {tasks.map((task) => (
        <Task task={task} deleteHandler={deleteHandler} key={task._id} />
      ))}
    </div>
  );
}

export default TasksList;
