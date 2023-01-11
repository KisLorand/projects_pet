import { Link } from 'react-router-dom';
import './NavBar.css';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthProvider';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {

    return (
        <nav className="Nav">
            <img className="logo" src="./logo192.png"></img>
            <ul>
                <li><Link to="/home">Home</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
