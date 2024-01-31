import React, { useState } from "react";
import { FormStyles } from "../StandardStyles/FormStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from "../../utils/mutations";

export default function SignUpForm() {
  const {
    FormContainer,
    LoginForm,
    FormGroup,
    NameInput,
    EmailInput,
    PasswordInput,
    FormButton,
    Warning,
  } = FormStyles;

  const {
    H2,
    H3,
    Button,
  } = globalStyles;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateFormData = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.username.trim() === "") {
        newErrors.username = 'Username Is Required';
        isValid = false;
    } else {
        newErrors.username = '';
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
        newErrors.email = 'Invalid Email Address';
        isValid = false;
    } else {
        newErrors.email = '';
    }

    if (formData.password.length < 8) {
        newErrors.password = "Must be at least 8 characters long";
        isValid = false;
    } else {
        newErrors.password = '';
    }

    setErrors(newErrors);
    return isValid;
};

const [createUser] = useMutation(CREATE_USER_MUTATION);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateFormData()) {
    try {
      const { data } = await createUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });

      // Handle success
      console.log('User created:', data.createUser);

      // Optionally, you can redirect the user to another page here
      navigate('/login');
    } catch (error) {
      // Handle GraphQL errors
      console.error('Error creating user:', error.message);
    }
  }
};
  
  const handleReturnToLogin = () => {
    navigate('/login');
};
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <FormContainer>
      <LoginForm onSubmit={handleSubmit}>
        <H2>Sign Up</H2>
        <FormGroup>
          <H3>Username</H3>
          <NameInput
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Warning className="error">{errors.username}</Warning>
        </FormGroup>
        <FormGroup>
          <H3>Email</H3>
          <EmailInput
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Warning className="error">{errors.email}</Warning>
        </FormGroup>
        <FormGroup>
          <H3>Password</H3>
          <PasswordInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Warning className="error">{errors.password}</Warning>
        </FormGroup>
        <FormButton type="submit" className="signupButton">
          Create Account
        </FormButton>
      </LoginForm>
      <FormButton onClick={handleReturnToLogin}>
        Have an Account? Log In
      </FormButton>
    </FormContainer>
  );
}