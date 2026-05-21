import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

interface PrivateRouteProps {
    element: React.ReactNode; 
    allowedRoles?: string[]; // lista de roles permitidas
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
    const { isAuthenticated } = useAuth();
    const role = localStorage.getItem("role");

    if (!isAuthenticated) {
    return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/home" />; // bloqueia e redireciona
    }

    return element;
};

export default PrivateRoute;
