import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('userToken'));       

    return (
        user
        ? <Outlet />
        : <Navigate to="/unauthorized" state={{ from: location }} replace />             
    );

}

export default RequireAuth;