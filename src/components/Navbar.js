import React, {useState} from 'react';
import {Link} from'react-router-dom';
import BLoggin from './login/login.js';

import './Navbar.css'
import logout from './logout/logout';
import LogOut from './logout/logout';
import person from "./users/users.json"

function Navbar() {
    const [click,setClick]= useState(false);
    const [button, setButton] = useState(true);
    const [authenticated, setauthenticated] = useState(null);

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);
    
    const loggedInUser = localStorage.getItem("authenticated");
  
    return (
    <nav className='navbar'>
    <img src='/images/ping-pong_1f3d3.png' height="35"/>
        <div className='navbar-container'>
       <ul>
        <li>
         <Link  to="/" className="navbar-logo">
        Home
        </Link>
        </li>
        <li><Link  to="/Pong" className="navbar-logo">
        Play
        </Link>
        </li>
        <li>
        <Link  to="/LeaderBoard" className="navbar-logo">
        LeaderBoard
        </Link>
        </li>

        <li>
        <Link  to="/Account" className="navbar-logo">
        Account
        </Link>
        </li>
        <li>
        <Link  to="/Landing" className="navbar-logo">
        ChatRooms
        </Link>
        </li>
        </ul>
    </div>
  <div>  {loggedInUser == "true" ? (
      <div>
      <LogOut/>
      <img src={person[0].ProfilePic} height="35"/>
     </div>
      ) : (
      <BLoggin/>
      )}</div>
    </nav>
    
    )
}

export default Navbar