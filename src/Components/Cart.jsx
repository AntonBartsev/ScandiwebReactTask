import React, { PureComponent } from "react";
import { CartContainer, CartContent, Img, BtnContainer, BagBtn, ProductInfoInCart, CartHeader, 
  CartSpec, Price, SpecsCart, CounterContainer, CounterBtn, Counter, CheckoutBtn } from "../Style/CartStyle";
import PropTypes from "prop-types";

// Cart window of the shop
export default class Cart extends PureComponent {

  static propTypes = {
    cartContent: PropTypes.array,
    increaseItemCounter: PropTypes.func,
    decreaseItemCounter: PropTypes.func,
    currency: PropTypes.string,
    totalPriceOfCart: PropTypes.number,
    setComponentToRender: PropTypes.func,
    productInfo: PropTypes.object
  }

  render() {
    const {cartContent, increaseItemCounter, decreaseItemCounter, currency, totalPriceOfCart, setComponentToRender, productInfo} = this.props
    return (
        <CartContainer>
            <CartHeader>{`My Bag, ${cartContent.length} items`} </CartHeader>
            {cartContent.map((item, index) =>
                  <CartContent key={index}>
                      <ProductInfoInCart>
                          <p>{item.brand}</p>
                          <CartSpec>{item.name}</CartSpec>
                          <Price>{item.price[0]}</Price>
                          {item.specs[0] !== "No Specs" ? item.specs.map((spec, index) => <SpecsCart key={index}>{spec.specDescription + spec.specName}</SpecsCart>) : ''}
                    </ProductInfoInCart>
                    <CounterContainer>
                        <CounterBtn onClick={() => increaseItemCounter(item.price[1], index)}>+</CounterBtn>
                        <Counter>{item.itemCounter}</Counter>
                        <CounterBtn onClick={() => decreaseItemCounter(item.price[1], index) }>-</CounterBtn>
                    </CounterContainer>

                      <Img src={item.img[0]} />
                  </CartContent>
            )}
            <Price>{"Total: " + (cartContent.length > 0 ? `${currency + totalPriceOfCart.toFixed(2)}` : 0)}</Price>
              <BtnContainer>
                  <BagBtn onClick={() => setComponentToRender("bag", productInfo)}>VIEW BAG</BagBtn>
                  <CheckoutBtn>CHECKOUT</CheckoutBtn>
              </BtnContainer>

          </CartContainer>
    )
  }
}
