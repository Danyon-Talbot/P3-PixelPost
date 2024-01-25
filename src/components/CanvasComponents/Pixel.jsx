import React, { useState } from "react";
import styles from './canvasStyling/canvas.js'


export default function Pixel(props) {
    const {
        Pixel
    } = styles

    const { selectedColor } = props;

    const [pixelColor, setPixelColor] = useState("#fff");
    const [oldColor, setOldColor] = useState(pixelColor);
    const [canChangeColor, setCanChangeColor] = useState(true);

    function applyColor() {
        setPixelColor(selectedColor);
        setCanChangeColor(false);
    }

    function changeColourOnHover() {
        setOldColor(pixelColor);
        setPixelColor(selectedColor);
    }

  function resetColor() {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }

    setCanChangeColor(true);
  }

    return (
        <Pixel className="pixel" onClick={applyColor} onMouseEnter={changeColourOnHover} onMouseLeave={resetColor} style={{backgroundColor: pixelColor}}></Pixel>
    );
}

