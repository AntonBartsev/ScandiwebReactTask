import React, { Component } from "react";
import cart from "../Images/Cart.svg";
import brandIcon from "../Images/BrandIcon.svg";
import arrowImg from "../Images/ArrowCurrImg.svg";
import { NavbarDiv, Left, Center, Right, Category, Image, CurrencySign, ArrowImgUp, ArrowImgDown, Currency, CartCounterAndImg, Counter} from "../Style/NavbarStyle";
import Currencies from "./Currencies";

export default class Navbar extends Component {
    displayCurrencies = (areCurrenciesOpened) => {
        if (areCurrenciesOpened) {
            return <Currencies
                allCurrencies={this.props.allCurrencies}
                setChosenCurrency={this.props.setChosenCurrency}/>
        } else {
            return ''
        }
    }
    
    render() {
    return (
            <NavbarDiv>
                <Left >
                    <Category onClick={() => this.props.setChosenCategory("All")}>ALL</Category>
                    <Category onClick={() => this.props.setChosenCategory("Clothes")}>CLOTHES</Category>
                    <Category onClick={() => this.props.setChosenCategory("Tech")}>TECH</Category>
                </Left>
                <Center>
                    <Image onClick={() => this.props.setComponentToRender("products", this.props.productInfo)} src={brandIcon} />
                </Center>
                <Right>
                    <Currency onClick={() => this.props.setAreCurrenciesOpened()}>
                        <CurrencySign>{this.props.currency}</CurrencySign>
                        {this.props.areCurrenciesOpened ? <ArrowImgDown src={arrowImg} /> : <ArrowImgUp src={arrowImg} />}
                        {this.displayCurrencies(this.props.areCurrenciesOpened)}
                    </Currency>
                <CartCounterAndImg>
                    <Image src={cart} onClick={() => this.props.setIsCartOpened()} />
                    <Counter>{this.props.cartContent.length}</Counter>
                </CartCounterAndImg>
                </Right>
            </NavbarDiv>
    );
  }
};
