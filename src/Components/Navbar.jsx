import React, { Component } from "react";
import cart from "../Images/Cart.svg";
import brandIcon from "../Images/BrandIcon.svg";
import arrowImg from "../Images/ArrowCurrImg.svg";
import { NavbarDiv, Left, Center, Right, Category, Image, CurrencySign, ArrowImgUp, ArrowImgDown, Currency } from "../Style/NavbarStyle";
// Navigation Bar
export default class Navbar extends Component {
  render () {
    return (
            <NavbarDiv>
                <Left>
                    <Category onClick={() => this.props.setCategoryName("All")}>ALL</Category>
                    <Category onClick={() => this.props.setCategoryName("Clothes")}>CLOTHES</Category>
                    <Category onClick={() => this.props.setCategoryName("Tech")}>TECH</Category>
                </Left>
                <Center>
                    <Image onClick={() => this.props.setComponentToRender("products", this.props.productInfo)} src={brandIcon} />
                </Center>
                <Right>
                    <Currency onClick={() => this.props.setAreCurrenciesOpened()}>
                        <CurrencySign>{this.props.currency}</CurrencySign>
                        {this.props.areCurrenciesOpened ? <ArrowImgUp src={arrowImg} /> : <ArrowImgDown src={arrowImg} />}
                    </Currency>
                    <Image src={cart} onClick={() => this.props.setIsCartOpened()} />
                </Right>
            </NavbarDiv>
    );
  }
};
