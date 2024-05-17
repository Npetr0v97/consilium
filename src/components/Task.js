import { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import Multiselect from "multiselect-react-dropdown";

import styles from "./Task.module.css";

function Task({ task, deleteHandler, multiSelectOptions, setTriggerSort }) {
  const [currentTask, setCurrentTask] = useState({ ...task });
  const [inEditMode, setInEditMode] = useState(false);
  const [summary, setSummary] = useState(task.summary);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [isPrioritized, setIsPrioritized] = useState(task.isPrioritized);
  const [labels, setLabels] = useState([...task.labels]);
  const multiSelectRef = useRef(null);

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
      setTriggerSort((prevState) => !prevState);
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
      labels: [...multiSelectRef.current.getSelectedItems()],
    };

    await taskUpdater(updatedTask);
    setInEditMode(false);
  }

  async function declineHandler(e) {
    e.preventDefault();
    setInEditMode(false);
  }

  return (
    <div
      className={`${styles.main_div} ${
        currentTask.completed ? styles.completed_task : ""
      }`}
    >
      <form
        className={`${styles.form_style} ${inEditMode ? "" : styles.d_none}`}
      >
        <label>
          Summary <span className={styles.red}>*</span>{" "}
          <input
            className={styles.form_input}
            type="text"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <textarea
            className={styles.form_input}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Due Date
          <input
            className={styles.form_input}
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

        <label>
          Labels
          {/* <input
            className={styles.form_input}
            type="text"
            name="labels"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
          /> */}
          <Multiselect
            isObject={false}
            hidePlaceholder={true}
            placeholder=""
            showArrow={true}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck() {}}
            onSearch={function noRefCheck() {}}
            onSelect={function noRefCheck() {}}
            options={multiSelectOptions}
            selectionLimit={4}
            ref={multiSelectRef}
            selectedValues={[...task.labels]}
            style={{
              chips: {
                background: "purple",
              },
              multiselectContainer: {
                color: "purple",
              },
              searchBox: {
                border: "none",
                background: "white",
                "border-radius": "10px",
                height: "80px",
                color: "red",
              },
            }}
          />
        </label>
        <label className={styles.d_flex}>
          <div>
            Toggle <u>Priority</u>
          </div>
          <div
            onClick={() => {
              setIsPrioritized((prevState) => !prevState);
            }}
            className={styles.prio_div}
          >
            <FontAwesomeIcon
              icon={faFireFlameCurved}
              className={`${styles.prio_one} ${
                isPrioritized ? "" : styles.no_prio
              }`}
            />
            <FontAwesomeIcon
              icon={faFireFlameCurved}
              className={`${styles.prio_sec} ${
                isPrioritized ? "" : styles.no_prio
              }`}
            />
          </div>
        </label>
        <div className={styles.form_buttons}>
          <button
            onClick={acceptHandler}
            className={`${styles.button} ${styles.form_button_accept}`}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            onClick={declineHandler}
            className={`${styles.button} ${styles.form_button_decline}`}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </form>
      <div className={!inEditMode ? "" : styles.d_none}>
        <h2 className={styles.colors}>{currentTask.summary}</h2>
        <p>{currentTask.description}</p>
        <div className={styles.tags}>
          <div
            className={`${styles.label} ${styles.dueLabel} ${
              currentTask.dueDate !== null && currentTask.dueDate !== ""
                ? ""
                : styles.d_none
            }`}
          >
            Due:
            {new Date(currentTask.dueDate)
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replaceAll("/", ".")}
          </div>

          {currentTask.labels.length !== 0 ? (
            currentTask.labels.map((label, labelIndex) => (
              <div
                className={`${styles.label} ${styles.categoryLabel}`}
                key={labelIndex}
              >
                {label}
              </div>
            ))
          ) : (
            <div></div>
          )}

          <div className={styles.prio_div}>
            <FontAwesomeIcon
              icon={faFireFlameCurved}
              className={`${styles.prio_one} ${
                currentTask.isPrioritized ? "" : styles.d_none
              }`}
            />
            <FontAwesomeIcon
              icon={faFireFlameCurved}
              className={`${styles.prio_sec} ${
                currentTask.isPrioritized ? "" : styles.d_none
              }`}
            />
          </div>
        </div>

        <div className={styles.display_buttons}>
          <button
            onClick={completionChangeHandler}
            className={`${styles.button} ${
              currentTask.completed
                ? styles.completed_button
                : styles.complete_button
            }`}
          >
            {currentTask.completed ? "Completed" : "Complete"}
          </button>

          <button
            className={`${styles.button} ${
              currentTask.completed ? styles.d_none : ""
            }`}
            onClick={() => {
              setInEditMode((prevState) => !prevState);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>

          <button
            className={`${styles.button} ${
              currentTask.completed ? styles.d_none : ""
            }`}
            onClick={() => deleteHandler(currentTask._id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;
