import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { globalStyles } from '../components/StandardStyles/globalStyles';
import { HomepageStyles } from "../components/StandardStyles/HomePageStyles";
import { profileStyles } from '../components/ProfileComponents/profileStyling/ProfileStyles';
import AuthService from '../utils/auth';
import Gallery from '../components/GalleryCompnents/Gallery';
import ProfileEditor from '../components/ProfileComponents/EditProfile';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const {
    HomePage,
    HomeOptions,
  } = HomepageStyles;

  const {
    UserProfilePage,
    UserGalleryPage,
    ProfileOptions,
  } = profileStyles;

  const {
    H1,
    H2,
    H3,
    Button,
  } = globalStyles;

  const isAuthenticated = AuthService.loggedIn();

  const handleGoToEditor = () => {
    navigate('/editor');
  };

  const handleLogOut = () => {
    AuthService.logout();
    navigate('/login');
  }

  const [profileEditor, setHideProfileEditor] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit Profile');
  const [galleryKey, setGalleryKey] = useState(0); // Add a state variable to trigger re-render

  function editProfile() {
    setHideProfileEditor(!profileEditor);

    editButtonText === 'Edit Profile'
      ? setEditButtonText('Close Profile Editor')
      : setEditButtonText('Edit Profile');
  }

  // Listen for changes in the 'username' parameter
  useEffect(() => {
    // When the 'username' parameter changes, update the 'galleryKey'
    // This will trigger a re-render of the Gallery component
    setGalleryKey(prevKey => prevKey + 1);
  }, [username]);

  return (
    <UserProfilePage>
      <HomePage>
        <H1>Welcome To Pixel Post {username}!</H1>
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
        {/* Use the 'key' prop to trigger a re-render of Gallery */}
        <Gallery key={galleryKey} />
      </UserGalleryPage>
    </UserProfilePage>
  );
};

export default Profile;
