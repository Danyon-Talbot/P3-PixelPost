import React from "react";
import { FormStyles } from "../StandardStyles/FormStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    
    const {
        FormContainer,
        LoginForm,
        FormGroup,
        EmailInput,
        PasswordInput,
    } = FormStyles

    const {
        H2,
        H3,
        Button,
    } = globalStyles

    const navigate = useNavigate();


    const handleSignUpForm = () => {
        navigate('/signup');
    };

    return (
        <FormContainer>
            <LoginForm>
                <H2>Log In</H2>
                <FormGroup>
                    <H3>Email</H3>
                    <EmailInput />
                </FormGroup>
                <FormGroup>
                    <H3>Password</H3>
                    <PasswordInput type='password' />
                </FormGroup>
            </LoginForm>
            <Button onClick={handleSignUpForm}>Sign Up</Button>
        </FormContainer>
    )
}