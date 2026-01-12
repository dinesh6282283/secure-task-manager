import { useState } from "react";
import { signupUser } from "../api/auth.js";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  //event handlers
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      name,
      email,
      password,
    };
    try {
      const response = await signupUser(dataToSend);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      setSuccess("Account created successfully!");
      setError(null);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setError(`Account creation failed. ${err.message}`);
      setSuccess(null);
    }
  };

  return (
    <>
      <h1 className="signup-header">Create Account</h1>
      <form id="signup-form" onSubmit={handleSubmit}>
        <label className="signup-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="name"
          placeholder="Enter the name"
          onChange={handleName}
        />
        <label className="signup-label" htmlFor="email">
          E-Mail
        </label>
        <input
          type="email"
          className="email"
          placeholder="Enter the email"
          onChange={handleEmail}
        />
        <label className="signup-label" htmlFor="password">
          password
        </label>
        <input
          type="password"
          className="password"
          placeholder="Enter the password"
          onChange={handlePassword}
        />
        <button className="submit" type="submit">
          Sign Up
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already have an account? <Link to="/">Sign in</Link>
      </p>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
