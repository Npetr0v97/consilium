import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import styles from "./Task.module.css";
import secondaryStyles from "./NewTaskForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Multiselect from "multiselect-react-dropdown";

function NewTaskForm({ updateTasksArray, multiSelectOptions }) {
  //All the state required to control the input fields
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isPrioritized, setIsPrioritized] = useState(false);

  //State that toggles on and off the create form
  const [inCreateMode, setInCreateMode] = useState(false);

  //I wanted to generate the create form exactly on top of the create button. I achieved this by having the form with position absolute and setting it's top and left properties based on the create button coordinates. These is the state for the coordinates
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  //The ref is used to retrieve the coordinates of the create button
  const buttonRef = useRef(null);

  //The ref is required in order to retrieve the selected options from the multi select field
  const multiSelectRef = useRef(null);

  //Confirming the creation of the new ticket
  async function acceptHandler(e) {
    e.preventDefault();
    const newTask = {
      summary,
      description,
      dueDate: new Date(dueDate),
      isPrioritized,
      labels: [...multiSelectRef.current.getSelectedItems()],
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

      //Reset fields
      updateTasksArray((prevState) => [...prevState, returnedTask]);
      setSummary("");
      setDescription("");
      setDueDate("");
      setIsPrioritized(false);
      setInCreateMode(false);
    } catch (error) {
      console.log(error);
    }
  }

  //Declining the task creation just closes the form window
  async function declineHandler(e) {
    e.preventDefault();
    setInCreateMode(false);
  }

  return (
    <div>
      {/*Via this div I blur everything else for editing besides the create form*/}
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
        {/* Standard controlled components. Summary, Description and Labels have a size restriction so that items don't become that big. I have still left the card size of each task to be dynamic (not fixed) because I though it looks cooler when different items have different look */}
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
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <label>
          Labels (up to 4)
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
            {/* A bit of a janky way to draw a fire icon from two smaller fire icons */}
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
