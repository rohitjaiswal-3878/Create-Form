import React from "react";
import styles from "./index.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const FormInput = ({ value, index, onEdit, onDelete }) => {
  return (
    <div className={styles.container}>
      <input type="text" readOnly placeholder={value ? value : "Title"} />
      <span className={styles.edit} onClick={() => onEdit(index)}>
        <MdEdit />
      </span>
      <span className={styles.delete} onClick={() => onDelete(index)}>
        <MdDelete />
      </span>
    </div>
  );
};

export default FormInput;
