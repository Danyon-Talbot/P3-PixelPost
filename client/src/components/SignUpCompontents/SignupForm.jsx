import React, { useState } from "react";
import { FormStyles } from "../StandardStyles/FormStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from "../../utils/mutations";
import { ClipLoader } from "react-spinners"; // Import the spinner component

export default function SignUpForm() {
  const {
    FormContainer,
    Form,
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

  const [loading, setLoading] = useState(false); // State for loading spinner

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReturnToLogin = () => {
    setLoading(true); // Set loading state to true

    setTimeout(() => {
      setLoading(false); // Set loading state back to false
      navigate('/login');
    }, 1500); // 2-second delay

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormData()) {
      // Remove the existing token from localStorage
      localStorage.removeItem('token');

      try {
        const { data } = await createUser({
          variables: { ...formData },
        });

        // Handle success
        console.log('User created:', data.createUser);
        const token = data.createUser.token;
        localStorage.setItem('token', token);

        // Optionally, you can redirect the user to another page here
        handleReturnToLogin();
      } catch (error) {
        // Handle GraphQL errors
        console.error('GraphQL Error:', error);

        // Check if the error message contains specific keywords
        if (error.message.includes('USER_ALREADY_EXISTS')) {
          setErrors({
            ...errors,
            email: 'This email is already registered',
          });
        } else if (error.message.includes('USER_CREATION_ERROR')) {
          // Handle other user creation errors
          setErrors({
            ...errors,
            general: 'An error occurred while creating the user',
          });
        } else {
          console.error('Unexpected error:', error);
        }
      }
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
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
        {loading ? (
          // Use the ClipLoader component from react-spinners as a loading spinner
          <div>
            <ClipLoader color="#000" loading={loading} size={35} />
          </div>
        ) : (
          <FormButton type="submit" className="signupButton">
            Create Account
          </FormButton>
        )}
      </Form>
      <FormButton onClick={handleReturnToLogin}>
        Have an Account? Log In
      </FormButton>
    </FormContainer>
  );
}
