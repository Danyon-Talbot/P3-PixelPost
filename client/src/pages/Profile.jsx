import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { globalStyles } from '../components/StandardStyles/globalStyles';
import { HomepageStyles } from "../components/StandardStyles/HomePageStyles";
import { profileStyles } from '../components/ProfileComponents/profileStyling/ProfileStyles';
import AuthService from '../utils/auth';

const Profile = () => {
    const { username } = useParams(); // Get the username from the URL parameter

    const {
        UserProfilePage,
        UserGalleryDemo,
    } = profileStyles;

    const {
        HomePage,
    } = HomepageStyles;

    const {
        H1,
        H2,
        H3,
        Button,
    } = globalStyles;

    const isAuthenticated = AuthService.loggedIn(); 

    const navigate = useNavigate();

    const handleGoToEditor = () => {
        navigate('/editor');
    };

    const handleLogOut = () => {
        AuthService.logout();
        navigate('/login');
    }

    const storedUsername = localStorage.getItem('username');

    return (
        <UserProfilePage>
            <HomePage>
                <H1>Welcome To Pixel Post</H1>
                <H2>{storedUsername}</H2>
                <Button onClick={handleGoToEditor}>Open Canvas</Button>
                {isAuthenticated && (
                    <Button onClick={handleLogOut}>Logout</Button>
                )}
            
            </HomePage>
            <UserGalleryDemo>
                <H1>Your Gallery</H1>
            </UserGalleryDemo>
        </UserProfilePage>
    );
};

export default Profile;
