import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from './auth';

const RequireAuth = ({ element }) => {
    const isAuthenticated = AuthService.loggedIn();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return element;
};

export default RequireAuth;