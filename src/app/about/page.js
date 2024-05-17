"use client";
import Navbar from "@/components/Navbar";
import MainView from "@/components/wrappers/MainView";
import styles from "./page.module.css";

export default function Home() {
  //Here's the whole story of this adventure. Enjoy :)
  return (
    <main className={styles.d_flex}>
      <Navbar />
      <MainView>
        <h1 className={styles.title}>About</h1>
        <div className={styles.main_container}>
          <div className={styles.card}>
            <h2>Implementation:</h2>
            <ul>
              <li>
                Next.js 14 (with App Router) was used as the framework for this
                project
              </li>
              <li>
                Developed CRUD operations for tasks using MongoDB (with
                Mongoose)
              </li>
              <li>
                Smooth semi-responsive design for larger devices and laptops
              </li>
              <li>Animated and styled using CSS modules</li>
              <li>High-priority tasks appear first in the dashboard</li>
              <li>Completed tasks vanish each day from the dashboard</li>
            </ul>
          </div>
          <div className={styles.card}>
            <h2>Future considerations:</h2>
            <ul>
              <li>
                Make the web app responsive for phones and smaller devices
              </li>
              <li>Place additional tooltips in each form</li>
              <li>
                Apply smoother animations (e.g. using a library like Framer
                Motion)
              </li>
              <li>
                Separate page where the user can add custom labels for the tasks
              </li>
              <li>Sorting filters based on the due date</li>
              <li>
                Separate page where all completed tasks can be viewed
                historically
              </li>
            </ul>
          </div>
          <div className={styles.card}>
            <h2>Contacts:</h2>
            <ul>
              <li>
                <a href="https://github.com/Npetr0v97/consilium">
                  Git Repository
                </a>
              </li>
              <li>Phone number: +359 887 33 40 20</li>
              <li>
                Email:{" "}
                <a href="mailto: nikolay.petrov.petrov.97@gmail.com">
                  nikolay.petrov.petrov.97@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </MainView>
    </main>
  );
}
