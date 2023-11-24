import React from 'react'
import {  BsJustify, BsBoxArrowRight}
 from 'react-icons/bs'
import { Link } from 'react-router-dom'
 const Header = ({ OpenSidebar }) => {

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
           Admin {/* <BsSearch  className='icon'/> */}
        </div>
        <div className='header-right'>
    <Link to={'/'}>
            <BsBoxArrowRight className='icon'/></Link>
        </div>
    </header>
  )
}
export default Header
