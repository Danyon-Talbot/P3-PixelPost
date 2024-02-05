import styled from '@emotion/styled';
import { colors } from './colors';


export const HomepageStyles = {

    HomePage: styled.div`
        border: 1px solid;
        border-color: ${colors.richblack};
        border-radius: 0.25rem;
        padding: 1rem 4rem 1rem 4rem;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${colors.celeste};
        font-family: 'Chivo Mono', monospace;
        width: fit-content;
    `,
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

    ProfileOptions: styled.div`
        display: flex;
        flex-direction: column;
    `,

    HomeOptions: styled.div`
        margin-top: 2rem;
    `



}