import React from 'react'
import { useRef, useEffect } from 'react';

const Registration = () => {
    const url = "";
    const input = useRef(false);
    const errMsg = "error";

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    useEffect( async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw Error('Error occoured. Reload the app');
        } catch (error) {
            errMsg = error.message;
        } finally {
            return  errMsg;
        }
    }, [input])

  return (
    <div className="form">
     <form onSubmit={handleSubmit}>
       <div className="input-container">
         <label>Username </label>
         <input type="text" name="uname" required />
         {/* {renderErrorMessage("uname")} */}
       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" required />
         {/* {renderErrorMessage("pass")} */}
       </div>
       <div className="button-container">
         <input type="submit" value="Submit"/>
       </div>
     </form>
   </div>
  )
}

export default Registration
