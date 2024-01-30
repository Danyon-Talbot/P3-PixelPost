import React from 'react';
import { globalStyles } from '../StandardStyles/globalStyles';
import { HomepageStyles } from "../StandardStyles/HomePageStyles";
import { profileStyles } from './profileStyling/ProfileStyles';
import { useNavigate } from "react-router-dom";

export default function Profile() {

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

    const handleGoToEditor = () => {
        navigate('/editor');
    };

    return (
        <UserProfilePage>
            <HomePage>
                <H1>Pixel Post</H1>
                <H2>Welcome To Your Profile</H2>
                <Button onClick={handleGoToEditor}>Open Canvas</Button>
            </HomePage>
            <UserGalleryDemo>
                <H1>Gallery Demo Section</H1>
            </UserGalleryDemo>
        </UserProfilePage>
    );
}