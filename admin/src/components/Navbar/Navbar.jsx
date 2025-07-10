import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import config from "../../../config.json";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const userId = decodeToken(localStorage.getItem("authToken")).id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${config.baseURL}/api/users/getUser/${userId}`,
          {
            headers: {
              token: localStorage.getItem("authToken"),
            },
          }
        );
        setUserName(response.data.user.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  });

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="E-COOP" />
      <div className="nav-name">
        <h4>{userName}</h4>
      </div>
    </div>
  );
};

export default Navbar;

function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}
