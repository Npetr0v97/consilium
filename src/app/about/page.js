"use client";
import Navbar from "@/components/Navbar";
import MainView from "@/components/wrappers/MainView";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.d_flex}>
      <Navbar />
      <MainView>
        <h1>About Page</h1>
      </MainView>
    </main>
  );
}
