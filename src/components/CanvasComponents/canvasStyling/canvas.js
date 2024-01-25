import styled from "@emotion/styled";

const styles = {
    Canvas: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,

    Pixels: styled.div`
        margin-bottom: 2rem;
    `,

    Pixel: styled.div`
        width: 1.5rem;
        height: 1.5rem;

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