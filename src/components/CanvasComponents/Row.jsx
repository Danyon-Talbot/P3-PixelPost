import React from "react";
import styles from './canvasStyling/canvas.js'
import Pixel from "./Pixel";


export default function Row(props) {
    const {
        Row
    } = styles
    const {width, selectedColor} = props;

    let pixels = [];

    for (let i = 0; i < width; i++) {
        pixels.push(<Pixel key={i} selectedColor={selectedColor} />)
    }
    return (
        <Row className="row">{pixels}</Row>
    );
}
