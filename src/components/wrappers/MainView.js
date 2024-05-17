import React from "react";
import styles from "./MainView.module.css";

//A wrapper for the main window where all the content gets generated. There might be better ways to do that, but I just wanted to show that I am aware how wrapper components work.
export function MainView(props) {
  return <div className={styles.main_view}>{props.children}</div>;
}

export default MainView;
