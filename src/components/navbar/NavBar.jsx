import './NavBar.css'
import React, {useContext, useState, useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import {AuthContext} from "../../context/AuthContext";
import { useMediaQuery } from "@uidotdev/usehooks";

function Nav() {

    const isMediumToLargeDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 1200px)");

    const[ mobileMenu, toggleMobileMenu] = useState(true);

    function showMobileMenu() {
        toggleMobileMenu( prev => !prev)    
    }

    // Closes togglemenu when user forgot to close it and screensize changes
    useEffect(() => {
        if (!mobileMenu) {toggleMobileMenu(isMediumToLargeDevice)}
    }, [isMediumToLargeDevice])

    const { logout } = useContext(AuthContext);

    // Closes Toggle-menu when user click outside menu
    function closeMenu() {
        if(!mobileMenu) {showMobileMenu()};
        console.log(mobileMenu);
    }

        return (
        <header>
            <div className="navbar">
                <nav>
                    <ul>
                        <Link className="homepage" to="/">Share Explorer</Link>
                        <Link className="mobile-homepage" to="/">
                            <div className="material-symbols-outlined">House</div>
                        </Link>
                    </ul>
                    <ul className="searchbar">
                        <li>
                            <SearchBar className="t"/>
                        </li>
                    </ul>            
                    <ul className={ mobileMenu ? 'menu menu-extended' : 'mobile-menu'}>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                                     to="/Profile">Profile</NavLink>                  
                        </li>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                                     to="/SignIn">Sign In</NavLink>
                        </li>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                                     to="/SignUp">Sign Up</NavLink>
                        </li>
                        <li>
                            <Link className="link--default" to="/" onClick={logout}>Sign Out</Link>
                        </li>
                    </ul>
                    <button className='toggle-menu' type='button' onClick={showMobileMenu} onMouseLeave={closeMenu}>
                        {
                            mobileMenu
                                ? <div className='material-symbols-outlined'>menu</div>
                                : <div className='material-symbols-outlined'>close</div>
                        }
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Nav;