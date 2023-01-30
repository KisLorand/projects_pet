import React from 'react'

const LOGOUT_URL = 'https://localhost:44309/api/Auth/logout';

const LogoutBtn = () => {
    const handleClick = async ()=>{
        try {
            if (!localStorage.getItem('userToken')) throw Error("Not Logged in.");
            const obj = {
                "userToken" : localStorage.getItem('userToken'),
                "logoutTime" : Date.now()
            };
            console.log(obj);
            const response = await fetch(LOGOUT_URL,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    obj
                ),
            });
            console.log(response);
            if (!response.ok)
            {
                console.log(response?.message);
            }
        } catch (error) {
            console.log(error?.message);
        }
        localStorage.removeItem("userToken");
    }
  return (

    <button onClick={handleClick}>
        Logout
    </button>
  )
}

export default LogoutBtn
