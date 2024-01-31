import React, { useState } from "react";
import { FormStyles } from "../StandardStyles/FormStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import { Form, useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { LOGIN_QUERY } from '../../utils/queries';

export default function LoginForm() {
    
    const {
        FormContainer,
        LoginForm,
        FormGroup,
        EmailInput,
        PasswordInput,
        FormButton,
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

    const { loading, error, data } = useQuery(LOGIN_QUERY, {
        variables: {
            email: formData.email,
            password: formData.password,
        },
        skip: true,
    });

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (error) {
            // Display the error message
            console.error('Error:', error.message);
        } else {
            // Handle the successful login here
            console.log('Login successful:', data);

            navigate('/profile');
        }
    };;

    return (
        <FormContainer>
            <LoginForm onSubmit={handleLogin}>
                <H2>Log In</H2>
                <FormGroup>
                    <H3>Email</H3>
                    <EmailInput />
                </FormGroup>
                <FormGroup>
                    <H3>Password</H3>
                    <PasswordInput type='password' />
                </FormGroup>
                <FormButton type='submit'>Log In</FormButton>
            </LoginForm>
            <FormButton onClick={handleGoToSignUpForm} className="signup-button">Sign Up</FormButton>
        </FormContainer>
    )
}
