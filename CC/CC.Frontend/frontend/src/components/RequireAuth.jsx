import { useRef, useState, useEffect, useNavigate, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const AUTH_URL = 'https://localhost:44309/api/Auth/getusertoken';

const RequireAuth = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('userToken'));

    const [errMsg, setErrMsg] = useState('');
    
    useEffect( (user)=>{
        console.log(user);

        async function fetchToken(user) {

            if (user !== null || user !== undefined) {
                try {
                    const response = await fetch(AUTH_URL,{
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify(
                            {
                                "userToken" : user,
                            }
                        ),
                    });
                    console.log("POST");
                    console.log("Require auth");
                    console.log(response);
                    if (!response.ok) throw Error(response.status);
                } catch (error) {
                    if (!error?.message) {
                        setErrMsg('No Server Response')
                    } else if (error.message === '204') {
                        setErrMsg('No token found');
                    } else {
                        setErrMsg('Fetch Failed');
                    }
                    console.log(errMsg);
                }
            }
        }

        fetchToken(user);
    }, [])

    //change the return based on status

    return (
        user
        ? <Outlet />
        : <Navigate to="/unauthorized" state={{ from: location }} replace />             
    );

}

export default RequireAuth;