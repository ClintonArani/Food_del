import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        {/* <img className='logo' src={assets.logo} alt="" /> */}
        <p className="logo logo-name">Omarish<span>.</span></p>
        <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar