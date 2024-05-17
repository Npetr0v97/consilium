import React from "react";
import Task from "./Task";
import styles from "./TasksList.module.css";

function TasksList({
  tasks,
  deleteHandler,
  multiSelectOptions,
  setTriggerSort,
}) {
  return (
    <div className={styles.tasks_container}>
      {/* After getting the task array we first filter old completed items, meaning that completed===false or completedDate!==currentDate
        Then we sort the array based on the priority and finally using the map function we generate the items with the Task component plus passing all required props     
      */}
      {tasks
        .filter(
          (task) =>
            !task.completed ||
            (new Date(task.completedDate).getFullYear() ===
              new Date().getFullYear() &&
              new Date(task.completedDate).getMonth() ===
                new Date().getMonth() &&
              new Date(task.completedDate).getDate() === new Date().getDate())
        )
        .sort((a, b) => b.isPrioritized - a.isPrioritized)
        .map((task) => (
          <Task
            task={task}
            setTriggerSort={setTriggerSort}
            multiSelectOptions={multiSelectOptions}
            deleteHandler={deleteHandler}
            key={task._id}
          />
        ))}
    </div>
  );
}

export default TasksList;
