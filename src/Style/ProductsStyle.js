import styled from "styled-components";

export const Container = styled.div`
display: grid;
grid-auto-columns: 1fr;
grid-row-gap: 87.62px;
grid-column-gap: 41.25px;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: auto;
`;

export const ProductContainer = styled.div`
position: relative;
display: block;
width: 100%;
height: auto;
cursor: pointer;
`;

export const ProductContainerOutOfStock = styled.div`
position: relative;
display: block;
width: 100%;
height: auto;
cursor: pointer;
opacity: 0.3;
`;

export const Name = styled.div`
display: flex;
position: relative;
flex-direction: column;
justify-content: flex-end;
background-color: white;
font-weight: 300;
font-style: light;
font-size: 18px;
cursor: pointer;
`;

export const Price = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
font-weight: bold;
background-color: white;
font-weight: 500;
font-style: medium;
font-size: 18px;
cursor: pointer;
`;

export const Img = styled.img`
display: flex;
justify-content: space-between;
width: 100%;
height: 338px;
object-fit: cover;
cursor: pointer;
`;

export const TextOutOfStock = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Raleway;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0px;
  text-align: left;
`;
