import React from "react";
import { styles } from './canvasStyling/editorStyles';


function Editor() {

    // Imports emotion/styled CSS
    const {
        EditorContainer,
        H1,
        H2,
        Options,
        HeightWidth,
        PanelInput,
        Button,
        Span,
        CirclePicker
    } = styles

    return (
        <EditorContainer id="editor">
            <H1>PIXEL POST</H1>
            <H2>Canvas Dimensions</H2>
            <Options id="options">
                <HeightWidth className="option">
                    <PanelInput 
                        type="number" 
                        className="panelInput" 
                        defaultValue="16" 
                        // onChange={} 
                    />
                    <Span>Width</Span>
                </HeightWidth>
                <HeightWidth className="option">
                    <PanelInput 
                        type="number" 
                        className="panelInput" 
                        defaultValue="16" 
                        // onChange={} 
                    />
                    <Span>Height</Span>
                </HeightWidth>
            </Options>
            <Button className="button">Generate Canvas</Button>
        </EditorContainer>

    );
}

export default Editor;