import styled from "styled-components";

export const CurrenciesContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    width: 114px;
    height: auto;
    background-color: #fff;
    z-index: 999;
    margin-left: -40px;
    margin-top: 40px;
    -webkit-box-shadow: 0px 4px 35px 0px rgba(168,172,176,0.19); 
    box-shadow: 0px 4px 35px 0px rgba(168,172,176,0.19);
`;

export const Currency = styled.p`
    padding: 10px 5px;
    font-family: Raleway;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: right;
    cursor: pointer;
`;
