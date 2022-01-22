import React, { Component } from 'react'
import cart from '../Images/Cart.svg'
import brandIcon from '../Images/BrandIcon.svg'
import arrowUp from '../Images/ArrowUp.svg'
import arrowDown from '../Images/ArrowDown.svg'
import { NavbarDiv, Left, Center, Right, Category, Image, CurrencySign, ArrowImg, Currency } from '../Style/NavbarStyle'


// Navigation Bar
export default class Navbar extends Component {
    // arrowDirection - direction of the arrow icon near the currency icon
    // signalizes whether app should show all currencies available
    // chosenCurrency - signalizes chosen currency to determine prices of products
     state = {
            arrowDirection: arrowDown,
            chosenCurrency: '$'
        }

    // Set arrow direction when currency symbol is clicked to see available currencies
    setArrowDirection = () => {
        // Get currencies available from the server
        this.props.getCurrenciesData()
        // Set opposite arrow direction
        this.setState({
            arrowDirection: this.state.arrowDirection === arrowDown ? arrowUp : arrowDown
        })
        // Pass information whether currencies should be rendered according to the arrow direction
        if (this.state.arrowDirection === arrowDown) {
            this.props.setAreCurrenciesOpened(true)
        } else {
            this.props.setAreCurrenciesOpened(false)
        }
    }
    
    render() {
        return (
            <NavbarDiv>
                <Left>
                    <Category onClick={() => this.props.setCategoryName("All")}>ALL</Category>
                    <Category onClick={() => this.props.setCategoryName("Clothes")}>CLOTHES</Category>
                    <Category onClick={() => this.props.setCategoryName("Tech")}>TECH</Category>
                </Left>
                <Center>
                    <Image onClick={() => this.props.setComponentToRender("products", "")} src={brandIcon} />
                </Center>
                <Right>
                    <Currency onClick={() => this.setArrowDirection()}>
                        <CurrencySign>{this.state.chosenCurrency}</CurrencySign>
                        <ArrowImg src={this.state.arrowDirection} />
                    </Currency>
                    <Image src={cart} onClick={() => this.props.setIsCartOpened()} />
                </Right>
            </NavbarDiv>
        )
    }
}