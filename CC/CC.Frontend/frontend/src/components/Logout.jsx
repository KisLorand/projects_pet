import { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const LOGOUT_URL = 'https://localhost:44309/api/Auth/logout';

const Logout = () => {
    const userRef = useRef();
    const errRef = useRef();


    
   /*  useEffect( async () => {
        //userRef.current.focus();
        try {
            if (!localStorage.getItem('userToken')) throw Error("Not Logged in.");
            const response = await fetch(LOGOUT_URL,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "userToken" : localStorage.getItem('userToken'),
                        "logoutTime" : Date.now()
                    }
                ),
              });
        } catch (error) {
            
        }
        localStorage.removeItem("userToken");
    }, [useRef]) */

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