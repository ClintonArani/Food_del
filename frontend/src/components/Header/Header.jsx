import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favorite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisy your cravings and elevate your dining experiences, one delicious meal at a time.</p>
            <a href="#explore-menu"><button>View Menu </button></a>
        </div>
    </div>
  )
}

export default Header