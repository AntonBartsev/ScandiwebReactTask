import styled from "styled-components";

export const CartHeading = styled.h1`
    font-family: Raleway;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 40px;
`;

export const BagContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 80px;
    width: 80%;
`;

export const ContentPlacement = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #E5E5E5;
    padding: 20px 0 20px 0;
`;

export const Img = styled.img`
    position: absolute;
    height: 185px;
    width: 141px;
    object-fit: cover;
`;

export const ArrowsImgLeft = styled.img`
    cursor: pointer;
`;

export const ArrowsImgRight = styled.img`
    cursor: pointer;
    transform: rotate(180deg)
`;

export const ImgContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    height: 185px;
    width: 141px;

`;

export const ArrowsContainer = styled.div`
    position: relative;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    padding: 0 6px 0 6px;
`;

export const Brand = styled.p`
    font-size: 1.65rem;
    font-weight: 500;
    margin-bottom: 8px;
`;

export const Name = styled.p`
    font-size: 1.65rem;
    margin-bottom: 25px;
`;

export const Price = styled.p`
    font-size: 1.4rem;
    font-weight: 700;
`;

export const CounterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 185px;
`;

export const CounterBtn = styled.div`
    display: flex;
    height: 45px;
    width: 45px;
    border: 1px solid #333;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
`;

export const InfoContainer = styled.div`
    width: 70%;
`;
