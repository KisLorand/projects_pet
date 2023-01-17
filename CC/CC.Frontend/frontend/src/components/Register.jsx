import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState('');
    const [matchFocus, setMatchFocus] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // setting the focus when the component loads
    useEffect(() => {
        userRef.current.focus(); 
    }, [])

    // for the username, validation
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    
    }, [user])

    // pwd useEffect, validation
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    // error message, disappear/clear when changing username/pws
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

  return (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form>
            <label htmlFor="username">
                Username:
                <span className={validName ? "valid" : "offscreen"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type="text"
                id="username"
                ref={userRef}           //set focus on input
                autoComplete="off"      // do not suggest previous usernames -> unhelpful
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote" // a <p>, that describes the field
                onFocus={()=> setUserFocus(true)}
                onBlur={()=> setUserFocus(false)} // when leaving the input field
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                4 to 24 characters. <br />
                Must begin with a letter. <br/>
                Letters, numbers, underscores, hyphens allowed.
            </p>
        </form>
    </section>
  )
}

export default Register
