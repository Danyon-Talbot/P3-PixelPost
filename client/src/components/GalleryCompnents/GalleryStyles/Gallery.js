import styled from '@emotion/styled';
import { colors } from '../../StandardStyles/colors';

export const GalleryStyles = {

    GalleryContainer: styled.div`
        display: grid;
        grid-template-columns: repeat(3, minmax(200px, 1fr)); /* Adjust minmax values as needed */
        gap: 2rem;
        max-width: 100%;
        border: 1px solid;
        border-radius: 0.25rem;
        padding: 1rem;
        background: ${colors.prussianblue};
        justify-content: center;
        align-items: center;
        max-height: 650px;
        overflow-y: auto;
    `,

    ImageContainer: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    `,

}