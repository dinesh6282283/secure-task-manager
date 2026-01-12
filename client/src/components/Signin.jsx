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
    <>
      <h1 className="signup-header">Sign-in</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="signup-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className="email"
          onChange={handleEmail}
          placeholder="Enter the email:"
        />
        <label className="signup-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="password"
          onChange={handlePassword}
          placeholder="Enter the password:"
        />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
