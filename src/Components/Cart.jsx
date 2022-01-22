import React, { Component } from 'react'
import { CartContainer, CartContent, Img, BtnContainer, BagBtn, ProductInfoInCart } from '../Style/CartStyle'




export default class Cart extends Component {



    render() {
        
        
        
        return (
            <CartContainer>
                {this.props.cartContent.map(item =>
                    <CartContent key={this.props.cartContent.indexOf(item)}>
                        <ProductInfoInCart>
                            <p>{item.name}</p>
                            <p>{item.brand}</p>
                            <p>{item.price}</p>
                            {Array.from(item.specs).map(spec => <p key={spec}>{spec}</p>)}
                        </ProductInfoInCart>
                        <p>{item.itemCounter}</p>
                        <Img src={item.img[0]} />
                    </CartContent>
                )}
                <BtnContainer>
                    <BagBtn onClick={() => this.props.setComponentToRender("bag", '', this.props.cartContent, '')}>VIEW CART</BagBtn>
                    <BagBtn>CHECKOUT</BagBtn>
                </BtnContainer>

            </CartContainer>
        )
    }

}
