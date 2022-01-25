import React, { Component } from "react";
import { CartContainer, CartContent, Img, BtnContainer, BagBtn, ProductInfoInCart } from "../Style/CartStyle";

export default class Cart extends Component {
  render () {
      const newNumPrice = this.props.setProductPrice(this.props.productInfo, this.props.currency)[1];
    return (
          <CartContainer>
            {this.props.cartContent.map((item, index) =>
                  <CartContent key={index}>
                      <ProductInfoInCart>
                          <p>{item.brand}</p>
                          <p>{item.name}</p>
                          <p>{this.props.setProductPrice(this.props.productInfo, this.props.currency)[0]}</p>
                          {item.specs.map((spec, index) => <p key={index}>{spec.specDescription + spec.specName}</p>)}
                      </ProductInfoInCart>
                      <button onClick={() => this.props.increaseItemCounter(newNumPrice, index)}>+</button>
                      <p>{item.itemCounter}</p>
                      <button onClick={() => this.props.decreaseItemCounter(newNumPrice, index) }>-</button>
                      <Img src={item.img[0]} />
                  </CartContent>
            )}
            <p>{"Total: " + (this.props.cartContent.length > 0 ? `${this.props.currency}` + `${this.props.totalPriceOfCart.toFixed(0)}` : 0)}</p>
              <BtnContainer>
                  <BagBtn onClick={() => this.props.setComponentToRender("bag", this.props.productInfo)}>VIEW CART</BagBtn>
                  <BagBtn>CHECKOUT</BagBtn>
              </BtnContainer>

          </CartContainer>
    );
  }
}
