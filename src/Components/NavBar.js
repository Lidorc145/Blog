import React from "react";
import {
    NavLink
} from "react-router-dom";

function NavBar(props) {
        return(
            <nav>
                <ul>
                    <li><NavLink to="/Home" activeClassName={"NavLink"}>Home</NavLink></li>
                    <li className="navBorder" activeclassname={"NavLink"}>|</li>
                    <li><NavLink to="/AboutMe" activeclassname={"NavLink"}>About Me</NavLink></li>
                    <li className="navBorder">|</li>
                    <li><NavLink to="/NewPost" activeclassname={"NavLink"}>New Post</NavLink></li>
                    <li className="rightLi">
                        {!props.username && <NavLink to="/Login" activeclassname={"NavLink"}>Login</NavLink>}
                        {props.username && <div>Hello {props.username}</div>}
                    </li>
                </ul>
            </nav>
        );
}

export default NavBar;