import { Link } from 'react-router-dom';
import './NavBar.css';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthProvider';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
    const [state, setState] = useState('');

    useEffect(() => {
        console.log("logged in : nav should change");
        setState('a');
    }, [localStorage.getItem("userToken")])

    return (
        <nav className="Nav">
            <img className="logo" src="./logo192.png"></img>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to ="/registration">Registration</Link></li>
                {!localStorage.getItem("userToken") ? <li><Link to="/login">Login</Link></li> : <li><Link to="/logout">Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default NavBar;
