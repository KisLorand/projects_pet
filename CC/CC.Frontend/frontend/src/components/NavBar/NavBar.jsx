import { Link } from 'react-router-dom';
import './NavBar.css';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthProvider';
import { FaUser } from 'react-icons/fa';
import LogoutBtn from '../LogoutBtn';
import CatImage from '../CatImage';

const NavBar = () => {
    const [state, setState] = useState(false);

    useEffect(() => {
        console.log("logged in : nav should change");
        setState(localStorage.getItem("userToken") !==null ? true : false);
    }, [localStorage.getItem("userToken")])

    return (
        <nav className="Nav">
            <img className="logo" src="./logo192.png"></img>
            <ul>
                <li><Link to="/home">Home</Link></li>
                {state === false ? 
                    <>
                        <li><Link to ="/registration">Registration</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </> : <>
                        <li><Link to="/catpng">Cat Image</Link></li>
                        <li><Link to="/logout"><LogoutBtn/></Link></li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default NavBar;
