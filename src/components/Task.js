import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Task({ task, deleteHandler }) {
  const [currentTask, setCurrentTask] = useState({ ...task });

  async function completionChangeHandler() {
    const completedDate = !currentTask.completed ? new Date() : null;

    const updatedTask = {
      ...currentTask,
      completedDate: completedDate,
      completed: !currentTask.completed,
    };
    const options = {
      method: "PUT",
      url: `/api/tasks/${currentTask._id}`,
      data: updatedTask,
    };

    try {
      const response = await axios.request(options);

      if (response.status !== 200) {
        throw new Error("Failed to create a tasks");
      }

      setCurrentTask({ ...response.data.postUpdateTask });
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div>
      <h2>{currentTask.name}</h2>
      <p>{currentTask.description}</p>
      <p>Due Date: {currentTask.dueDate}</p>
      <p>Is Prioritized: {currentTask.isPrioritized ? "Yes" : "No"}</p>
      <ul>
        {task.labels.map((label, labelIndex) => (
          <li key={labelIndex}>{label}</li>
        ))}
      </ul>
      <p>
        Completed:
        <input
          type="checkbox"
          id="isPrioritized"
          checked={currentTask.completed}
          onChange={completionChangeHandler}
        />
      </p>
      <button>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button onClick={()=>deleteHandler(currentTask._id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default Task;
