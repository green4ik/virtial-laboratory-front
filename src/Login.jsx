import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
  
    try {
      const response = await fetch("https://localhost:7217/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        toast('You are logged in!');
        navigate("/modules");
      } else {
        // Check if the response is plain text or JSON
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
  
        const errorData = isJson
          ? await response.json()
          : { message: await response.text() };
  
        setErrorMessage(errorData.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Unable to connect to the server");
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Log in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="login-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="login-buttons">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
        <p className="signup-prompt">
          Don’t have an account yet?{" "}
          <a href="/signup" className="signup-link">
            Sign up!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
