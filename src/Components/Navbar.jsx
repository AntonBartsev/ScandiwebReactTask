import React, { PureComponent } from "react";
import cart from "../Images/Cart.svg";
import brandIcon from "../Images/BrandIcon.svg";
import arrowImg from "../Images/ArrowCurrImg.svg";
import { NavbarDiv, Left, Center, Right, Category, Image, CurrencySign, ArrowImgUp, ArrowImgDown, Currency, CartCounterAndImg, Counter} from "../Style/NavbarStyle";
import Currencies from "./Currencies";
import PropTypes from "prop-types";

// Navigational bar of the shop
export default class Navbar extends PureComponent {

    static propTypes = {
        allCurrencies: PropTypes.array,
        setChosenCurrency: PropTypes.func,
        chosenCategory: PropTypes.string,
        setChosenCategory: PropTypes.func,
        setComponentToRender: PropTypes.func,
        productInfo: PropTypes.object,
        setAreCurrenciesOpened: PropTypes.func,
        currency: PropTypes.string,
        areCurrenciesOpened: PropTypes.bool,
        setIsCartOpened: PropTypes.func,
        cartContent: PropTypes.array
    }

    // display currencies window
    displayCurrencies = (areCurrenciesOpened) => {
        const {allCurrencies, setChosenCurrency} = this.props
        if (areCurrenciesOpened) {
            return <Currencies
                allCurrencies={allCurrencies}
                setChosenCurrency={setChosenCurrency}/>
        } else {
            return ''
        }
    }
    
    render() {
        const {chosenCategory, setChosenCategory, setComponentToRender, productInfo, 
            setAreCurrenciesOpened, currency, areCurrenciesOpened, setIsCartOpened, cartContent} = this.props
        return (
            <NavbarDiv>
            <Left >
                    <Category isCategoryActive={chosenCategory === "All"} onClick={() => setChosenCategory("All")}>ALL</Category>
                    <Category isCategoryActive={chosenCategory === "Clothes"} onClick={() => setChosenCategory("Clothes")}>CLOTHES</Category>
                    <Category isCategoryActive={chosenCategory === "Tech"} onClick={() => setChosenCategory("Tech")}>TECH</Category>
                </Left>
                <Center>
                    <Image onClick={() => setComponentToRender("products", productInfo)} src={brandIcon} />
            </Center>  
                <Right>
                    <Currency onClick={() => setAreCurrenciesOpened()}>
                        <CurrencySign>{currency}</CurrencySign>
                        {areCurrenciesOpened ? <ArrowImgDown src={arrowImg} /> : <ArrowImgUp src={arrowImg} />}
                        {this.displayCurrencies(areCurrenciesOpened)}
                    </Currency>
                <CartCounterAndImg onClick={() => setIsCartOpened()}>
                    <Image src={cart} />
                    {cartContent.length > 0 ? <Counter>{cartContent.length}</Counter> : ''}
                </CartCounterAndImg>
                </Right>
            </NavbarDiv>
    )}
}
