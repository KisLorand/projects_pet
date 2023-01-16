import React from 'react'
import { useRef, useEffect } from 'react';
import InputContainer from './InputContainer';

const Registration = () => {
    const url = "https://localhost:44309/api/Auth/register";
    const input = useRef(false);
    const errMsg = "error";
    const newUser = {
        "username": "newUser",
        "password": "secretpassword"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(url,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
              });
            if (!response.ok) throw Error('Error occoured. Reload the app');
        } catch (error) {
            errMsg = error.message;
        } finally {
            return  errMsg;
        }
    }

    /* useEffect( async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw Error('Error occoured. Reload the app');
        } catch (error) {
            errMsg = error.message;
        } finally {
            return  errMsg;
        }
    }, [input]) */

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

        <InputContainer
            labelText="Pwd"
            inputName="pwd"
            inputVariable={newUser.password}
        />

       <div className="button-container">
         <input type="submit" value="Submit"/>
       </div>
     </form>
   </div>
  )
}

export default Registration
