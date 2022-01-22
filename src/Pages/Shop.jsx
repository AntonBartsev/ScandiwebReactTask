import React, {Component} from 'react'
import Currencies from '../Components/Currencies'
import styled from 'styled-components'
import arrowDown from '../Images/ArrowDown.svg'
import { GET_CURRENCIES, GET_PRODUCTS } from '../GraphQL/Queries'
import { client } from '../App'
import Products from '../Components/Products'
import { gql } from '@apollo/client'
import ProductScreen from '../Components/ProductScreen'
import Cart from '../Components/Cart'
import Bag from '../Components/Bag'
import Navbar from '../Components/Navbar'


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



class Shop extends Component {
    state = {
        areCurrenciesOpened: false,
        isCartOpened: false,
        allCurrencies: [],
        categoryName: "All",
        arrayByCategory: [],
        componentToRender: "products",
        productId: "",
        productInfo: [],
        productInfoPrice: null,
        cartContent: [],
        newProduct: {}
    }
    
    setCategoryName = (chosenCategory) => {
        this.setState({
            categoryName: chosenCategory
        })
        this.updateProductsByCategory(chosenCategory)
        this.setComponentToRender("products", "")
    }

    updateProductsByCategory(chosenCategory) {
        client.query({ query: gql`${GET_PRODUCTS}` })
            .then(result => {
            const indexOfCategory = chosenCategory === "Tech" ? 2 : (chosenCategory === "Clothes" ? 1 : 0)
            this.setState({
                arrayByCategory: result.data.categories[indexOfCategory].products
            })
        })

    }


    setCartContent = (info, indexOfItemToUpdate) => {
        const cartContent = this.state.cartContent 
        if (indexOfItemToUpdate !== null) {
            cartContent[indexOfItemToUpdate].itemCounter = cartContent[indexOfItemToUpdate].itemCounter + 1
        } else {
            cartContent.push(info)
        }
        this.setState({
            cartContent
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




    displayCart = (content, isCartOpened) => isCartOpened
        ? (content.length === 0
            ? <div>NO ITEMS FOUND IN CART</div>
            : <Cart cartContent={this.state.cartContent}
                    newProduct={this.state.newProduct}
                setComponentToRender={this.setComponentToRender}
            />)
        : ''

    setAreCurrenciesOpened = (areCurrenciesOpened) => {
        this.setState({
        areCurrenciesOpened
        })
    }



    displayCurrencies = (areCurrenciesOpened) => {
        if (!areCurrenciesOpened) {
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
    
        getCurrenciesData = () => {
        client
            .query({ query: gql`${GET_CURRENCIES}` })
            .then(result => this.setState({
                allCurrencies: result.data.currencies
            })
        )
    }

    componentDidMount() {
        this.updateProductsByCategory()
        this.getCurrenciesData()
    }


    render() {
        const { componentToRender, chosenCurrency, productId, productInfo,
            cartContent, productInfoPrice, isCartOpened, categoryName, arrayByCategory } = this.state
        return (
            <>
                <Navbar
                    setCategoryName={this.setCategoryName}
                    setComponentToRender={this.setComponentToRender}
                    getCurrenciesData={this.getCurrenciesData}
                    setAreCurrenciesOpened={this.setAreCurrenciesOpened}
                    setIsCartOpened={this.setIsCartOpened}
                />
                {this.displayCurrencies(this.state.areCurrenciesOpened)}
                {this.displayCart(cartContent, isCartOpened)}
                
                {componentToRender === "products" ?
                    <CategoryContainer>
                        <CategoryName>{categoryName}</CategoryName>
                    </CategoryContainer>
                    : ''}

                {componentToRender === "products" && productId === ""
                    ?
                    <Products
                        products={arrayByCategory}
                        currency={chosenCurrency ? chosenCurrency : '$'}
                        setComponentToRender={this.setComponentToRender}
                        componentToRender={componentToRender}
                    />
                    : (componentToRender === "bag"
                        ?
                        <Bag content={cartContent} productInfo={productInfo} />
                        :
                        <ProductScreen
                            id={productId}
                            productInfo={productInfo}
                            currency={chosenCurrency}
                            price={productInfoPrice}
                            setCartContent={this.setCartContent}
                            cartContent={cartContent}
                        />)}

            </>
        )
    }
}

export default Shop