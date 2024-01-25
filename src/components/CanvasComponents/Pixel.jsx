import React, { useState } from "react";
import styles from './canvasStyling/canvas.js'


export default function Pixel(props) {
    const {
        Pixel
    } = styles

    const {selectedColor} = props;

    const [pixelColour, setPixelColor] = useState('#fff');
    const [oldColor, setOldColour] = useState(pixelColour);
    const [changeColour, setCanChangeColour] = useState(true);

    return (
        <Pixel className="pixel" style={{backgroundColor: pixelColour}}></Pixel>
    );
}

