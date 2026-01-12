const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! Status: ${response.status}`);
  }
  return data;
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const getTasks = () => {
  return fetch(`${BACKEND_URL}/tasks`, {
    headers: getAuthHeaders(),
  }).then(handleResponse);
};

export const createTask = (taskData) => {
  return fetch(`${BACKEND_URL}/tasks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  }).then(handleResponse);
};

export const deleteTask = (taskId) => {
  return fetch(`${BACKEND_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);
};
