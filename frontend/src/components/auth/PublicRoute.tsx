// components/auth/PublicRoute.tsx
import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext.tsx";

interface PublicRouteProps {
    children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const { isAuthenticated } = useAuth();

    // If authenticated, redirect to home, otherwise show the public page
    return isAuthenticated ? <Navigate to="/home" replace /> : <>{children}</>;
}