import styled from "styled-components";

export const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
max-width: 100%;
`;

export const AddToCart = styled.div`
background: rgba(94, 206, 123, 1);
text-align: center;
height: 52px;
width: 292px;
left: 929px;
top: 478px;
border-radius: 0px;
padding: 16px, 32px, 16px, 32px;
font-family: Raleway;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 19px;
letter-spacing: 0em;
cursor: pointer;
`;

export const Imgs = styled.div`
display: flex;
flex-direction: column;
padding: 20px 20px 20px 20px;
justify-content: space-between;
width: 20%;
height: 50px;
object-fit: cover;
cursor: pointer;
`;

export const MainImg = styled.img`

`;

export const Specs = styled.div`
display: flex;
justify-content: space-between;
align-items: center
`;

export const Spec = styled.button`
width: 63px;
height: 45px;
background-color: white;
border: 1px solid #333;
font-family: Source Sans Pro;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 18px;
letter-spacing: 0.05em;
text-align: center;
padding: 20px 20px 20px 20px;
cursor: pointer
`;

export const Brand = styled.p`
font-family: Raleway;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: 27px;
letter-spacing: 0em;
text-align: left;
padding: 20px 20px 20px 20px;
`;

export const Name = styled.p`
font-family: Raleway;
font-size: 30px;
font-style: normal;
font-weight: 400;
line-height: 27px;
letter-spacing: 0em;
text-align: left;
padding: 20px 20px 20px 20px;
`;

export const SubName = styled.p`
font-family: Roboto Condensed;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 18px;
letter-spacing: 0em;
text-align: center;
padding: 20px 20px 20px 20px;
`;

export const Price = styled.div`
font-family: Raleway;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
padding: 20px 20px 20px 20px;
`;

export const OrderContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
