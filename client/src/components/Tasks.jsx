import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  createTask,
  deleteTask as apiDeleteTask,
} from "../api/tasks";

const Header = ({ onLogout }) => (
  <div className="tasks-header">
    <h1 className="tasks-title">Task Manager</h1>
    <div>
      <button onClick={onLogout} className="logout-link">
        Logout
      </button>
    </div>
  </div>
);

const TaskList = ({ tasks, onDelete }) => {
  if (tasks.length === 0) return <p>No tasks yet. Add one above!</p>;

  return (
    <ol>
      {tasks.map((task) => (
        <li key={task._id}>
          <span>{task.title}</span>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ol>
  );
};

export default function Tasks({ setIsLoggedIn }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  }, [navigate, setIsLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleLogout();
      return;
    }

    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        console.error("Failed to load tasks:", err);
        setError("Failed to load tasks. Please try again later.");
        if (err.status === 401 || err.status === 403) {
          handleLogout();
        }
      });
  }, [handleLogout]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const token = localStorage.getItem("token");
    if (!token) {
      handleLogout();
      return;
    }

    try {
      const createdTask = await createTask({ title: newTask });
      setTasks([...tasks, createdTask]);
      setNewTask("");
      setError("");
    } catch (err) {
      console.error("Add task failed:", err.message);
      setError(`Failed to add task: ${err.message}`);
    }
  };

  const deleteTask = async (id) => {
    try {
      await apiDeleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err.message);
      setError(`Failed to delete task: ${err.message}`);
    }
  };

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <Header onLogout={handleLogout} />

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        <TaskList tasks={tasks} onDelete={deleteTask} />
      </div>
    </div>
  );
}
