import React, { useRef } from "react";
import Row from "./Row.jsx";
import styles from "./canvasStyling/canvas.js";
import { globalStyles } from "../StandardStyles/globalStyles.js";
import AuthService from "../../utils/auth.js";
import { useMutation } from "@apollo/client";
import html2canvas from "html2canvas";
import { exportComponentAsPNG } from 'react-component-export-image';

import { SAVE_TO_GALLERY_MUTATION } from "../../utils/mutations.js";
import { QUERY_USER_GALLERY } from "../../utils/queries.js";

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

  const [saveImage] = useMutation
  (SAVE_TO_GALLERY_MUTATION);

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
      const canvasImage = await html2canvas(canvasElement);
      console.log("Canvas Image Created");
      // Convert the captured image to a data URL
      const capturedPNGData = canvasImage.toDataURL("image/png");
      console.log("Captured PNG Data");
      
      const owner = localStorage.getItem('username');
      const input = {
        base64Image: capturedPNGData,
        filename: 'temporaryName',
        contentType: 'image/png',
        owner: owner,
      };

      // DEBUGGING: Logs JWT token from storage
      console.log("Token from AuthService:", AuthService.getToken());

      const result = await saveImage({
        variables: {
          input: input,
        },
        context: {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
        },
      });
      console.log("Request Headers:" , result.context.headers);

      
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
