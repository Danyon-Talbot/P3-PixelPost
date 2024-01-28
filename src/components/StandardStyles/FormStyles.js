import styled from "@emotion/styled";
import { colors } from "./colors";


export const FormStyles = {

    FormContainer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem !important;
        margin-bottom: 1rem !important;
        border-radius: 0.25rem;
        border: 1px solid;
        width: 100%
    `,

    LoginForm: styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
    `,

    FormGroup: styled.div`
        margin-bottom: 1rem;
        width: 100%;
    `,

    // Individual Input Styles for potential individual styling
    NameInput: styled.input`
        width: 100%;
    `,

    EmailInput: styled.input`
        width: 100%;
    `,

    PasswordInput: styled.input`
        width: 100%;
    `,

    // Similar style to global Button, but smaller font size to fit into Form
    FormButton: styled.button`
        font-size: 1rem;
        background-color: ${colors.emerald};
        color: ${colors.richblack};
        padding: 1rem 2rem;
        border-radius: 0.25rem;
        text-transform: uppercase;
        border: 1px solid ${colors.richblack};
        transition: background-color 0.2s ease-in-out;
        margin-bottom: 1.5rem;

        &:hover {
            cursor: pointer;
            background-color: ${colors.malachite};
            border-color: ${colors.emerald};
        }
    `
    
}