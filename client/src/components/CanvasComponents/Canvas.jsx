import React, { useRef }from "react";
import Row from './Row.jsx';
import styles from './canvasStyling/canvas.js'
import { globalStyles } from "../StandardStyles/globalStyles.js";
import { exportComponentAsPNG } from "react-component-export-image";

import AuthService from '../../utils/auth.js';

export default function Canvas(props) {
    const {
        Canvas,
        Pixels,
    } = styles;

    const {
        Button,
        ButtonAuthenticated
    } = globalStyles;

    const {width, height, selectedColor} = props;

    const canvasRef = useRef();

    const isAuthenticated = AuthService.loggedIn(); 

    let rows = [];

    for (let i = 0; i < height; i++) {
        rows.push(<Row key={i} width={width} selectedColor={selectedColor} />)
    }
    return (
        <Canvas id="canvas">
            <Pixels id='pixels' ref={canvasRef}>
                {rows}
            </Pixels>
            
            {isAuthenticated ? (
                <div>
                <ButtonAuthenticated className="button">Save To Gallery</ButtonAuthenticated>
                <ButtonAuthenticated onClick={() => exportComponentAsPNG(canvasRef)} className="button">Download as PNG</ButtonAuthenticated>
                </div>
            ) : (
                <Button onClick={() => exportComponentAsPNG(canvasRef)} className="button">Download as PNG</Button>
            )}
        </Canvas>
    );
}

