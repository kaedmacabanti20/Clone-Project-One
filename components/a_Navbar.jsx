import React from 'react';
import Image from 'next/image';
import logo from '../assets/flixter.png';
import userlogo from '../assets/netflix-user-icon.jpg';
import { useEffect, useState } from "react";
import Link from 'next/link';

const Searchbar = () =>{
  // const icon = document.querySelector('.icon')
  // const search = document.querySelector('.search')
  return(
    <div className='rounded overflow-hidden flex items-center px-2 '>
      <i class="fa-solid fa-magnifying-glass text-lg navIcon px-2" ></i>
      <input className="text-white h-full w-full text-[15px]  bg-black/80" type="text" placeholder=" title, people, genres " />
    </div> 

  )
}

const Navbar = () => {
  
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
      setModal(!modal)
    };

    const [notif, setNotif] = useState(false)

    const toggleNotif = () => {
      setNotif(!notif)
    };


    return (
    
      <nav className='fixed h-[4.25rem] w-full px-[3.4rem] bg-black z-50'>
        <div className='grid grid-cols-2 w-full h-full'>
          <ul className='flex justify-start items-center'>
                  <Image src={logo}  className="w-[140px] pr-[2.5rem]" alt="" />
                  <i class="menu fa-solid fa-bars text-white"></i>
                  <li className='navText'><Link href="/page/Home">Home</Link></li>
                  <li className='navText'><Link href="/page/Movies">Movies</Link></li>
                  <li className='navText'><Link href="/page/Tv">Tv Shows</Link></li>
 
              </ul>
              <ul className='flex justify-end items-center'>     
                  <Searchbar/>
                    <li onMouseOver={toggleNotif}  className='navIcon px-[1rem] '><i class="fa-solid fa-bell text-lg"></i></li>

                    <span onMouseOver={toggleModal}  className='flex'>
                      <li ><Image src={userlogo} className="w-[32px] rounded " alt="" /></li>
                      <li className='navIcon pl-[.4rem] '><i className="fa-solid fa-caret-down"></i></li>
                    </span>
                    
                  {notif && (
                  <ul  onMouseLeave={toggleNotif}  className='flex justify-center items-center bg-black/90  pt-[.5rem] h-[7.5rem] w-[26rem] border absolute top-[70px] right-[3rem] border-navtexthover/40'>
                    <li className=' text-navtexthover  mb-2 text-[15px]'>No recent notifications</li>
                  </ul>
                  )}
              
                  {modal && (
                  <ul  onMouseLeave={toggleModal}  className=' bg-black/90 w-[14rem] pt-[.5rem] h-auto border absolute top-[70px] border-navtexthover/40'>
                    <li className='dropdowntext'><i class="dropdownicon fa-solid fa-pen-to-square"></i>Manage Profiles</li>
                    <li className='dropdowntext'><i class="dropdownicon fa-solid fa-arrow-up-right-from-square"></i>Exit Profile</li>
                    <li className='dropdowntext'><i class="dropdownicon fa-regular fa-user"></i>Account</li>
                    <li className='dropdowntext'><i class="dropdownicon fa-regular fa-circle-question"></i>Help Center</li>
                    <li className='dropdowntext text-center border-t border-navtexthover/40 py-[.8rem]'><Link href="/main_pages/SignIn">Sign out of Netflix</Link></li>
                  </ul>
                  )}
              </ul>
        </div>
      </nav>
  
     
    )
}

export default Navbar


