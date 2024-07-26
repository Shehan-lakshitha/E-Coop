import React from "react";
import "./Sidebar.css";
import {assets} from '../../assets/assets';

const Slidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <div className="sidebar-option active">
          <img src={assets.add_icon} alt="" />
          <p>Add item</p>
        </div>
        <div className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Item</p>
        </div>
        <div className="sidebar-option">
          <img src={assets.cart} alt="" />
          <p>Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
