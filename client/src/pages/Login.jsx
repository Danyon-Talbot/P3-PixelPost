import React from "react";
import { HomepageStyles } from "../components/StandardStyles/HomePageStyles";
import { globalStyles } from "../components/StandardStyles/globalStyles";
import LoginForm from '../components/LoginComponents/LoginForm'
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