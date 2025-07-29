import axios from "axios";

const API_URL = "https://auth-todo-list-backend-s3qp.onrender.com";

// === AUTH ===
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (err) {
    return {};
  }
};

export const registerUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    return {};
  }
};

// === Helper to attach Authorization header ===
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// === TODOS ===
export const fetchTodos = async () => {
  try {
    const res = await axios.get(`${API_URL}/todos`, authHeader());
    return res.data;
  } catch (err) {
    console.error("Error fetching todos:", err);
    return [];
  }
};

export const addTodo = async (todoData) => {
  try {
    const res = await axios.post(`${API_URL}/todos`, todoData, authHeader());
    return res.data;
  } catch (err) {
    console.error("Error adding todo:", err);
    return null;
  }
};

export const updateTodo = async (id, updatedData) => {
  try {
    const res = await axios.put(
      `${API_URL}/todos/${id}`,
      updatedData,
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.error("Error updating todo:", err);
    return null;
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/todos/${id}`, authHeader());
    return res.data;
  } catch (err) {
    console.error("Error deleting todo:", err);
    return null;
  }
};
