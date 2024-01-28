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

    NameInput: styled.input`
        width: 100%;
    `,

    EmailInput: styled.input`
        width: 100%;
    `,

    PasswordInput: styled.input`
        width: 100%;
    `,
    
}