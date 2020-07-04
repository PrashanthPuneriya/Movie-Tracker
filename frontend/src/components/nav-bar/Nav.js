import React from 'react'

const Nav = () => {
    return (
        <nav className="NavBar">
            <div class="toggle-navbar-btn">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul className="navbar-links">
                <li><a href="#register">register</a></li>
                <li><a href="#login">login</a></li>
                <li><a href="#logout">logout</a></li>
            </ul>
        </nav>
    );
}

export default Nav;