import React from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { merienda } from "@/app/fonts";

import {
  faListCheck,
  faCircleInfo,
  faStore,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navbar() {
  const pathname = usePathname();
  const [hasHoverEffects, setHasHoverEffects] = useState(false);
  return (
    <nav className={styles.main_container}>
      <div className={styles.logo_div}>
        <Link className={styles.logo} href="/">
          <FontAwesomeIcon icon={faSeedling} />
        </Link>

        <Link className={styles.logo_text} href="/">
          <h1 className={merienda.className}>CONSILIUM</h1>
        </Link>
      </div>
      <div className={styles.link_container}>
        <div
          className={`${styles.navlink_div} ${
            hasHoverEffects === "/" || pathname === "/"
              ? styles.navlink_div_hovered
              : ""
          }`}
        ></div>
        <Link
          onMouseEnter={(e) => {
            setHasHoverEffects(e.target.getAttribute("href"));
          }}
          onMouseLeave={() => {
            setHasHoverEffects("");
          }}
          href="/"
          className={`${styles.navlink} ${
            pathname === "/" ? styles.navlink_active : ""
          }`}
        >
          <FontAwesomeIcon icon={faListCheck} /> Dashboard
        </Link>
      </div>
      <div className={styles.link_container}>
        <div
          className={`${styles.navlink_div} ${
            hasHoverEffects === "/about" || pathname === "/about"
              ? styles.navlink_div_hovered
              : ""
          }`}
        ></div>
        <Link
          onMouseEnter={(e) => {
            setHasHoverEffects(e.target.getAttribute("href"));
          }}
          onMouseLeave={() => {
            setHasHoverEffects("");
          }}
          href="/about"
          className={`${styles.navlink} ${
            pathname === "/about" ? styles.navlink_active : ""
          }`}
        >
          <FontAwesomeIcon icon={faCircleInfo} /> About
        </Link>
      </div>
      <div className={styles.link_container}>
        <div
          className={`${styles.navlink_div} ${
            hasHoverEffects === "/change-plan" || pathname === "/change-plan"
              ? styles.navlink_div_hovered
              : ""
          }`}
        ></div>
        <Link
          onMouseEnter={(e) => {
            setHasHoverEffects(e.target.getAttribute("href"));
          }}
          onMouseLeave={() => {
            setHasHoverEffects("");
          }}
          href="/change-plan"
          className={`${styles.navlink} ${
            pathname === "/change-plan" ? styles.navlink_active : ""
          }`}
        >
          <FontAwesomeIcon icon={faStore} /> Change plan
        </Link>
      </div>
      <p className={styles.paragraph}>
        Uh-Oh! You are currently using the free version of Consilium and some
        functionalities might be missing. <br />
        Go to the{" "}
        <Link className={styles.cp_paragraph_link} href="/change-plan">
          Change plan
        </Link>{" "}
        menu in order to pay some money for more features that you probably
        won't use.
      </p>
    </nav>
  );
}

export default Navbar;
