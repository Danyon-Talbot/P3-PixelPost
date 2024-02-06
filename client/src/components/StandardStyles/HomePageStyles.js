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
    `,

    HomeOptions: styled.div`
        margin-top: 2rem;
    `



}