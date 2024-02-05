import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { globalStyles } from '../components/StandardStyles/globalStyles';
import { HomepageStyles } from "../components/StandardStyles/HomePageStyles";
import AuthService from '../utils/auth';
import Gallery from '../components/GalleryCompnents/Gallery';

const Profile = () => {

    const {
        HomePage,
        UserProfilePage,
        UserGalleryPage,
        ProfileOptions,
        HomeOptions,
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
                <H1>Welcome To Pixel Post {storedUsername}!</H1>
                <HomeOptions> 
                {/* <H2>{storedUsername}</H2> */}
                <Button onClick={handleGoToEditor}>Open Canvas</Button>
                {isAuthenticated && (
                    <ProfileOptions>
                        <Button>Edit Profile</Button>
                        <Button onClick={handleLogOut}>Logout</Button>
                    </ProfileOptions>
                )}
                </HomeOptions>
            </HomePage>
            <UserGalleryPage>
                <H1>Your Gallery</H1>
                <Gallery />
            </UserGalleryPage>
        </UserProfilePage>
    );
};

export default Profile;
