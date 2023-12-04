import React from 'react'
import {  BsJustify, BsBoxArrowRight}
 from 'react-icons/bs'
import { Link } from 'react-router-dom'
 const Header = ({ OpenSidebar, title= "Admin" }) => {

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
          {title} {/* <BsSearch  className='icon'/> */}
        </div>
        <div className='header-right'>
    <Link to={'/logout'}>
            <BsBoxArrowRight className='icon'/></Link>
        </div>
    </header>
  )
}
export default Header
