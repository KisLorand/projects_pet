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
        console.log(newUser);
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



       <InputContainer
            labelText="Username"
            inputName="username"
            inputVariable={newUser.username}
        />
        <InputContainer
            labelText="Password"
            inputName="password"
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
