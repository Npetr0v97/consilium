"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TasksList from "@/components/TasksList";
import NewTaskForm from "@/components/NewTaskForm";
import Navbar from "@/components/Navbar";
import MainView from "@/components/wrappers/MainView";

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

  return (
    <main className={styles.d_flex}>
      <Navbar />
      <MainView>
        <TasksList tasks={tasksArray} deleteHandler={deleteHandler} />
        {/* <NewTaskForm updateTasksArray={setTasksArray} /> */}
      </MainView>
    </main>
  );
}
