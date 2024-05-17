"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TasksList from "@/components/TasksList";
import NewTaskForm from "@/components/NewTaskForm";
import Navbar from "@/components/Navbar";
import MainView from "@/components/wrappers/MainView";

export default function Home() {
  //State that will update the list of tasks each time a change is made
  const [tasksArray, setTasksArray] = useState([]);

  //State for the multi select field. Generally state is not required in this case because the use library for the multiselect doesn't allow for dynamic changes of the pre-selected values, but state can be used in case this feature gets further developed
  const [multiSelectOptions, setMultiselectOptions] = useState([]);

  //State that is propagated to the child components. The idea is for it to trigger a rerender of the whole task array so that it gets resorted based on the priority changes. Can be further optimized to be triggered only the priority field is updated
  const [triggerSort, setTriggerSort] = useState(false);

  //Fetching the task array
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getTasks() {
      const options = {
        method: "GET",
        url: "/api/tasks",
        signal,
      };

      try {
        const response = await axios.request(options);

        if (response.status !== 200) {
          throw new Error("Failed to fetch Tasks");
        }
        const tasks = response.data.tasks;

        setTasksArray(tasks);
      } catch (error) {
        console.log(error);
      }
    }

    getTasks();

    return () => {
      // Cleanup function

      controller.abort();
    };
  }, [triggerSort]);

  //Fetching the label options
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getMultiSelectOptions() {
      const options = {
        method: "GET",
        url: "/api/labels",
        signal,
      };

      try {
        const response = await axios.request(options);

        if (response.status !== 200) {
          throw new Error("Failed to fetch Labels");
        }
        const labels = response.data.labels;
        setMultiselectOptions(labels.map((label) => label.name));
      } catch (error) {
        console.log(error);
      }
    }

    getMultiSelectOptions();
    return () => {
      // Cleanup function

      controller.abort();
    };
  }, []);

  //The function gets drilled down as props in order for the lower level components to properly update the state
  async function deleteHandler(id) {
    const options = {
      method: "DELETE",
      url: `/api/tasks/${id}`,
    };

    try {
      const response = await axios.request(options);

      if (response.status !== 200) {
        throw new Error("Failed to delete a tasks");
      }
      const deletedId = response.data.deletedTask._id;
      const newTasksArray = tasksArray.filter((task) => task._id !== deletedId);
      setTasksArray([...newTasksArray]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.d_flex}>
      <Navbar />
      <MainView>
        <NewTaskForm
          updateTasksArray={setTasksArray}
          multiSelectOptions={multiSelectOptions}
        />
        <TasksList
          tasks={tasksArray}
          setTriggerSort={setTriggerSort}
          deleteHandler={deleteHandler}
          multiSelectOptions={multiSelectOptions}
        />
      </MainView>
    </main>
  );
}
