import React from "react";
import styles from './canvasStyling/canvas.js'
import Pixel from "./Pixel";

export default function Row(props) {
    const {
        Row
    } = styles
    const { width, selectedColor } = props;

    // Create an array of pixel colors
    const pixelColors = Array.from({ length: width }, () => selectedColor);

    return (
        <Row className="row">
            {pixelColors.map((color, i) => (
                <Pixel key={i} selectedColor={color} />
            ))}
        </Row>
    );
}
