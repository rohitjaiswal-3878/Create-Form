import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router";
import { deleteForm, getAllForms } from "../../api/form";
import toast from "react-hot-toast";

const Homepage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState(-1);
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    getAllForms().then((res) => {
      if (res.status == 200) {
        setForms(res.data);
      } else {
        toast.error("Something went wrong while fetching data!");
        console.log(res.data);
      }
    });
  }, []);

  const handleCreateForm = () => {
    navigate("/form/create");
  };

  const onView = (id) => {
    navigate(`/form/${id}`);
  };

  const onUpdate = (id) => {
    navigate(`/form/${id}/edit`, { state: { reason: "update", id } });
  };

  const onDelete = (id) => {
    if (!deleteStatus) {
      setDeleteStatus(true);
      deleteForm(id).then((res) => {
        setDeleteStatus(false);
        if (res.status == 200) {
          setForms(forms.filter((e, i) => e._id != id));
          toast.success(res.data.msg);
        } else {
          toast.error("Something went wrong while deleting!");
          console.log(res.data);
        }
      });
    }
  };
  return (
    <div className={styles.container}>
      {/* Heading */}
      <div className={styles.header}>
        <h1>Welcome to Form.com</h1>
        <span>This is a simple form builder</span>
        <button onClick={handleCreateForm}>Create new form</button>
      </div>

      {/* Form section */}
      <div className={styles.forms}>
        <h1>Forms</h1>

        <div className={styles.allForms}>
          {forms != -1 ? (
            forms.length != 0 ? (
              forms.map((form, index) => (
                <div className={styles.formCart} key={index}>
                  <span className={styles.heading}>{form.title}</span>
                  <div className={styles.buttons}>
                    <span
                      style={{ color: "green" }}
                      onClick={() => onView(form._id)}
                    >
                      View
                    </span>
                    <span
                      style={{ color: "blue" }}
                      onClick={() => onUpdate(form._id)}
                    >
                      Edit
                    </span>
                    <span
                      style={{ color: "red" }}
                      onClick={() => onDelete(form._id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span>You have no forms created yet.</span>
            )
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
