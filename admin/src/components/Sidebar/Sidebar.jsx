import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Slidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/addItems" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add item</p>
        </NavLink>
        <NavLink to="/listItems" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Item</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.cart} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Slidebar;
