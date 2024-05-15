import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import styles from "./Task.module.css";

function Task({ task, deleteHandler }) {
  const [currentTask, setCurrentTask] = useState({ ...task });
  const [inEditMode, setInEditMode] = useState(false);
  const [summary, setSummary] = useState(task.summary);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [isPrioritized, setIsPrioritized] = useState(task.isPrioritized);
  const [labels, setLabels] = useState(task.labels.join(","));

  async function taskUpdater(updatedTask) {
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

      setCurrentTask({
        ...response.data.postUpdateTask,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function completionChangeHandler() {
    const completedDate = !currentTask.completed ? new Date() : null;

    const updatedTask = {
      ...currentTask,
      completedDate: completedDate,
      completed: !currentTask.completed,
    };

    await taskUpdater(updatedTask);
  }

  async function acceptHandler(e) {
    e.preventDefault();

    const updatedTask = {
      ...currentTask,
      summary,
      description,
      dueDate,
      isPrioritized,
      labels: labels.split(","),
    };

    await taskUpdater(updatedTask);
    setInEditMode(false);
  }

  async function declineHandler(e) {
    e.preventDefault();
    setInEditMode(false);
  }

  return (
    <div>
      <form className={inEditMode ? "" : styles.d_none}>
        <label>
          Summary: *
          <input
            type="text"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={
              dueDate !== null && dueDate !== ""
                ? new Date(dueDate).toISOString().split("T")[0]
                : null
            }
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          High Priority:
          <input
            type="checkbox"
            name="highPriority"
            checked={isPrioritized}
            onChange={() => setIsPrioritized((prevState) => !prevState)}
          />
        </label>
        <br />
        <label>
          Labels:
          <input
            type="text"
            name="labels"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
          />
          <small>Separate labels with commas</small>
        </label>
        <button onClick={acceptHandler}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button onClick={declineHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </form>
      <div className={!inEditMode ? "" : styles.d_none}>
        <h2 className={styles.colors}>{currentTask.summary}</h2>
        <p>{currentTask.description}</p>
        <p>Due Date: {currentTask.dueDate}</p>
        <p>
          Is Prioritized:
          <input
            type="checkbox"
            id="isPrioritized"
            checked={currentTask.completed}
            onChange={completionChangeHandler}
            className={inEditMode ? "" : styles.d_none}
          />
          <FontAwesomeIcon
            icon={faFire}
            className={currentTask.isPrioritized ? "" : styles.d_none}
          />
        </p>
        <ul>
          {currentTask.labels.map((label, labelIndex) => (
            <li key={labelIndex}>{label}</li>
          ))}
        </ul>
        <p>
          Completed:
          <input
            type="checkbox"
            id="completed"
            checked={currentTask.completed}
            onChange={completionChangeHandler}
          />
        </p>
        <button
          onClick={() => {
            setInEditMode((prevState) => !prevState);
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
      <button onClick={() => deleteHandler(currentTask._id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default Task;
