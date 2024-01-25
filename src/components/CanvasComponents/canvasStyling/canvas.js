import styled from "@emotion/styled";
import { colors } from './colors'

const styles = {
    Canvas: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem !important;
    `,

    Pixels: styled.div`
        margin-bottom: 2rem;
    `,

    Pixel: styled.div`
        width: 1.5rem;
        height: 1.5rem;
        margin: 0;

        &:hover {
            cursor: pointer;
        }
    `,

    Row: styled.div`
        display: flex;
        width: fit-content;
    `,

}

export default styles;