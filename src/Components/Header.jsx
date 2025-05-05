import React from "react"

export default function Header() {
    return (
        <>
          <div className='header-container'>
            <img src='/Images/profile.png' alt='profile icon' />

            <div className="paw-container"><img src="../Images/paw.png" alt="paw" className="paw"/></div>

            <img src='/Images/chat.png' alt='chat icon' />
          </div>
        </>
      )
}