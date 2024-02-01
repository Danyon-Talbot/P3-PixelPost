import React, { useState } from "react";
import { FormStyles } from "../StandardStyles/FormStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import AuthService from '../../utils/auth'

export default function LoginForm() {
    
    const {
        FormContainer,
        LoginForm,
        FormGroup,
        EmailInput,
        PasswordInput,
        FormButton,
        Warning
    } = FormStyles

    const {
        H2,
        H3,
    } = globalStyles

    const navigate = useNavigate();

    const handleGoToSignUpForm = () => {
        navigate('/signup');
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [loginError, setLoginError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("name:", name); //REMOVE THIS BEFORE LIVE PUSH
        console.log("Value:", value); //REMOVE THIS BEFORE LIVE PUSH

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        try {
            const { data } = await login({
                variables: { ...formData },
            });
            const username = data.login.user.username;

            AuthService.login(data.login.token, username, () => {
                setFormData({
                    email: '',
                    password: '',
                });
                
                const storedUsername = AuthService.getUsername();
                navigate(`/profile/${storedUsername}`);
            });
        } catch (e) {
            console.error(e);
            setLoginError("Login failed. Please check your credentials");
        }
    };

    
    return (
        <FormContainer>
            <LoginForm onSubmit={handleLoginSubmit}>
                <H2>Log In</H2>
                <FormGroup>
                    <H3>Email</H3>
                    <EmailInput name="email" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <H3>Password</H3>
                    <PasswordInput name='password' type='password' onChange={handleChange} />
                </FormGroup>
                <FormButton type='submit'>Log In</FormButton>
                <Warning>{loginError && <p className="warning">{loginError}</p>}</Warning> {/* Display error message if login fails */}
            </LoginForm>
            <FormButton onClick={handleGoToSignUpForm} className="signup-button">Sign Up</FormButton>
        </FormContainer>
    )
}
