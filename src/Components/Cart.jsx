import React, { Component } from "react";
import { CartContainer, CartContent, Img, BtnContainer, BagBtn, ProductInfoInCart, CartHeader, CartSpec, Price, SpecsCart, CounterContainer, CounterBtn, Counter, CheckoutBtn } from "../Style/CartStyle";
  // "eslintConfig": {
  //   "extends": [
  //     "react-app",
  //     "react-app/jest"
  //   ]
  // },

    //"lint": "eslint src --ext .js,.jsx"

    // "eslint-config-standard": "^16.0.3",
    // "eslint-plugin-import": "^2.25.4",
    // "eslint-plugin-node": "^11.1.0",
    // "eslint-plugin-promise": "^5.2.0",
    // "eslint-plugin-react": "^7.28.0"

export default class Cart extends Component {
  render () {
    return (
        <CartContainer>
            <CartHeader>{`My Bag, ${this.props.cartContent.length} items`} </CartHeader>
            {this.props.cartContent.map((item, index) =>
                  <CartContent key={index}>
                      <ProductInfoInCart>
                          <p>{item.brand}</p>
                          <CartSpec>{item.name}</CartSpec>
                          <Price>{item.price[0]}</Price>
                          {item.specs.map((spec, index) => <SpecsCart key={index}>{spec.specDescription + spec.specName}</SpecsCart>)}
                    </ProductInfoInCart>
                    <CounterContainer>
                        <CounterBtn onClick={() => this.props.increaseItemCounter(item.price[1], index)}>+</CounterBtn>
                        <Counter>{item.itemCounter}</Counter>
                        <CounterBtn onClick={() => this.props.decreaseItemCounter(item.price[1], index) }>-</CounterBtn>
                    </CounterContainer>

                      <Img src={item.img[0]} />
                  </CartContent>
            )}
            <Price>{"Total: " + (this.props.cartContent.length > 0 ? `${this.props.currency}` + `${this.props.totalPriceOfCart}` : 0)}</Price>
              <BtnContainer>
                  <BagBtn onClick={() => this.props.setComponentToRender("bag", this.props.productInfo)}>VIEW BAG</BagBtn>
                  <CheckoutBtn>CHECKOUT</CheckoutBtn>
              </BtnContainer>

          </CartContainer>
    );
  }
}
