import React from "react";
import { useState } from "react";

function NewTaskForm({ updateTasksArray }) {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isPrioritized, setIsPrioritized] = useState(false);
  const [labels, setLabels] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      summary,
      description,
      dueDate: new Date(dueDate),
      isPrioritized,
      labels,
    };

    console.log(newTask);
    updateTasksArray([{ name: "Yeahh buddyyyyy", labels: ["x", "y"] }]);
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
          onChange={(e) => setIsPrioritized(e.target.value)}
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
