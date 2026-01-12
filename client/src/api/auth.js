const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const signupUser = async (data) => {
  return fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

const signinUser = async (data) => {
  return fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export { signupUser, signinUser };
