import styled from '@emotion/styled';
import { colors } from '../../StandardStyles/colors';

export const profileStyles = {
    UserProfilePage: styled.div`
        display: flex;
        justify-content: space-between;
        border: 1px solid;
        border-color: ${colors.richblack};
        border-radius: 0.25rem;
        padding: 1rem 4rem 2rem 4rem;
        margin-top: 1rem;
        background-color: ${colors.prussianblue};
    `,

    UserGalleryPage: styled.div`
        display: flex;
        justify-content: center;
        border: 1px solid;
        border-color: ${colors.richblack};
        border-radius: 0.25rem;
        padding: 1rem 2rem 2rem 2rem;
        margin-top: 1rem;
        margin-left: 1rem;
        background-color: ${colors.celeste};
        max-width: 80%;
        flex-direction: column;
        align-items: top;
        max-height: 100vh;
        overflow-y: auto;
    `,

    ProfileEditorContainer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem !important;
        margin-bottom: 1rem !important;
        border-radius: 0.25rem;
        border: 1px solid;
        width: 100%;
        background-color: ${colors.emerald};
    `,

    
    ProfileOptions: styled.div`
        display: flex;
        flex-direction: column;
    `,

    ProfileEditorButton: styled.button`
        font-size: 1rem;
        background-color: ${colors.malachite};
        color: ${colors.richblack};
        padding: 0.2rem 0.5rem;
        border-radius: 0.25rem;
        text-transform: uppercase;
        border: 1px solid ${colors.richblack};
        transition: background-color 0.2s ease-in-out;
        margin: 0.2rem;
        font-family: 'Chivo Mono', monospace;
        width: 100%;

        &:hover {
            cursor: pointer;
            background-color: ${colors.platinum};
            border-color: ${colors.richblack};
        }
    `,
    
}