import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useParams } from "react-router";
import { getForm } from "../../api/form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import InputField from "../InputField";

const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(-1);

  useEffect(() => {
    getForm(id).then((res) => {
      if (res.status == 200) {
        setForm(res.data);
      } else {
        toast.error("Something went wrong while loading from data!");
        console.log(res.data);
      }
    });
  }, []);

  const handleInputValue = (e) => {};

  const handleSubmit = () => {
    toast.success("Form Submitted!");
    navigate("/");
  };

  return form != -1 ? (
    <div className={styles.form}>
      <h1>{form.title}</h1>
      <div className={styles.inputs}>
        {form.formData.map((input, index) => (
          <div key={index}>
            <InputField
              title={input.title}
              placeholder={input.placeholder}
              onChange={handleInputValue}
              type={input.type}
            />
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  ) : (
    <span
      style={{
        fontSize: "2rem",
        marginTop: "20%",
      }}
    >
      Loading...
    </span>
  );
};

export default View;
