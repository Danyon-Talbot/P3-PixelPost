import React from 'react';
import { globalStyles } from '../components/StandardStyles/globalStyles';
import { HomepageStyles } from "../components/StandardStyles/HomePageStyles";
import { profileStyles } from '../components/ProfileComponents/profileStyling/ProfileStyles';
import { useNavigate } from "react-router-dom";

import AuthService from '../utils/auth'

const Profile = () => {

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

    const navigate = useNavigate();

    const username = AuthService.getUsername();

    const handleGoToEditor = () => {
        navigate(`/editor/${username}`);
    };

    const isAuthenticated = AuthService.loggedIn(); 

    const handleLogOut = () => {
        AuthService.logout();
        navigate('/login');
    }

    return (
        <UserProfilePage>
            <HomePage>
                <H1>Pixel Post</H1>
                <H2>Welcome To Your Profile</H2>
                <Button onClick={handleGoToEditor}>Open Canvas</Button>

            {isAuthenticated ? (
                <Button onClick={handleLogOut}>Logout</Button>
            ) : (
                <Button>Nothing</Button>
            )}

            
            </HomePage>
            <UserGalleryDemo>
                <H1>Gallery Demo Section</H1>
            </UserGalleryDemo>
        </UserProfilePage>
    );
};

export default Profile;