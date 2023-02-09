import React from 'react';
import { useRef, useState, useEffect, useLocation, useNavigate, useContext } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, redirect } from 'react-router-dom';
import AuthContext from '../contexts/AuthProvider';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL = 'https://localhost:44309/api/Auth/login';

const Login = () => {
    //
/*     const { setAuth } = useContext(AuthContext);
    const redirect = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; */
    //

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus(); 
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
    }, [pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack, recheck values
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

    try {
            const response = await fetch(LOGIN_URL,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "username" : user,
                        "password" : pwd
                    }
                ),
            });
            console.log(response);
            if (response.ok) {
                console.log("ok");
                const body = await response.json();
                localStorage.setItem("userToken", JSON.stringify(body));
            } else {
                console.log("response status" + response.status);
                throw Error(response.status);
            }
            setUser('');
            setValidName('');
            setPwd('');
            setSuccess(true);
            //redirect(from, { replace: true });
            
        } catch (error) {
            console.log("FRV");
            if (!error?.message) {
                setErrMsg('No Server Response')
            } else if (error.message === '400') {
                setErrMsg('Wrong Username or Password');
            } else if (error.message === '404') {
                setErrMsg('User Not Found');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

  return (
    <>
    {success ? <Link to='/home'>Home</Link> :
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={()=> setUserFocus(true)}
                    onBlur={()=> setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters. <br />
                    Must begin with a letter. <br/>
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                <label htmlFor="password">Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={()=> setPwdFocus(true)}
                    onBlur={()=> setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ?  "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: 
                    <span aria-label="exclamation mark">!</span> 
                    <span aria-label="at symbol">@</span> 
                    <span aria-label="hashtag">#</span> 
                    <span aria-label="dollar sign">$</span> 
                    <span aria-label="percent">%</span>
                </p>
                <button disabled={!validName || !validPwd ? true : false}>
                    Sign Up
                </button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    {/*put router link here*/}
                    <Link to='/registration'>Sign Up</Link>
                </span>
            </p>
        </section>
    }
    </>
  )
}

export default Login