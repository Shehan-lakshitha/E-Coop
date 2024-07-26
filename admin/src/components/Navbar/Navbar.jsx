import React from 'react'
import './Navbar.css'
import { assets} from '../../assets/assets.js';

const Navbar = () => {
  return (
    <div className="navbar">
        <img className='logo' src={assets.logo} alt="" />
        <div className='nav-name'>
            <h3>Admin</h3>
            <img src={assets.profile_image} alt="" className="profile" />
        </div>
        
    </div>
  )
}

export default Navbar