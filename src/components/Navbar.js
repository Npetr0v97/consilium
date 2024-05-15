import React from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const pathname = usePathname();
  return (
    <nav className={styles.main_container}>
      <div className={styles.link_container}>
        <div className={styles.navlink_div}></div>
        <Link
          href="/"
          className={`${styles.navlink} ${
            pathname === "/" ? styles.link_active : ""
          }`}
        >
          Dashboard
        </Link>
      </div>
      <div className={styles.link_container}>
        <div className={styles.navlink_div}></div>
        <Link
          href="/about"
          className={`${styles.navlink} ${
            pathname === "/about" ? styles.link_active : ""
          }`}
        >
          About
        </Link>
      </div>
      <div className={styles.link_container}>
        <div className={styles.navlink_div}></div>
        <Link
          href="/change-plan"
          className={`${styles.navlink} ${
            pathname === "/change-plan" ? styles.link_active : ""
          }`}
        >
          Change plan
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
