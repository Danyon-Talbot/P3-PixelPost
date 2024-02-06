import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { globalStyles } from '../components/StandardStyles/globalStyles';
import { HomepageStyles } from "../components/StandardStyles/HomePageStyles";
import { profileStyles } from '../components/ProfileComponents/profileStyling/ProfileStyles';
import AuthService from '../utils/auth';
import Gallery from '../components/GalleryCompnents/Gallery';
import ProfileEditor from '../components/ProfileComponents/EditProfile'

const Profile = () => {

    const {
        HomePage,
        HomeOptions,
    } = HomepageStyles;

    const {
        UserProfilePage,
        UserGalleryPage,
        ProfileOptions,
    } = profileStyles

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

    const currentUser = AuthService.getProfile().authenticatedPerson.username

    const [profileEditor, setHideProfileEditor] = useState(false);
    const [editButtonText, setEditButtonText] = useState('Edit Profile');

    function editProfile() {
        setHideProfileEditor(!profileEditor)

        editButtonText === 'Edit Profile'
        ? setEditButtonText('Close Profile Editor')
        : setEditButtonText('Edit Profile')
    }

    return (
        <UserProfilePage>
            <HomePage>
                <H1>Welcome To Pixel Post {currentUser}!</H1>
                <HomeOptions> 
                {/* <H2>{storedUsername}</H2> */}
                <Button onClick={handleGoToEditor}>Open Canvas</Button>
                {isAuthenticated && (
                    <ProfileOptions>
                        {profileEditor && (
                            <ProfileEditor />
                        )}
                        <Button onClick={editProfile}>{editButtonText}</Button>
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
