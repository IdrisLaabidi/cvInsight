import React from "react";
import {useAuth} from "../../context/AuthContext.tsx";
import {Navigate, Outlet} from "react-router";

//This is auth component to protect routes
const AuthGuard: React.FC = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated && !localStorage.getItem("jwt")) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;

