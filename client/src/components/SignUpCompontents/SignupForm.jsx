import React from "react";
import { FormStyles } from "../StandardStyles/FormStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
    
    const {
        FormContainer,
        LoginForm,
        FormGroup,
        NameInput,
        EmailInput,
        PasswordInput,
        FormButton,
    } = FormStyles

    const {
        H2,
        H3,
        Button,
    } = globalStyles

    const navigate = useNavigate();

    const handleReturnToLogin = () => {
        navigate('/login');
    };

    return (
        <FormContainer>
            <LoginForm>
                <H2>Sign Up</H2>
                <FormGroup>
                    <H3>Username</H3>
                    <NameInput />
                </FormGroup>
                <FormGroup>
                    <H3>Email</H3>
                    <EmailInput />
                </FormGroup>
                <FormGroup>
                    <H3>Password</H3>
                    <PasswordInput type='password' />
                </FormGroup>
                <FormButton onclick={handleReturnToLogin} className="signupButton">Create Account</FormButton>
            </LoginForm>
            <FormButton onClick={handleReturnToLogin}>Have an Account? Log In</FormButton>
        </FormContainer>
    )
}