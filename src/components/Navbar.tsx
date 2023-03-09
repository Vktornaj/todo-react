import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthProvider";

const Navbar = () => {

    const { auth, logout } = useContext(AuthContext);

    return(
        <nav className="navbar">
            <span>Todo React JS</span>
            <ul>
                {auth ? 
                <>
                    <li><Link to="./todos">Todos</Link></li>
                    <li><a onClick={ logout }>Logout</a></li>
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