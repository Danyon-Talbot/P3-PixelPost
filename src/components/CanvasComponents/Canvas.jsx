import React from "react";
import Row from './Row.jsx';
import styles from './canvasStyling/canvas.js'


export default function Canvas(props) {
    const {
        Canvas,
        Pixels,
    } = styles

    const {width, height, selectedColor} = props;

    let rows = [];

    for (let i = 0; i < height; i++) {
        rows.push(<Row key={i} width={width} selectedColor={selectedColor} />)
    }
    return (
        <Canvas id="canvas">
            <Pixels id='pixels'>
                {rows}
            </Pixels>
        </Canvas>
    );
}

