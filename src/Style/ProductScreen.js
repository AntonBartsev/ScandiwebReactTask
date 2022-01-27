import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 100%;
    margin-top: 80px;
`;

export const AddToCart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(94, 206, 123, 1);
    height: 52px;
    width: 292px;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    color: #fff;
    cursor: pointer;
    margin-bottom: 40px;
    transition-duration: 0.2s;
    &:hover {
        background-color: rgb(42 139 67);
    }
`;

export const Imgs = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

export const SubImg = styled.img`
    width: 88px;
    height: 88px;
    object-fit: cover;
    margin-bottom: 12px;
`;

export const MainImg = styled.img`
    width: 65%;
    height: 700px;
    object-fit: cover;
`;

export const Specs = styled.div`
    display: flex;
    margin-bottom: 40px;
`;

export const Spec = styled.div`
    display: flex;
    width: 63px;
    height: 45px;
    background-color: white;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    justify-content: center;
    align-items: center;
    border: 1px solid #333;
    cursor: pointer;
    margin-right: 8px;
`;

export const Brand = styled.p`
    font-family: Raleway;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 27px;
    text-align: left;
    margin-bottom: 16px;
`;

export const Name = styled.p`
    font-family: Raleway;
    font-size: 1.65rem;
    font-style: normal;
    font-weight: 400;
    line-height: 27px;
    text-align: left;
    line-height: 1.2rem;
    margin-bottom: 40px;
`;

export const SubName = styled.p`
    font-family: Roboto Condensed;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    margin-bottom: 12px;
    text-transform: uppercase;
`;

export const Price = styled.div`
    font-family: Raleway;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    text-align: left;
    margin-bottom: 25px;
`;

export const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ColoredSpec = styled(Spec)`
    background: ${props => props.color};
    width: 40px;
    height: 40px;
    border-radius: 100%;
`;

export const ChosenSpec = styled.div`
    display: flex;
    width: 63px;
    height: 45px;
    background-color: white;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    justify-content: center;
    align-items: center;
    border: 1px solid #333;
    cursor: pointer;
    background: rgba(29, 31, 34, 1);
    color: white;
    margin-right: 8px;
`;

export const ProductDescription = styled.div`
    width: 292px;
    line-height: 1.4rem;
    font-weight: 500;
`;
