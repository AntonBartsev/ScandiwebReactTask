import styled from "styled-components";

export const NavbarDiv = styled.div`
    display: grid;
    padding-top: 20px;
    padding-bottom: 20px;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    grid-auto-columns: 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
`;

export const Left = styled.div`
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
`;

export const Category = styled.div`
    display: -webkit-box;
    color: ${props => (props.isCategoryActive ? "#5ECE7B" : "#333")};
    display: -webkit-flex;
    display: -ms-flexbox;
    fill: solid;
    display: flex;
    margin-right: 24px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    line-height: 19.2px;
    text-transform: uppercase;
    cursor: pointer;
`;

export const Center = styled.div`
    flex: 1;
    text-align: center;
`;

export const Right = styled.div`
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
`;

export const Image = styled.img`
    border: 0;
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;

`;

export const CurrencySign = styled.p`
    font-family: Raleway;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
`;

export const ArrowImgUp = styled.img`
    width: 8px;
    margin-left: 6px;
    cursor: pointer;
    transform: rotate(180deg)
`;

export const ArrowImgDown = styled.img`
    width: 8px;
    margin-left: 6px;
    cursor: pointer;
`;

export const Currency = styled.div`
    display: flex;
    position: relative;
    margin-right: 24px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    font-size: 18px;
    text-transform: uppercase;
`;

export const CartCounterAndImg = styled.div`
    position: relative;
`;

export const Counter = styled.div`
    position: absolute;
    left: auto;
    right: -8px;
    top: -8px;
    bottom: auto;
    display: flex;
    justify-content: center;
    color: white;
    height: 20px;
    width: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 100%;
    background-color: #333;
    cursor: pointer;
`;
