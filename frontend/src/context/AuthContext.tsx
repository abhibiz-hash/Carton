import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../api/client';

interface User {
    id: string;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token by fetching user profile
                    const response = await api.get('/users/me');
                    setUser(response.data);
                } catch (error) {
                    console.error("Session expired", error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    // 2. Login Function
    const login = async (token: string) => {
        localStorage.setItem('token', token);
        const response = await api.get('/users/me');
        setUser(response.data);
    };

    // 3. Logout Function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};