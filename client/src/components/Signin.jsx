import React, { useState } from "react";
import { signinUser } from "../api/auth.js";
import { useNavigate, Link } from "react-router-dom";

export default function Signin({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  //event handlers

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(name, email, password);
    const dataToSend = {
      email,
      password,
    };
    try {
      const response = await signinUser(dataToSend);
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);
      setSuccess("Logged in successfully!");
      setError(null);
      setIsLoggedIn(true);
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      setSuccess(null);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="signup-page">
      <h1 className="signup-header">Sign In</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="signup-label">Email</label>
        <input
          type="email"
          onChange={handleEmail}
          placeholder="Enter your email"
        />

        <label className="signup-label">Password</label>
        <input
          type="password"
          onChange={handlePassword}
          placeholder="Enter your password"
        />

        <button className="submit" type="submit">
          Sign In
        </button>
      </form>

      <p>
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
