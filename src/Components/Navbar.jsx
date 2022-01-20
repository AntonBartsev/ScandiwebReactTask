import React, { Component } from 'react'
import Currencies from './Currencies'
import styled from 'styled-components'
import arrowDown from '../Images/ArrowDown.svg'
import cart from '../Images/Cart.svg'
import brandIcon from '../Images/BrandIcon.svg'
import arrowUp from '../Images/ArrowUp.svg'
import { GET_CURRENCIES, GET_PRODUCTS } from '../GraphQL/Queries'
import { client } from '../App'
import Products from './Products'
import { gql } from '@apollo/client'
import ProductScreen from './ProductScreen'
import Cart from './Cart'
import Bag from './Bag'

const NavbarDiv = styled.div`
    display: grid;
    padding-top: 20px;
    padding-bottom: 20px;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    grid-auto-columns: 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
}
`

const Left = styled.div`
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
`




const Category = styled.span`
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-right: 24px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    line-height: 19.2px;
    text-transform: uppercase;
    cursor: pointer;
}
`



const Center = styled.div`
flex: 1;
text-align: center;
`

const Right = styled.div`
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: end;
-webkit-justify-content: flex-end;
-ms-flex-pack: end;
justify-content: flex-end;
-webkit-box-align: center;
-webkit-align-items: center;
-ms-flex-align: center;
align-items: center;
`
const Image = styled.img`
    border: 0;
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;
`
const CurrencySign = styled.p`
font-family: Raleway;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 29px;
letter-spacing: 0em;
text-align: left;
cursor: pointer;
`

const ArrowImg = styled.img`
    width: 8px;
    margin-left: 6px;
    cursor: pointer;
`
const Currency = styled.div`
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-right: 24px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    font-size: 18px;
    text-transform: uppercase;
`
const CategoryContainer = styled.div`
display: flex;
justify-content: space-between;
`
const CategoryName = styled.div`
cursor: pointer;
font-style: normal;
font-weight: 400;
font-size: 42px;
`



class Navbar extends Component {
    state = {
        arrowDirection: arrowDown,
        chosenCurrency: '$',
        allCurrencies: [],
        categoryName: "All",
        arrayByCategory: [],
        componentToRender: "products",
        productId: "",
        productInfo: [],
        productInfoPrice: null,
        cartContent: [],
        newProduct: {},
        isCartOpened: false
    }




    setCategoryName = (chosenCategory) => {
        this.setState({
            categoryName: chosenCategory
        })
        this.getData(chosenCategory)
    }

    getData(chosenCategory) {
        client.query({
            query: gql`
      ${GET_PRODUCTS}
    `
        }).then(result => {
            const indexOfCategory = chosenCategory === "Tech" ? 2 : chosenCategory === "Clothes" ? 1 : 0
            this.setState({
                arrayByCategory: result.data.categories[indexOfCategory].products
            })
        })

    }


    setCartContent = (info) => {
        let cartContent = this.state.cartContent
        cartContent.push(info)
        this.setState({
            cartContent: cartContent,
            newproduct: info
        })
    }

    setIsCartOpened = () => {
        this.setState({
            isCartOpened: !this.state.isCartOpened
        })
    }

    setComponentToRender = (toRender, productId, productInfo, price) => {
        this.setState({
            componentToRender: toRender,
            productId: productId,
            productInfo: productInfo,
            productInfoPrice: price
        })
    }

    setArrowDirection = () => {
        this.getCurrenciesData()
        this.setState({
            arrowDirection: this.state.arrowDirection === arrowDown ? arrowUp : arrowDown
        })
        if (this.state.arrowDirection === arrowDown) {
            this.displayCurrencies(arrowUp)
        } else {
            this.displayCurrencies(arrowDown)
        }
    }

    getCurrenciesData = () => {
        client
            .query({ query: gql`${GET_CURRENCIES}` })
            .then(result => this.setState({
                allCurrencies: result.data.currencies
            })
        )
    }

    displayCart = (content, isCartOpened) => isCartOpened
        ? (content.length === 0
            ? <div>NO ITEMS FOUND IN CART</div>
            : <Cart cartContent={this.state.cartContent}
                    newProduct={this.state.newProduct}
                setComponentToRender={this.setComponentToRender}
            />)
        : ''





    displayCurrencies = (arrowDirection) => {
        if (arrowDirection === arrowDown) {
            return ''
        } else {
            return <Currencies setCurrency={this.setChosenCurrency}
                allCurrencies={this.state.allCurrencies}>
            </Currencies>
        }
    }

    setChosenCurrency = (currency) => {
        this.setState({
            chosenCurrency: currency
        })
    }

    componentDidMount() {
        this.getData()
        this.getCurrenciesData()
    }


    render() {
        const { componentToRender, chosenCurrency, productId, productInfo,
            cartContent, arrowDirection, productInfoPrice, isCartOpened, categoryName, arrayByCategory } = this.state
        return (
            <>
                <NavbarDiv>
                    <Left>
                        <Category onClick={() => this.setCategoryName("All")}>ALL</Category>
                        <Category onClick={() => this.setCategoryName("Clothes")}>CLOTHES</Category>
                        <Category onClick={() => this.setCategoryName("Tech")}>TECH</Category>
                    </Left>
                    <Center>
                        <Image onClick={() => this.setComponentToRender("products", "")} src={brandIcon} />
                    </Center>
                    <Right>
                        <Currency onClick={() => this.setArrowDirection()}>
                            <CurrencySign>{chosenCurrency}</CurrencySign>
                            <ArrowImg src={arrowDirection} />
                        </Currency>
                        <Image src={cart} onClick={() => this.setIsCartOpened()} />
                    </Right>
                    {this.displayCart(cartContent, isCartOpened)}
                </NavbarDiv>
                {this.displayCurrencies(arrowDirection)}
                {componentToRender === "products" ?
                    <CategoryContainer>
                        <CategoryName>{categoryName}</CategoryName>
                    </CategoryContainer>
                    : ''}

                {componentToRender === "products" && productId === ""
                    ?
                    <Products
                        products={arrayByCategory}
                        currency={chosenCurrency}
                        setComponentToRender={this.setComponentToRender}
                        componentToRender={componentToRender}
                    />
                    : componentToRender === "bag"
                        ?
                        <Bag content={cartContent} productInfo={productInfo} />
                        :
                        <ProductScreen
                            id={productId}
                            productInfo={productInfo}
                            currency={chosenCurrency}
                            price={productInfoPrice}
                            setCartContent={this.setCartContent}
                        />}

            </>
        )
    }
}

export default Navbar;
