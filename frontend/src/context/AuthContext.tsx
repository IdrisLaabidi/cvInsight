import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

const baseURL = import.meta.env.VITE_BACKEND_URL;

type AuthContextType = {
    user?: User;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface User{
    id: string;
    username: string;
    email: string;
    role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
            return;
        }
        const token = localStorage.getItem("jwt");
        if (token) {
            axios.get(`${baseURL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                const fetchedUser: User = response.data.user;
                setUser(fetchedUser);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(fetchedUser));
                return;
            }).catch((error) => {
                console.error("Error fetching user data:", error);
                localStorage.removeItem("jwt");
                localStorage.removeItem("user");
                setUser(undefined);
                setIsAuthenticated(false);
                navigate("/signin");
            })
        }
    }, [navigate]);

    return (
        <AuthContext.Provider value={{user, isAuthenticated, setUser, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};