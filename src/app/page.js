"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TasksList from "@/components/TasksList";
import NewTaskForm from "@/components/NewTaskForm";

export default function Home() {
  const [tasksArray, setTasksArray] = useState([]);
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
  }, []);

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

  async function clickHandler() {
    try {
      const options = {
        method: "POST",
        url: `/api/tasks`,
      };

      const response = await axios.request(options);
      if (response.status != 200) {
        throw new Error("Unable to create Task");
      } else {
        console.log(response.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAllItemsHandler() {
    try {
      const options = {
        method: "DELETE",
        url: `/api/tasks`,
        params: {
          theMagicWord: "ERssASE",
        },
      };

      const response = await axios.request(options);
      if (response.status != 200) {
        throw new Error("Unable to delete all tasks");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.main}>
      <h1>hello world</h1>
      <TasksList tasks={tasksArray} deleteHandler={deleteHandler} />
      <NewTaskForm updateTasksArray={setTasksArray} />
      <button onClick={clickHandler}>Create new tasks</button>

      <button onClick={deleteAllItemsHandler}>Emergency delete</button>
    </main>
  );
}
