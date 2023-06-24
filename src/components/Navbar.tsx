import { Link } from "react-router-dom";
import { useContext, useLayoutEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthProvider";
import userService from "../services/user.service";
import styles from "./navbar.module.css";


const Navbar = () => {

    const { auth, logout } = useContext(AuthContext);
    const [ username, setUsername ] = useState<string | null>(null);

    const updateUsername = () => {
        if (!auth) { 
            setUsername(null);
            return; 
        }
        userService.getUserInfo()
            .then(res => setUsername(res.username))
            .catch(err => console.error("Error get user info: ", err));
    };

    useLayoutEffect(updateUsername, [auth]);

    return(
        <nav className={styles.navbar}>
            <span>Todo React JS</span>
            <span>{username}</span>
            <ul>
                {auth ? 
                <>
                    <li><Link to="./todos">Todos</Link></li>
                    <li><span onClick={ logout } style={{ cursor: "pointer", color: "blue" }}>Logout</span></li>
                </>
                :
                <>
                    <li><Link to="./login">Login</Link></li>
                    <li><Link to="./register">Register</Link></li>
                </>
                }
            </ul>
        </nav>
    )
};

export default Navbar;