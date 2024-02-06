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

    Form: styled.form`
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
        width: 95%;
    `,

    EmailInput: styled.input`
        width: 95%;
    `,

    PasswordInput: styled.input`
        width: 95%;
    `,
    Warning: styled.div`
        width: 100%;
        font-size: 16px;
        align-self: center;
        margin-top: 0.1rem;
        margin-bottom: 0.5rem;
        border-radius: 0.25rem;
        background-color: ${colors.coolgrey};
        color: ${colors.burgundy}
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
        margin-bottom: 1rem;
        font-family: 'Chivo Mono', monospace;

        &:hover {
            cursor: pointer;
            background-color: ${colors.malachite};
            border-color: ${colors.richblack};
        }
    `,

    ConfirmationButtons: styled.div`
        margin-bottom: 1rem;
        width: 100
    `,
    DeleteUserButton: styled.button`
        font-size: 1rem;
        background-color: ${colors.burgundy};
        color: ${colors.platinum};
        padding: 0.2rem 0.5rem;
        margin-bottom: 1rem;
        border-radius: 0.25rem;
        text-transform: uppercase;
        border: 1px solid ${colors.richblack};
        transition: background-color 0.2s ease-in-out;
        font-family: 'Chivo Mono', monospace;
        width: 80%;

        &:hover {
            cursor: pointer;
            background-color: ${colors.platinum};
            border-color: ${colors.richblack};
            color: ${colors.burgundy};
        }
    `,

    NoDeleteUserButton: styled.button`
        font-size: 1rem;
        background-color: ${colors.malachite};
        color: ${colors.richblack};
        padding: 0.2rem 0.5rem;
        margin-bottom: 1rem;
        border-radius: 0.25rem;
        text-transform: uppercase;
        border: 1px solid ${colors.richblack};
        transition: background-color 0.2s ease-in-out;
        font-family: 'Chivo Mono', monospace;
        width: 80%;

        &:hover {
            cursor: pointer;
            background-color: ${colors.platinum};
            border-color: ${colors.richblack};
        }
    `,
}