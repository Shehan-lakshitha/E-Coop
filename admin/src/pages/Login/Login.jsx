import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "../../../config.json";

const Login = () => {
  const navigate = useNavigate();
  const url = config.baseURL;
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    }

    try {
      const response = await axios.post(`${url}/api/users/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("authToken", response.data.token);
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <h1 className="header">WELCOME BACK TO E-COOP ADMIN PANEL</h1>
      <div className="login-form">
        <h3>Login</h3>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="form-details">
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                value={data.email}
                onChange={handleInputChanges}
                className={errors.email ? "error" : ""}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="form-details">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={data.password}
                onChange={handleInputChanges}
                className={errors.password ? "error" : ""}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default Login;
