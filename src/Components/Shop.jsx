import React, { Component } from "react";
import { client } from "../App";
import { gql, throwServerError } from "@apollo/client";
import Products from "./Products";
import ProductScreen from "./ProductScreen";
import Cart from "./Cart";
import Bag from "./Bag";
import Navbar from "./Navbar";
import Currencies from "./Currencies";
import { CategoryContainer, CategoryName } from "../Style/ShopStyle";
import { GET_CURRENCIES, GET_PRODUCTS } from "../GraphQL/Queries";





class Shop extends Component {
    state = {
        areCurrenciesOpened: false,
        isCartOpened: false,
        // chosenCurrency - signalizes chosen currency to determine prices of products
        chosenCurrency: "$",
        allCurrencies: [],
        categoryName: "All",
        arrayByCategory: [],
        componentToRender: "products",
        productInfo: [],
        cartContent: [],
        totalPriceOfCart: 0,
        chosenSpecs: []
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
    
    updateTotalPriceOfCart = (productInfo, cartContent, currency) => {
        const newPrice = this.setProductPrice(productInfo, currency)
        let totalPriceOfCart = 0
        for (let cartItem of cartContent) {
            cartItem.price[1] = newPrice[1].toFixed(0)
            totalPriceOfCart += (cartItem.price[1] * cartItem.itemCounter)
        }
        this.setState({
            cartContent,
            totalPriceOfCart
        })
    }
    
    
    
    setSpecs = (specDescription, specName) => {
        const chosenSpecs = this.state.chosenSpecs
        if (chosenSpecs.length > 0) {
            const index = chosenSpecs.findIndex(specObj => specObj.specDescription === specDescription)
            if (index !== -1) {
                    chosenSpecs.splice(index, 1)
                    chosenSpecs.push({ specDescription, specName })
                    this.setState({
                        chosenSpecs
                })
            } else {
                    chosenSpecs.push({ specDescription, specName })
                    this.setState({
                        chosenSpecs
                })
                }
        } else {
            chosenSpecs.push({ specDescription, specName })
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
                img
            }   
            let index = null
            if (cartContent.length > 0) {
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
            isCartOpened: !this.state.isCartOpened
        })
    }
    

    setComponentToRender = (toRender, productInfo) => {
        this.setState({
            componentToRender: toRender,
            productInfo: productInfo,
            isCartOpened: false
        })
    }
    

    
    setProductPrice = (product, currency) => {
        let amount = 0
        for (let price of product.prices) {
            if (price.currency.symbol === currency) {
                amount = price.amount
            }
        }
        const price = currency + amount.toFixed(0);
        return [price, amount]
    }



    displayCart = (content, isCartOpened) => {
        if (isCartOpened) {
            if (content.length === 0) {
                return <div>NO ITEMS FOUND IN CART</div>
            } else {
                return <Cart
                        cartContent={this.state.cartContent}
                        setComponentToRender={this.setComponentToRender}
                        totalPriceOfCart={this.state.totalPriceOfCart}
                        decreaseItemCounter={this.decreaseItemCounter}
                        increaseItemCounter={this.increaseItemCounter}
                        currency={this.state.chosenCurrency}
                        setProductPrice={this.setProductPrice}
                        productInfo={this.state.productInfo} />
            }
        } else {
            return ""
        }    
    }


    setAreCurrenciesOpened = () => {
        this.getCurrenciesData()
        this.setState({
            areCurrenciesOpened: !this.state.areCurrenciesOpened
        })
    }



    displayCurrencies = (areCurrenciesOpened) => {
        if (areCurrenciesOpened) {
            return <Currencies
                setCurrency={this.setChosenCurrency}
                allCurrencies={this.state.allCurrencies}/>
        } else {
            return ''
        }
    }

    setChosenCurrency = (currency) => {
        if (this.state.cartContent.length > 0) {
            this.updateTotalPriceOfCart(this.state.productInfo, this.state.cartContent, currency)
        }
        this.setState({
            chosenCurrency: currency,
            areCurrenciesOpened: !this.state.areCurrenciesOpened
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
        const {categoryName, arrayByCategory, chosenCurrency, cartContent, productInfo} = this.state
        if (componentToRender === "products") {
            return (
            <>
                <CategoryContainer>
                    <CategoryName>{categoryName}</CategoryName>
                </CategoryContainer>
                <Products
                    products={arrayByCategory}
                    currency={chosenCurrency}
                    setComponentToRender={this.setComponentToRender}
                    componentToRender={componentToRender}
                    setProductPrice={this.setProductPrice}
                    setProductParams={this.setProductParams} />
            </>)
        } else if (componentToRender === "bag") {
            return <Bag
                cartContent={cartContent}
                productInfo={productInfo}
                setProductPrice={this.setProductPrice}
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
                    setProductPrice={this.setProductPrice}
                    productInfo={productInfo}
                    setSpecs={this.setSpecs}
                    setProductParams={this.setProductParams}/>)
        }
    }
    
    

    componentDidMount() {
        this.updateProductsByCategory()
        this.getCurrenciesData()
    }


    render() {
        const {componentToRender, chosenCurrency, productInfo, cartContent, isCartOpened, areCurrenciesOpened } = this.state
        return (
            <>
                <Navbar
                    setCategoryName={this.setCategoryName}
                    setComponentToRender={this.setComponentToRender}
                    getCurrenciesData={this.getCurrenciesData}
                    setAreCurrenciesOpened={this.setAreCurrenciesOpened}
                    setIsCartOpened={this.setIsCartOpened}
                    currency={chosenCurrency}
                    productInfo={productInfo}
                    areCurrenciesOpened={areCurrenciesOpened}
                />
                {this.displayCurrencies(this.state.areCurrenciesOpened)}
                {this.displayCart(cartContent, isCartOpened)}
                
                {this.renderMainPageComponent(componentToRender)} 
            </>
        )
    }
}

export default Shop