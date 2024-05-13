import React from "react";
import axios from "axios";
import { useState } from "react";

function NewTaskForm({ updateTasksArray }) {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isPrioritized, setIsPrioritized] = useState(false);
  const [labels, setLabels] = useState("");

  // Function to handle form submission
  const handleSubmit = async function (e) {
    e.preventDefault();

    const newTask = {
      name: summary,
      description,
      dueDate: new Date(dueDate),
      isPrioritized: isPrioritized === "on" ? true : false,
      labels,
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={dueDate}
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
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewTaskForm;
