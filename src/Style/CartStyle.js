import styled from "styled-components";

export const CartContainer = styled.div`
    position: absolute;
    left: auto;
    right: 0;
    height: auto;
    width: 325px;
    display: flex;
    flex-direction: column;
    z-index: 50;
    background-color: white;
    -webkit-box-shadow: 0px 4px 35px 0px rgba(168,172,176,0.19); 
    box-shadow: 0px 4px 35px 0px rgba(168,172,176,0.19);
    padding: 16px;
`;

export const CartHeader = styled.p`
    font-weight: 700;
    margin-bottom: 25px;
`;

export const ProductInfoInCart = styled.div`
    width: 170px;
`;

export const CartContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 40px;
`;

export const Img = styled.img`
    width: 105px;
    height: 137px;
    object-fit: cover;
`;

export const BagBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    box-shadow: inset 0px 0px 0px 1px #333;
    height: 43px;
    width: 150px;
    cursor: pointer;
`;

export const CheckoutBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(94, 206, 123, 1);
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    color: #fff;
    height: 43px;
    width: 150px;
    cursor: pointer;
    transition-duration: 0.2s;
    &:hover {
        background-color: rgb(42 139 67);
    }
`;

export const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between
`;

export const CartSpec = styled.p`
    margin-bottom: 20px;
`;

export const Price = styled(CartSpec)`
    font-weight: 500;
`;

export const SpecsCart = styled.p`
    font-size: 0.8rem;
`;

export const CounterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 137px;
    align-items: center;
`;

export const CounterBtn = styled.div`
    display: flex;
    height: 24px;
    width: 24px;
    border: 1px solid #333;
    justify-content: center;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition-duration: 0.2s;
    &:hover {
        background-color: #333;
        color: white;
    }
`;

export const Counter = styled.p`
    font-weight: 500;
`;
