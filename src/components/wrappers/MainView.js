import React from "react";
import styles from "./MainView.module.css";

export function MainView(props) {
  return <div className={styles.main_view}>{props.children}</div>;
}

export default MainView;
