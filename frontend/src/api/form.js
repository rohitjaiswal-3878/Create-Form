import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const createForm = async (title, formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/form/create`, {
      title,
      formData,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

const getAllForms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/form/all`);
    return response;
  } catch (error) {
    return error.response;
  }
};

const getForm = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/form/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

const deleteForm = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/form/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

const updateForm = async (id, title, formData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/form/edit/${id}`, {
      title,
      formData,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export { createForm, getAllForms, getForm, deleteForm, updateForm };
