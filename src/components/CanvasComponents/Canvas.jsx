import React, { useRef }from "react";
import Row from './Row.jsx';
import styles from './canvasStyling/canvas.js'
import { editorStyles } from "./canvasStyling/editorStyles.js";
import { exportComponentAsPNG } from "react-component-export-image";

export default function Canvas(props) {
    const {
        Canvas,
        Pixels,
    } = styles;

    const {
        Button
    } = editorStyles;

    const {width, height, selectedColor} = props;

    const canvasRef = useRef();

    let rows = [];

    for (let i = 0; i < height; i++) {
        rows.push(<Row key={i} width={width} selectedColor={selectedColor} />)
    }
    return (
        <Canvas id="canvas">
            <Pixels id='pixels' ref={canvasRef}>
                {rows}
            </Pixels>
            <Button onClick={() => exportComponentAsPNG(canvasRef)} className="button">Download as PNG</Button>
        </Canvas>
    );
}

