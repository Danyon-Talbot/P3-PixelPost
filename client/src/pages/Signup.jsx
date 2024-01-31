import React from "react";
import { HomepageStyles } from "../components/StandardStyles/HomePageStyles";
import { globalStyles } from "../components/StandardStyles/globalStyles";
import SignupForm from '../components/SignUpCompontents/SignupForm';
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
            <SignupForm />
            <Button onClick={handleDrawWithoutLogin}>Draw Without Login</Button>
        </HomePage>
    );
};


export default Signup;