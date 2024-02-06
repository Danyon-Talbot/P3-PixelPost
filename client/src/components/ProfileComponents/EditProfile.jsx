import React, { useState, useEffect } from "react";
import { profileStyles } from "../ProfileComponents/profileStyling/ProfileStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import { FormStyles } from "../StandardStyles/FormStyles";
import AuthService from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from '../../utils/mutations'; // Import the mutation for updating the user
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners"; // Import the RingLoader component

export default function ProfileEditor() {
  const {
    Form,
    FormGroup,
    NameInput,
    EmailInput,
    PasswordInput,
    Warning,
  } = FormStyles;

  const { H3 } = globalStyles;

  const { ProfileEditorContainer, ProfileEditorButton } = profileStyles;

  const [nameFormData, setNameFormData] = useState({
    username: AuthService.getProfile().authenticatedPerson.username, // Initialize with current username
  });

  const [emailFormData, setEmailFormData] = useState({
    email: AuthService.getProfile().authenticatedPerson.email, // Initialize with current email
  });

  const [passwordFormData, setPasswordFormData] = useState({
    password: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [updateUser] = useMutation(UPDATE_USER);

  const [loading, setLoading] = useState(false); // State to control loading spinner
  const navigate = useNavigate();

  const validateFormData = () => {
    let isValid = true;
  
    if (nameFormData.username.trim() === "") {
      setNameError("Username is required");
      isValid = false;
    } else {
      setNameError("");
    }
  
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (
      emailFormData.email.trim() !== "" &&
      !emailPattern.test(emailFormData.email)
    ) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }
  
    if (
      passwordFormData.password.trim() !== "" &&
      passwordFormData.password.length < 8
    ) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }
  
    return isValid;
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setNameFormData({ ...nameFormData, [name]: value });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailFormData({ ...emailFormData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData({ ...passwordFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormData()) {
      try {
        setLoading(true); // Start loading spinner
        
        const { data } = await updateUser({
          variables: {
            username: nameFormData.username,
            email: emailFormData.email,
            password: passwordFormData.password,
          },
        });
  
        // Handle success
        console.log('User updated:', data.updateUser); // REMOVE THIS BEFORE LIVE PUSH
        
        setTimeout(() => {
          setLoading(false); // Stop loading spinner after a delay
          // Destroy the old token and log the user out
          AuthService.logout(); // Add a logout function to destroy the token
          navigate('/login'); // Redirect to login page
        }, 3000); // Display "Updating User, Logging Out" for 3 seconds (adjust as needed)
        
      } catch (error) {
        // Handle GraphQL errors
        console.error('Error updating user:', error.message);
        console.error('GraphQL Error:', error);
        setLoading(false); // Stop loading spinner on error
      }
    }
  };

  return (
    <ProfileEditorContainer>
      <H3>Profile Editor</H3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <NameInput
            name="username"
            value={nameFormData.username}
            onChange={handleNameChange}
          />
          <Warning className="error">{nameError}</Warning>
          <ProfileEditorButton type="submit">Update Username</ProfileEditorButton>
        </FormGroup>
        <FormGroup>
          <EmailInput
            name="email"
            value={emailFormData.email}
            onChange={handleEmailChange}
          />
          <Warning className="error">{emailError}</Warning>
          <ProfileEditorButton type="submit">Update Email</ProfileEditorButton>
        </FormGroup>
        <FormGroup>
          <PasswordInput
            name="password"
            value={passwordFormData.password}
            onChange={handlePasswordChange}
          />
          <Warning className="error">{passwordError}</Warning>
          <ProfileEditorButton type="submit">Update Password</ProfileEditorButton>
        </FormGroup>
      </Form>
      {loading && (
        <div className="loading-spinner">
          <RingLoader color="#36D7B7" size={60} />
          <p>Updating User, Logging Out...</p>
        </div>
      )}
    </ProfileEditorContainer>
  );
}
