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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [loginError, setLoginError] = useState(null);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login({
                variables: { ...formData },
            });
    
            // Check if there are any errors in the mutation response
            if (response.errors && response.errors.length > 0) {
                throw new Error(response.errors[0].message);
            }
    
            // Access the data returned by the mutation
            const username = response.data.login.user.username;
    
            AuthService.login(response.data.login.token, username, () => {
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
