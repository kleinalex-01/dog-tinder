import React from "react"
import { NavLink } from "react-router-dom"

export default function Header() {
    return (
        <>
          <div className='header-container'>
            <NavLink to="/profile"><img src='/Images/profile.png' alt='profile icon' /></NavLink>

            <div className="paw-container"><NavLink to="/"><img src="../Images/paw.png" alt="paw" className="paw"/></NavLink></div>

            <NavLink to="/chat"><img src='/Images/chat.png' alt='chat icon' /></NavLink>
          </div>
        </>
      )
}