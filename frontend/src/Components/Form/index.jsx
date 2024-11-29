import React from "react";
import styles from "./index.module.css";
import { Outlet } from "react-router";
const Form = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Form;
