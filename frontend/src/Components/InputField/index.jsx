import React from "react";
import styles from "./index.module.css";

const InputField = ({ value, title, placeholder, onChange, type }) => {
  return (
    <div className={styles.container}>
      <span
        style={{
          visibility: value ? "" : "hidden",
        }}
      >
        {placeholder}
      </span>
      {title && (
        <span
          style={{
            display: "block",
          }}
        >
          {title}
        </span>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        name={placeholder.toLowerCase()}
        style={{
          borderColor: value ? "#4a7ab9" : "",
        }}
      />
    </div>
  );
};

export default InputField;
