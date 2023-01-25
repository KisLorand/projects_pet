import { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Logout = () => {
    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        //userRef.current.focus();
        localStorage.removeItem("userToken");
    }, [])

  return (
    <section>
        <h1 aria-describedby="logoutnote">Logged out</h1>
        <p id="logoutnote" className="offscreen">
            You have logged out from the site. <br/>
            You can go back to the home page.
        </p>
        <p>
            <span className="line">
                <Link to='/home'>Back to Home</Link>
            </span>
        </p>
    </section>
  )
}

export default Logout