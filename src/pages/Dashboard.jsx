import { useEffect, useState } from "react";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../services/authService";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", deadline: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    loadTodos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (isEditing) {
      const updated = await updateTodo(editId, form);
      if (updated) {
        setTodos(todos.map((t) => (t._id === editId ? updated : t)));
        resetForm();
      }
    } else {
      const newTodo = await addTodo(form);
      if (newTodo) {
        setTodos([...todos, newTodo]);
        resetForm();
      }
    }
  };

  const handleEdit = (todo) => {
    setForm(todo);
    setIsEditing(true);
    setEditId(todo._id);
  };

  const handleDelete = async (id) => {
    const deleted = await deleteTodo(id);
    if (deleted) {
      setTodos(todos.filter((t) => t._id !== id));
      if (isEditing && editId === id) {
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", deadline: "" });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Todo Dashboard</h2>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Form */}
      <div className="card p-4 shadow-sm mb-4">
        <form onSubmit={handleAddOrUpdate}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Task Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="deadline"
              className="form-control"
              value={form.deadline}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className={`btn ${isEditing ? "btn-warning" : "btn-primary"}`}
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>

      {/* Todo List */}
      <ul className="list-group">
        {todos.length === 0 ? (
          <li className="list-group-item text-muted">No tasks available</li>
        ) : (
          todos.map((todo) => (
            <li key={todo._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{todo.title}</h5>
                  {todo.description && (
                    <p className="mb-1 text-muted">{todo.description}</p>
                  )}
                  {todo.deadline && (
                    <small className="text-danger">Deadline: {todo.deadline}</small>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
