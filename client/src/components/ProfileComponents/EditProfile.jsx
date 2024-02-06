import React, { useState } from "react";
import { profileStyles } from "../ProfileComponents/profileStyling/ProfileStyles";
import { globalStyles } from "../StandardStyles/globalStyles";
import { FormStyles } from "../StandardStyles/FormStyles";
import AuthService from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { UPDATE_USER, DELETE_USER } from '../../utils/mutations'; // Import the mutation for updating and deleting the user
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
    DeleteUserButton,
    NoDeleteUserButton,
    ConfirmationButtons, // Style for confirmation buttons container
  } = FormStyles;

  const { H3 } = globalStyles;

  const { ProfileEditorContainer, ProfileEditorButton } = profileStyles;

  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [formData, setFormData] = useState({
    username: AuthService.getProfile().authenticatedPerson.username,
    email: AuthService.getProfile().authenticatedPerson.email,
    password: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false); // State to control loading spinner
  const [deletingUser, setDeletingUser] = useState(false); // State to control deleting user
  const [showConfirmationButtons, setShowConfirmationButtons] = useState(false); // State to control visibility of confirmation buttons
  const [currentAction, setCurrentAction] = useState(""); // State to track the current action

  const navigate = useNavigate();

  const validateFormData = () => {
    let isValid = true;

    if (formData.username.trim() === "") {
      setNameError("Username is required");
      isValid = false;
    } else {
      setNameError("");
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (formData.email.trim() !== "" && !emailPattern.test(formData.email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (formData.password.trim() !== "" && formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e, actionType) => {
    e.preventDefault();
    setCurrentAction(actionType); // Set the current action

    if (actionType === 'delete') {
      // Handle delete action here
      setShowConfirmationButtons(true); // Show confirmation buttons for delete
    } else {
      if (validateFormData()) {
        try {
          setLoading(true); // Start loading spinner

          const { data } = await updateUser({
            variables: {
              ...formData,
            },
          });

          // Handle success
          console.log('User updated:', data.updateUser); // REMOVE THIS BEFORE LIVE PUSH

          setTimeout(() => {
            AuthService.logout(); // Add a logout function to destroy the token
            navigate('/login'); // Redirect to the login page
          }, 3000); // Display "Updating User, Logging Out" for 3 seconds (adjust as needed);
        } catch (error) {
          // Handle GraphQL errors
          console.error('Error updating user:', error.message);
          console.error('GraphQL Error:', error);
        }
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      setDeletingUser(true); // Start deleting user spinner

      // Perform the delete user mutation
      await deleteUser();

      // Log the user out and redirect to the login page
      AuthService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Error deleting user:', error.message);
      setDeletingUser(false); // Stop deleting user spinner on error
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationButtons(false); // Hide confirmation buttons when "No" is clicked
  };

  return (
    <ProfileEditorContainer>
      <H3>Profile Editor</H3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <NameInput
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Warning className="error">{nameError}</Warning>
          <ProfileEditorButton type="submit" disabled={loading}>
            Update Username
          </ProfileEditorButton>
          {currentAction === 'updateUsername' && loading && (
            <RingLoader color="#36D7B7" size={20} />
          )}
        </FormGroup>
        <FormGroup>
          <EmailInput
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Warning className="error">{emailError}</Warning>
          <ProfileEditorButton type="submit" disabled={loading}>
            Update Email
          </ProfileEditorButton>
          {currentAction === 'updateEmail' && loading && (
            <RingLoader color="#36D7B7" size={20} />
          )}
        </FormGroup>
        <FormGroup>
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Warning className="error">{passwordError}</Warning>
          <ProfileEditorButton type="submit" disabled={loading}>
            Update Password
          </ProfileEditorButton>
          {currentAction === 'updatePassword' && loading && (
            <RingLoader color="#36D7B7" size={20} />
          )}
        </FormGroup>
        <br />
        <FormGroup>
          <DeleteUserButton onClick={(e) => handleSubmit(e, 'delete')}>
            Delete User!!
          </DeleteUserButton>
          {showConfirmationButtons && (
            <ConfirmationButtons>
              <DeleteUserButton onClick={handleDeleteUser}>Yes</DeleteUserButton>
              <NoDeleteUserButton onClick={handleCancelDelete}>No</NoDeleteUserButton>
            </ConfirmationButtons>
          )}
          {deletingUser && (
            <div className="loading-spinner">
              <p>Deleting User...</p>
            </div>
          )}
        </FormGroup>
      </Form>
    </ProfileEditorContainer>
  );
}
