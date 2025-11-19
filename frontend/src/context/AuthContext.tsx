import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import { UserProfile, profileService } from "../services/profileService";

const baseURL = import.meta.env.VITE_BACKEND_URL;

type AuthContextType = {
    user?: User;
    isAuthenticated: boolean;
    userProfile?: UserProfile | null;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null | undefined>>;
    refreshProfile: () => Promise<void>;
    logout: () => void;
    login: (user: User, jwt: string) => void;
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
    const [userProfile, setUserProfile] = useState<UserProfile | null>();
    const navigate = useNavigate();

    const refreshProfile = async () => {
        if (isAuthenticated) {
            const profile = await profileService.getCurrentUserProfile();
            setUserProfile(profile);
        }
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        setUser(undefined);
        setIsAuthenticated(false);
        setUserProfile(undefined);
        navigate("/signin");
    }

    const login= (user: User, jwt: string) => {
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
        refreshProfile();
        navigate(`/login/success?token=${jwt}`);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
            refreshProfile();
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
                refreshProfile();
            }).catch((error) => {
                console.error("Error fetching user data:", error);
                localStorage.removeItem("jwt");
                localStorage.removeItem("user");
                setUser(undefined);
                setIsAuthenticated(false);
                navigate("/signin");
            })
        }
    }, [navigate, isAuthenticated]);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            userProfile,
            setUser,
            setIsAuthenticated,
            setUserProfile,
            refreshProfile,
            logout,
            login
        }}>
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