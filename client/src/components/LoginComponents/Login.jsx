import React from "react";
import { HomepageStyles } from "../StandardStyles/HomePageStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import LoginForm from './LoginForm'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {
        HomePage,
    } = HomepageStyles;

    const {
        H1,
        Button
    } = globalStyles
    
    const navigate = useNavigate();

    const handleDrawWithoutLogin = () => {
        navigate('/editor');
    };


    return (
        <HomePage>
            <H1>Pixel Post</H1>
            <LoginForm />
            <Button onClick={handleDrawWithoutLogin}>Draw Without Login</Button>
        </HomePage>
    );
};

export default Login;