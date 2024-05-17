"use client";
import Navbar from "@/components/Navbar";
import MainView from "@/components/wrappers/MainView";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Home() {
  //I hope someone finds this page funny :)
  //Nothing serios in terms of functionality, just added this page for aesthetics
  const [price, setPrice] = useState(10);
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prevCount) => prevCount + 1);
    }, 1000);
    if (price === 50) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [price]);

  return (
    <main className={styles.d_flex}>
      <Navbar />
      <MainView>
        <div
          className={`${styles.backdrop} ${modalOn ? styles.backdrop_on : ""}`}
        ></div>
        <d className={`${styles.modal} ${modalOn ? styles.modal_on : ""}`}>
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.close_modal}
            onClick={() => setModalOn(false)}
          />

          <p className={styles.content}>
            We haven&apos;t developed those features yet. However, we will
            gladly take your money.
          </p>
        </d>
        <h1 className={styles.title}>Change Plan</h1>
        <main>
          <div className={styles.pricing_container}>
            <div className={styles.pricing_plan}>
              <h2>Free Plan</h2>
              <h3>$0/month</h3>
              <div className={styles.features}>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Unlimited tasks
                </p>
                <p>
                  <FontAwesomeIcon icon={faTimes} /> Custom labels
                </p>
                <p>
                  <FontAwesomeIcon icon={faTimes} /> Reminders
                </p>
                <p>
                  <FontAwesomeIcon icon={faTimes} /> Filter by due date
                </p>
                <p>
                  <FontAwesomeIcon icon={faTimes} /> Filter by completed date
                </p>
              </div>
              <h3>You get what you see...</h3>
            </div>
            <div className={styles.pricing_plan}>
              <h2>Premium Plan</h2>
              <h3>
                ${price}/month{" "}
                <span className={styles.small_text}>
                  Grab the offer before it&apos;s too late
                </span>
              </h3>

              <div className={styles.features}>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Unlimited tasks
                </p>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Custom labels
                </p>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Reminders
                </p>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Filter by due date
                </p>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Filter by completed date
                </p>
              </div>
              <div>
                <button
                  className={styles.purchase_button}
                  onClick={() => setModalOn(true)}
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </main>
      </MainView>
    </main>
  );
}
