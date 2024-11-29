import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { MdEdit } from "react-icons/md";
import InputField from "../InputField";
import FormInput from "../FormInput";
import { createForm, getForm, updateForm } from "../../api/form";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";

const Create = () => {
  const navigate = useNavigate();
  const formId = useParams().id;
  const [toggleInputs, setToggleInputs] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [status, setStatus] = useState(false);
  const [selForEdit, setSelForEdit] = useState(-1);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setLoader(true);
      getForm(formId).then((res) => {
        setLoader(false);
        if (res.status == 200) {
          setTitle(res.data.title);
          setFormData(res.data.formData);
        } else {
          console.log(res.data);
        }
      });
    } else {
      setLoader(false);
    }
  }, [location]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const createInput = (type) => {
    let input = {
      type,
      title: "",
      placeholder: "",
      value: "",
    };
    if (formData.length < 20) {
      setFormData([...formData, input]);
    } else {
      toast.error("Only 20 inputs allowed!");
    }
  };

  const onEdit = (index) => {
    setEditTitle(false);
    setSelForEdit(index);
  };

  const onDelete = (index) => {
    setFormData(formData.filter((e, i) => i != index));
    setSelForEdit(-1);
  };

  const handleInputFieldEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    formData[selForEdit] = { ...formData[selForEdit], [name]: value };
    setFormData([...formData]);
  };

  const handleCreate = () => {
    let err = 0;

    if (title == "") {
      err++;
      toast.error("Please enter the Form title");
    } else if (formData.length == 0) {
      err++;
      toast.error("Form should contain atlest one Input field!");
    } else {
      let empty = 0;
      for (let i = 0; i < formData.length; i++) {
        if (formData[i].title == "") {
          empty++;
          break;
        }
      }
      if (empty) {
        err++;
        toast.error("Title is required in input fields!");
      }
    }

    if (err == 0) {
      setStatus(true);
      if (location.state?.reason == "update") {
        updateForm(formId, title, formData).then((res) => {
          setStatus(false);
          if (res.status == 200) {
            toast.success(res.data.msg);
            navigate("/");
          } else {
            toast.error("Something went wrong while updation!");
            console.log(res.data);
          }
        });
      } else {
        createForm(title, formData).then((res) => {
          setStatus(false);
          if (res.status == 201) {
            toast.success(res.data.msg);
            navigate("/");
          } else {
            toast.error("Something went wrong while creation!");
            console.log(res.data);
          }
        });
      }
    }
  };
  return loader ? (
    <span
      style={{
        fontSize: "1.5rem",
        marginTop: "20%",
      }}
    >
      Loading...
    </span>
  ) : (
    <div className={styles.container}>
      <h2>Create New Form</h2>
      <div className={styles.createSection}>
        {/* form view */}
        <div className={styles.left}>
          {/* Title */}
          <div className={styles.title}>
            <h2>{title ? title : "Untitled Form"}</h2>
            <MdEdit
              style={{ fontSize: "2.5rem", color: "#4A7AB9" }}
              onClick={() => {
                setEditTitle(true);
                setSelForEdit(-1);
              }}
            />
          </div>

          {/* Inputs container */}
          <div className={styles.formContainer}>
            {formData.map((item, index) => (
              <FormInput
                value={item.title}
                key={index}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* Add inputs */}
          <div
            className={styles.input}
            onClick={() => {
              setToggleInputs(!toggleInputs);
            }}
          >
            {toggleInputs ? "Close add input" : "Add input"}
          </div>

          {toggleInputs && (
            <ul className={styles.selInputs}>
              <li onClick={() => createInput("text")}>Text</li>
              <li onClick={() => createInput("number")}>Number</li>
              <li onClick={() => createInput("email")}>Email</li>
              <li onClick={() => createInput("password")}>Password</li>
              <li onClick={() => createInput("date")}>Date</li>
            </ul>
          )}

          <button className={styles.submit}>Submit</button>
        </div>

        {/* Editor view */}
        <div className={styles.right}>
          <h2>Form Editor</h2>
          <div className={styles.editSection}>
            {editTitle && (
              <InputField
                type={"text"}
                placeholder={"Title"}
                onChange={handleTitle}
                value={title}
              />
            )}
            {selForEdit != -1 && (
              <div className={styles.editInputTypes}>
                <span className={styles.title}>
                  {formData[selForEdit].type}
                </span>
                <InputField
                  type={"text"}
                  placeholder={"Title"}
                  onChange={handleInputFieldEdit}
                  value={formData[selForEdit].title}
                />
                <InputField
                  type={"text"}
                  placeholder={"Placeholder"}
                  onChange={handleInputFieldEdit}
                  value={formData[selForEdit].placeholder}
                />
              </div>
            )}
          </div>
          {/* <span>Select to see editor</span> */}
        </div>
      </div>
      {location.state?.reason == "update" ? (
        <button onClick={handleCreate} disabled={status}>
          {status ? "Loading..." : "Update Form"}
        </button>
      ) : (
        <button onClick={handleCreate} disabled={status}>
          {status ? "Loading..." : "Create Form"}
        </button>
      )}
    </div>
  );
};

export default Create;
