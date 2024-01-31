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

    const handleChange = (event) => {
        const { name, value } = event.target;

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

            AuthService.login(data.login.token);
            navigate('/profile');
        } catch (e) {
            console.error(e);
        }

        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <FormContainer>
            <LoginForm onSubmit={handleLoginSubmit}>
                <H2>Log In</H2>
                <FormGroup>
                    <H3>Email</H3>
                    <EmailInput onchange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <H3>Password</H3>
                    <PasswordInput type='password' onChange={handleChange} />
                </FormGroup>
                <FormButton type='submit'>Log In</FormButton>
            </LoginForm>
            <FormButton onClick={handleGoToSignUpForm} className="signup-button">Sign Up</FormButton>
        </FormContainer>
    )
}
