import styled from "@emotion/styled";
import { colors } from './colors';

export const globalStyles = {
    H1: styled.h1`
    margin-bottom: 1rem;
    text-transform: uppercase;
    `,

    H2: styled.h2`
        margin-bottom: 1.5rem;
    `,

    H3: styled.h3`
        margin: 5px;
    `,

    Button: styled.button`
        font-size: 1.25rem;
        background-color: ${colors.emerald};
        color: ${colors.richblack};
        padding: 1rem 3rem;
        border-radius: 0.25rem;
        text-transform: uppercase;
        border: 1px solid ${colors.richblack};
        transition: background-color 0.2s ease-in-out;
        margin-bottom: 1.5rem;
        font-family: 'Chivo Mono', monospace;

        &:hover {
            cursor: pointer;
            background-color: ${colors.malachite};
            border-color: ${colors.richblack};
        }
    `,

    ButtonAuthenticated: styled.button`
        font-size: 1.25rem;
        background-color: ${colors.emerald};
        color: ${colors.richblack};
        padding: 1rem 1rem;
        margin: 0.2rem 0.2rem;
        border-radius: 0.25rem;
        text-transform: uppercase;
        border: 1px solid ${colors.richblack};
        transition: background-color 0.2s ease-in-out;
        margin-bottom: 1.5rem;
        font-family: 'Chivo Mono', monospace;

        &:hover {
            cursor: pointer;
            background-color: ${colors.malachite};
            border-color: ${colors.richblack};
        }
    `

}