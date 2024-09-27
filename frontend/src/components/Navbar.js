import React from 'react'
import './css/navbar.css'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

function Navbar() {
  return (
    <motion.div className='navbar'
    initial={{opacity: 0, y:-180}}
    animate={{opacity: 1, y:0}}
    transition={{
      ease: 'easeInOut',
      duration: 1,
      delay: 0.6
    }}>
      <div className="navbar-inner">
      <Link className="logo" to='/'>Rohan.</Link>
        <nav className="nav">
          {/* <li>
            <Link to="/strategy">Strategy</Link>
          </li> */}
          {/* <li>
            <Link to="/why">Why work with us?</Link>
          </li> */}
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </nav>
        <div className='div'>

        <div className="contact">
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="hamburger-menu">
          <span></span>
          <span></span>
        </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar
