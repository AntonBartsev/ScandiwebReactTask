import React, { Component } from 'react'
import styled from 'styled-components'


const CartContainer = styled.div`
max-height: 540px;
width: 325px;
display: flex;
flex-direction: column;
border: 1px solid #333;
`

const CartContent = styled.div`
display: flex;
flex:direction: row;
`

const Img = styled.img`
width: 105px;
height: 137px;
`
const BagBtn = styled.div`
border: 1px solid rgba(29, 31, 34, 1);
height: 43px;
width: 140px;
text-align: center;
vertical-align: middle;
font-family: Raleway;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 17px;
letter-spacing: 0em;
`

const BtnCintainer = styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px 10px 10px;
justify-content: space-between
`

export default class Cart extends Component {



    render() {
        return (
            <CartContainer>
                {this.props.cartContent.map(item =>
                    <CartContent key={this.props.cartContent.indexOf(item)}>
                        <div>
                            <p>{item.size}</p>
                            <p>{item.name}</p>
                            <p>{item.brand}</p>
                            <p>{item.price}</p>
                            {/* <p>{this.setNumOfDublicatedItems()}</p> */}
                        </div>

                        <Img src={item.img[0]} />
                    </CartContent>
                )}
                <BtnCintainer>
                    <BagBtn onClick={() => this.props.setComponentToRender("bag", '', this.props.cartContent, '')}>VIEW CART</BagBtn>
                    <BagBtn>CHECKOUT</BagBtn>
                </BtnCintainer>

            </CartContainer>
        )
    }

}
