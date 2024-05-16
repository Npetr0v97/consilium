import React from "react";
import axios from "axios";
import { useState } from "react";
import styles from "./Task.module.css";
import secondaryStyles from "./NewTaskForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

function NewTaskForm({ updateTasksArray }) {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isPrioritized, setIsPrioritized] = useState(false);
  const [labels, setLabels] = useState("");
  const [inCreateMode, setInCreateMode] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const buttonRef = useRef(null);

  async function acceptHandler(e) {
    e.preventDefault();

    const newTask = {
      summary,
      description,
      dueDate: new Date(dueDate),
      isPrioritized,
      labels: labels !== "" ? labels.split(",") : [],
    };

    const options = {
      method: "POST",
      url: "/api/tasks",
      data: newTask,
    };

    try {
      const response = await axios.request(options);

      if (response.status !== 200) {
        throw new Error("Failed to create a tasks");
      }
      const returnedTask = response.data.createdTask;

      updateTasksArray((prevState) => [...prevState, returnedTask]);
      setSummary("");
      setDescription("");
      setDueDate("");
      setIsPrioritized(false);
      setLabels("");
      setInCreateMode(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function declineHandler(e) {
    e.preventDefault();
    setInCreateMode(false);
  }

  return (
    <div>
      <div
        className={`${secondaryStyles.backdrop} ${
          inCreateMode ? secondaryStyles.backdrop_on : ""
        }`}
      ></div>
      <button
        ref={buttonRef}
        onClick={() => {
          setInCreateMode(true);
          setX(buttonRef.current.offsetLeft);
          setY(buttonRef.current.offsetTop);
        }}
        className={`${secondaryStyles.create_button}  ${
          inCreateMode ? secondaryStyles.o_zero : ""
        }`}
      >
        <FontAwesomeIcon icon={faPlus} /> New Task
      </button>
      <form
        className={`${styles.form_style} ${secondaryStyles.form_size} ${
          inCreateMode ? "" : styles.d_none
        }`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
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
            value={dueDate}
            // value={
            //   dueDate !== null && dueDate !== ""
            //     ? new Date(dueDate).toISOString().split("T")[0]
            //     : null
            // }
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <label>
          Labels
          <input
            className={styles.form_input}
            type="text"
            name="labels"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
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
    </div>
  );
}

export default NewTaskForm;
