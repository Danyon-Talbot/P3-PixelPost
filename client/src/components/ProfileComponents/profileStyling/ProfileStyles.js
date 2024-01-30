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
        background-color: ${colors.celeste};
        width: 100%;
    `,

    UserGalleryDemo: styled.div`
        display: flex;
        justify-content: center;
        border: 1px solid;
        border-color: ${colors.richblack};
        border-radius: 0.25rem;
        padding: 1rem 4rem 2rem 4rem;
        margin-top: 1rem;
        margin-left: 1rem;
        background-color: ${colors.celeste};
        width: 80%;
    `
}