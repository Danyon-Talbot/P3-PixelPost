import React from "react";
import { GalleryStyles } from "../GalleryCompnents/GalleryStyles/Gallery";
import { useQuery } from "@apollo/client";
import { GET_USER_IMAGES } from '../../utils/queries'; // Import the userImages query

export default function Gallery() {
  const { 
    GalleryContainer,
    ImageContainer,
  } = GalleryStyles;

  // Use the useQuery hook to fetch the user's gallery
  const { loading, error, data } = useQuery(GET_USER_IMAGES); // Use the userImages query

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Error fetching user gallery:', error);
    return <p>Error loading gallery images.</p>;
  }

  // Check the structure of the returned data using console.log
  console.log('Data:', data);

  // Assuming that data.userImages is the correct structure
  const userImages = data.userImages; // Use the correct data field

  const ImagesList = ({ images }) => {
    if (!images.length) {
      return <h3>No Images Found</h3>;
    }
    return (
      <GalleryContainer>
        {images.map((image) => (
          <ImageContainer key={image._id}> {/* Move key to ImageContainer */}
            <img
              className="gallery-image"
              src={`data:${image.contentType.trim()};base64,${image.data}`}
              alt={image.filename}
            />
          </ImageContainer>
        ))}
      </GalleryContainer>
    );
  };

  console.log('User Images:', userImages); // Added console log for userImages

  return <ImagesList images={userImages} />;
}
