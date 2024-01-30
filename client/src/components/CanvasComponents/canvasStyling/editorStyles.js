import styled from '@emotion/styled';
import { colors } from '../../StandardStyles/colors';

export const editorStyles = {

    EditorContainer: styled.div`
        border: 1px solid;
        border-color: ${colors.richblack};
        border-radius: 0.25rem;
        padding: 1rem 4rem 2rem 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${colors.celeste};
    `,

    Options:styled.div`
        display: flex;
        margin-bottom; 3rem;
        justify-content: center;
    `,
    HeightWidth: styled.div`
        display: flex;
        flex-direction: column;
    `,
    PanelInput: styled.input`
        height: 5rem;
        width: 5rem;
        font-size: 2rem;
        text-align: center;
        background-color: ${colors.emerald};
        color: black;
        border: 1px solid ${colors.richblack};
        border-radius: 0.25rem;
        margin: 0 1rem 0.5rem 1rem;
        padding-left: 1rem;

        &:focus,
        &:hover {
            outline: none !important;
            border-color: ${colors.richblack};
            box-shadow: 0 0 0.5rem ${colors.emerald};
        }
    `,

    Span: styled.span`
        font-size: 1.5rem;
    `,
}