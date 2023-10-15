import './NavBar.css'
import React, {useContext, useState} from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import {AuthContext} from "../../context/AuthContext";

function Nav() {

    const[ mobileMenu, toggleMobileMenu] = useState(true);

    function showMobileMenu() {
        toggleMobileMenu( prev => !prev)
    }

    const { logout } = useContext(AuthContext);

    return (
        <header>
            <div className="navbar">
                <nav className='inner-container'>
                    <ul className='pre-menu'>
                        <Link className="homepage" to="/">Share Explorer</Link>
                        <Link className="mobile-homepage" to="/">
                            <span className="material-symbols-outlined">House</span>
                        </Link>
                    </ul>
                    <ul className='pre-menu'>
                        <li>
                            <SearchBar
                                className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                            />
                        </li>
                    </ul>
                    <button className='toggle-menu' type='button' onClick={showMobileMenu}>
                        {
                            mobileMenu
                                ? <span className='material-symbols-outlined'>menu</span>
                                : <span className='material-symbols-outlined'>close</span>
                        }
                    </button>
                    <ul className={ !mobileMenu ? 'menu' : 'mobile-menu'}>
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
                </nav>
            </div>
        </header>
    )
}

export default Nav;