import React, { useRef } from "react";
import Row from "./Row.jsx";
import styles from "./canvasStyling/canvas.js";
import { globalStyles } from "../StandardStyles/globalStyles.js";
import AuthService from "../../utils/auth.js";
import { useMutation } from "@apollo/client";
import html2canvas from "html2canvas";
import { exportComponentAsPNG } from 'react-component-export-image';

import { SAVE_TO_GALLERY_MUTATION } from "../../utils/mutations.js";

export default function Canvas(props) {
  const {
    Canvas,
    Pixels,
  } = styles;

  const {
    Button,
    ButtonAuthenticated
  } = globalStyles;

  const { width, height, selectedColor } = props;

  const canvasRef = useRef();

  const isAuthenticated = AuthService.loggedIn();

  const [saveImage] = useMutation(SAVE_TO_GALLERY_MUTATION);

  const captureAndSaveImage = async (event) => {
    event.preventDefault();
    console.log("captureAndSaveImage function called");
    try {
      const canvasElement = canvasRef.current;

      if (!canvasElement) {
        console.error("Canvas element not found");
        return;
      } else {
        console.log("Canvas Element Found");
      }

      // Use html2canvas to capture the Pixels component as an image
      const canvasImage = await html2canvas(canvasElement, { type: "image/png" });
      console.log("Canvas Image Created", canvasElement);
      // Convert the captured image to a data URL
      const capturedPNGData = canvasImage.toDataURL("image/png");
      console.log("Captured PNG Data");
      console.log(capturedPNGData);
      
      // Remove data URL prefix
    const base64Content = capturedPNGData.split(',')[1];

      // SETS VARIABLES FOR SAVEIMAGE
      const result = await saveImage({
        variables: {
          base64Image: base64Content, // Use the extracted base64 content
          filename: 'temporaryName',
          contentType: 'image/png',
          owner: AuthService.getProfile().authenticatedPerson.username
        },
      });

      
      console.log("Called saveImage");
      if (result.errors) {
        // Handle GraphQL errors
        result.errors.forEach((error) => {
          console.error("GraphQL Error:", error.message);
        });
      } else {
        console.log("Image Saved To Gallery");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let rows = [];

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />);
  }

  return (
    <Canvas id="canvas">
      <Pixels id="pixels" ref={canvasRef}>
        {rows}
      </Pixels>

      {isAuthenticated ? (
        <div>
          <ButtonAuthenticated
            className="button"
            onClick={captureAndSaveImage}
          >
            Save To Gallery
          </ButtonAuthenticated>

          <ButtonAuthenticated
            onClick={() => exportComponentAsPNG(canvasRef)}
            className="button"
          >
            Download as PNG
          </ButtonAuthenticated>
        </div>
      ) : (
        <Button onClick={() => exportComponentAsPNG(canvasRef)} className="button">
          Download as PNG
        </Button>
      )}
    </Canvas>
  );
}
