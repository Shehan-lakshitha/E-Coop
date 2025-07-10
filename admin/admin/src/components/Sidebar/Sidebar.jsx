import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Slidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to="/addItems" className="sidebar-option add-item">
                    <img src={assets.add_icon} alt="Add-Icon" />
                    <p>Add item</p>
                </NavLink>
                <NavLink to="/listItems" className="sidebar-option list-items">
                    <img src={assets.order_icon} alt="Order-Icon" />
                    <p>List Items</p>
                </NavLink>
                
            </div>
        </div>
    );
};

export default Slidebar;
