import React, { useState } from "react";
import { editorStyles } from './canvasStyling/editorStyles';
import { globalStyles } from '../StandardStyles/globalStyles'
import { CirclePicker } from "react-color";
import Canvas from "./Canvas";

export default function Editor() {
    const [panelWidth, setPanelWidth] = useState(16);
    const [panelHeight, setPanelHeight] = useState(16);
    const [hideOptions, setHideOptions] = useState(false);
    const [hideCanvas, setHideCanvas] = useState(true);
    const [buttonText, setButtonText] = useState('Generate Canvas');
    const [selectedColor, setColor] = useState("#f44336")

    // Imports emotion/styled CSS
    const {
        EditorContainer,
        Options,
        HeightWidth,
        PanelInput,
        Span,
    } = editorStyles

    const {
        Button,
        H1,
        H2,
    } = globalStyles
    
    function initialiseCanvas() {
        setHideOptions(!hideOptions);
        setHideCanvas(!hideCanvas);

        buttonText === 'Generate Canvas'
        ? setButtonText('Reset Canvas')
        : setButtonText('Generate Canvas');
    }

    function changeColour(color) {
        setColor(color.hex);
    }


    return (
        <EditorContainer id="editor">
            <H1>PIXEL POST</H1>
            {hideCanvas && <H2>Canvas Dimensions</H2>}
            {hideCanvas && <Options id="options">
             <HeightWidth className="option">
                    <PanelInput 
                        type="number" 
                        className="panelInput" 
                        defaultValue={panelWidth} 
                        onChange={(e) => {
                            setPanelWidth(e.target.value);
                          }}
                    />
                    <Span>Width</Span>
                </HeightWidth>
                <HeightWidth className="option">
                    <PanelInput 
                        type="number" 
                        className="panelInput" 
                        defaultValue={panelHeight}
                        onChange={(e) => {
                            setPanelHeight(e.target.value);
                          }}
                    />
                    <Span>Height</Span>
                </HeightWidth>
            </Options>}
            <Button className="button" onClick={initialiseCanvas}>{buttonText}</Button>

            {hideOptions && (
            <CirclePicker 
            color={selectedColor} onChangeComplete={changeColour}/>
            )}
            
            {hideOptions && (
            <Canvas 
            width={panelWidth}
            height={panelHeight}
            selectedColor={selectedColor}
            />
            )}

            


        </EditorContainer>
    );
}