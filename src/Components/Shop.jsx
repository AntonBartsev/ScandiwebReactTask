import React, { Component } from "react";
import { client } from "../App";
import { gql } from "@apollo/client";
import Products from "./Products";
import ProductScreen from "./ProductScreen";
import Cart from "./Cart";
import Bag from "./Bag";
import Navbar from "./Navbar";
import { CategoryContainer, CategoryName, MainPageContainer } from "../Style/ShopStyle";
import { GET_CURRENCIES, GET_PRODUCTS } from "../GraphQL/Queries";
import { CartContainer } from "../Style/CartStyle"





class Shop extends Component {
    state = {
        areCurrenciesOpened: false,
        isCartOpened: false,
        chosenCurrency: "$",
        allCurrencies: [],
        chosenCategory: "All",
        productsByCategory: [],
        componentToRender: "products",
        productInfo: [],
        cartContent: [],
        totalPriceOfCart: 0,
        chosenSpecs: []
    }
    
    setChosenCategory = (chosenCategory) => {
        this.setState({
            chosenCategory
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
    
    updateTotalPriceOfCart = () => {
        let totalPriceOfCart = 0
        for (let cartItem of this.state.cartContent) {
            totalPriceOfCart += (cartItem.price[1] * cartItem.itemCounter)
        }
        this.setState({
            totalPriceOfCart
        })
    }
    
    setSpecs = (specDescription, specName, specIndex) => {
        const chosenSpecs = this.state.chosenSpecs
        if (chosenSpecs.length > 0) {
            const index = chosenSpecs.findIndex(specObj => specObj.specDescription === specDescription)
            if (index !== -1) {
                    chosenSpecs.splice(index, 1)
                    chosenSpecs.splice(index, 0, { specDescription, specName })
                    this.setState({
                        chosenSpecs
                })
            } else {
                    chosenSpecs.splice(specIndex, 0, { specDescription, specName })
                    this.setState({
                        chosenSpecs
                })
                }
        } else {
            chosenSpecs.splice(specIndex, 0, { specDescription, specName })
                this.setState({
                    chosenSpecs
                })
        }
    }
    
        setProductParams = (brand, name, price, img, id, priceAmount) => {
            const cartContent = this.state.cartContent
            const cartItem = {
                id,
                itemCounter: 1,
                specs: this.state.chosenSpecs,
                brand,
                name,
                price: [price, priceAmount],
                lastChosenImgIndex: 0,
                img
            }   
            let index = null
            if (cartContent.length > 0 && this.state.chosenSpecs.length > 0) {
                index = cartContent.findIndex(item => (item.specs.every((spec, i) => spec.specName === this.state.chosenSpecs[i].specName)))
                if (index !== -1) {
                    this.increaseItemCounter(cartContent[index].price[1], index)
                } else {
                    cartContent.push(cartItem)
                    this.addItemToCartContent(cartContent, cartItem)
                }
            } else {
                cartContent.push(cartItem)
                this.addItemToCartContent(cartContent, cartItem)
            }
            this.setState({
                chosenSpecs: []
            })
        }

    decreaseItemCounter = (priceToAdjust, indexOfItemToRemove) => {
        const cartContent = this.state.cartContent
        cartContent[indexOfItemToRemove].itemCounter -= 1
        if (cartContent[indexOfItemToRemove].itemCounter === 0) {
         cartContent.splice(indexOfItemToRemove, 1)
        }
        this.setState({
            cartContent,
            totalPriceOfCart: this.state.totalPriceOfCart - priceToAdjust
        })
    }
    
    increaseItemCounter = (priceToAdd, indexOfItemToUpdate) => {
        const cartContent = this.state.cartContent
        cartContent[indexOfItemToUpdate].itemCounter += 1
        this.setState({
            cartContent,
            totalPriceOfCart: this.state.totalPriceOfCart + priceToAdd
        })
    }

    addItemToCartContent = (updatedCartContent, newItem) => {
        this.setState({
            cartContent: updatedCartContent,
            totalPriceOfCart: this.state.totalPriceOfCart + newItem.price[1]
        })
    }

    setIsCartOpened = () => {
        this.setState({
            isCartOpened: !this.state.isCartOpened,
            areCurrenciesOpened: false
        })
    }
    

    setComponentToRender = (toRender, productInfo) => {
        this.setState({
            componentToRender: toRender,
            productInfo: productInfo,
            isCartOpened: false
        })
    }
    
    
    updateCartPricesByCurrency = (currency) => {
        let amount = 0
        for (let cartItem of this.state.cartContent) {
            const product = this.state.productsByCategory.find(itemInProducts => itemInProducts.id === cartItem.id)    
            for (let price of product.prices) {
                if (price.currency.symbol === currency) {
                    amount = price.amount
                }
            } 
            cartItem.price[0] = currency + amount.toFixed(0)
            cartItem.price[1] = parseInt(amount.toFixed(0))            
        }
        this.setState({
            cartContent: this.state.cartContent
        })
    }

    
    getProductPriceToDisplay = (product) => {
        let amount = 0
        for (let price of product.prices) {
            if (price.currency.symbol === this.state.chosenCurrency) {
                amount = price.amount
            }
        }
        const price = this.state.chosenCurrency + amount.toFixed(0);
        return price
    }
    
    getProductPriceAmount = (product) => {
        let amount = 0
        for (let price of product.prices) {
            if (price.currency.symbol === this.state.chosenCurrency) {
                amount = price.amount
            }
        }
        const price = amount.toFixed(0);
        return parseInt(price)
    }



    displayCart = (content, isCartOpened) => {
        if (isCartOpened) {
            if (content.length === 0) {
                return <CartContainer>NO ITEMS FOUND IN CART</CartContainer>
            } else {
                return <Cart
                        cartContent={this.state.cartContent}
                        setComponentToRender={this.setComponentToRender}
                        totalPriceOfCart={this.state.totalPriceOfCart}
                        decreaseItemCounter={this.decreaseItemCounter}
                        increaseItemCounter={this.increaseItemCounter}
                        currency={this.state.chosenCurrency}
                        getProductPriceToDisplay={this.getProductPriceToDisplay}
                        getProductPriceAmount={this.getProductPriceAmount}
                        productInfo={this.state.productInfo}/>
                        
            }
        } else {
            return ""
        }    
    }


    setAreCurrenciesOpened = () => {
        this.getCurrenciesData()
        this.setState({
            areCurrenciesOpened: !this.state.areCurrenciesOpened,
            isCartOpened: false
        })
    }


    setChosenCurrency = (currency) => {
        if (this.state.cartContent.length > 0) {
            this.updateCartPricesByCurrency(currency)
            this.updateTotalPriceOfCart(this.state.cartContent)

        }
        this.setState({
            chosenCurrency: currency,
            areCurrenciesOpened: !this.state.areCurrenciesOpened,
            cartContent: this.state.cartContent
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
    
    
    renderMainPageComponent = (componentToRender) => {
        const {chosenCategory: categoryName, productsByCategory: arrayByCategory, chosenCurrency, cartContent, productInfo, chosenSpecs} = this.state
        if (componentToRender === "products") {
            return (
            <MainPageContainer>
                <CategoryContainer>
                    <CategoryName>{categoryName}</CategoryName>
                </CategoryContainer>
                <Products
                    products={arrayByCategory}
                    currency={chosenCurrency}
                    setComponentToRender={this.setComponentToRender}
                    componentToRender={componentToRender}
                    getProductPriceToDisplay={this.getProductPriceToDisplay}
                    getProductPriceAmount={this.getProductPriceAmount}
                    setProductParams={this.setProductParams}
                    setSpecs={this.setSpecs} />
            </MainPageContainer>)
        } else if (componentToRender === "bag") {
            return <Bag
                cartContent={cartContent}
                productInfo={productInfo}
                getProductPriceToDisplay={this.getProductPriceToDisplay}
                getProductPriceAmount={this.getProductPriceAmount}
                decreaseItemCounter={this.decreaseItemCounter}
                increaseItemCounter={this.increaseItemCounter}
                currency={chosenCurrency} />
            
        } else {
            return (
                <ProductScreen
                    currency={chosenCurrency}
                    setCartContent={this.addItemToCartContent}
                    cartContent={cartContent}
                    increaseItemCounter={this.increaseItemCounter}
                    getProductPriceToDisplay={this.getProductPriceToDisplay}
                    getProductPriceAmount={this.getProductPriceAmount}
                    productInfo={productInfo}
                    setSpecs={this.setSpecs}
                    setProductParams={this.setProductParams}
                    chosenSpecs={chosenSpecs}                />)
        }
    }
    
    

    componentDidMount() {
        this.updateProductsByCategory()
        this.getCurrenciesData()
    }


    render() {
        const {componentToRender, chosenCurrency, productInfo, cartContent, isCartOpened, areCurrenciesOpened, allCurrencies, chosenCategory } = this.state
        return (
            <>
                <Navbar
                    setChosenCategory={this.setChosenCategory}
                    setComponentToRender={this.setComponentToRender}
                    getCurrenciesData={this.getCurrenciesData}
                    setAreCurrenciesOpened={this.setAreCurrenciesOpened}
                    setIsCartOpened={this.setIsCartOpened}
                    currency={chosenCurrency}
                    productInfo={productInfo}
                    areCurrenciesOpened={areCurrenciesOpened}
                    allCurrencies={allCurrencies}
                    setChosenCurrency={this.setChosenCurrency}
                    cartContent={cartContent}
                    chosenCategory={chosenCategory}
                    
                />
                {this.displayCart(cartContent, isCartOpened)}
                
                {this.renderMainPageComponent(componentToRender)} 
            </>
        )
    }
}

export default Shop