import React, { useState, useEffect } from "react";
import { FormStyles } from "../StandardStyles/FormStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { ClipLoader } from "react-spinners"; // Import the spinner component from the package

import AuthService from "../../utils/auth";

export default function LoginForm() {
  const {
    FormContainer,
    Form,
    FormGroup,
    EmailInput,
    PasswordInput,
    FormButton,
    Warning,
  } = FormStyles;

  const { H2, H3 } = globalStyles;

  const navigate = useNavigate();

  const handleGoToSignUpForm = () => {
    navigate("/signup");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setLoading(true); // Set loading state to true

    setTimeout(async () => {
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
            email: "",
            password: "",
          });

          const storedUsername = AuthService.getUsername();
          navigate(`/profile/${storedUsername}`);
        });
      } catch (e) {
        console.error(e);
        setLoginError("Login failed. Please check your credentials");
      } finally {
        setLoading(false); // Set loading state back to false
      }
    }, 3000); // Simulate a 3-second delay before completing login
  };

  return (
    <FormContainer>
      <Form onSubmit={handleLoginSubmit}>
        <H2>Log In</H2>
        <FormGroup>
          <H3>Email</H3>
          <EmailInput name="email" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <H3>Password</H3>
          <PasswordInput
            name="password"
            type="password"
            onChange={handleChange}
          />
        </FormGroup>
        {loading ? (
          // Use the ClipLoader component from react-spinners as a loading spinner
          <ClipLoader color="#000" loading={loading} size={35} />
        ) : (
          <FormButton type="submit">Log In</FormButton>
        )}
        <Warning>
          {loginError && <p className="warning">{loginError}</p>}
        </Warning>
        {/* Display error message if login fails */}
      </Form>
      <FormButton onClick={handleGoToSignUpForm} className="signup-button">
        Sign Up
      </FormButton>
    </FormContainer>
  );
}
