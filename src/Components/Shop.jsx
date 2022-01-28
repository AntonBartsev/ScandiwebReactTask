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
import { CartContainer } from "../Style/CartStyle";

// Controls render of elements and serves as global state
class Shop extends Component {
    state = {
        // Indicates whether currencies window is opened or closed
        areCurrenciesOpened: false,
        // Indicates whether cart window is opened or closed
        isCartOpened: false,
        // Sets currency by which prices should be determined
        chosenCurrency: "$",
        // Stores all currencies available in the shop
        allCurrencies: [],
        // Shows currently chosen category by which products displayed should be determined
        chosenCategory: "All",
        // Stores products determined by chosen category
        productsByCategory: [],
        // Indicates which screen should be shown to user
        componentToRender: "products",
        // Information about the product which product screen is to be shown
        productInfo: [],
        // Content of the cart
        cartContent: [],
        // Total price of all the cart items
        totalPriceOfCart: 0,
        // Chosen specifications of certain product 
        chosenSpecs: []
    }
    // Set category by which products are displayed
    setChosenCategory = (chosenCategory) => {
        this.setState({
            chosenCategory
        })
        this.updateProductsByCategory(chosenCategory)
        this.setComponentToRender("products", "")
    }
    // Update products determined by current category
    updateProductsByCategory(chosenCategory) {
        client.query({ query: gql`${GET_PRODUCTS}` })
            .then(result => {
                // Set index of array with products from fetched data
                const indexOfCategory = chosenCategory === "Tech" ? 2 : (chosenCategory === "Clothes" ? 1 : 0)
                this.setState({
                    productsByCategory: result.data.categories[indexOfCategory].products
                })
            })
    }
    
    // Update total price of cart with current product prices
    updateTotalPriceOfCart = () => {
        let totalPriceOfCart = 0
        for (let cartItem of this.state.cartContent) {
            totalPriceOfCart += (cartItem.price[1] * cartItem.itemCounter)
        }
        this.setState({
            totalPriceOfCart
        })
    }
    
    // Set chosen specifications of the product
    setSpecs = (specDescription, specName, specIndex) => {
        const chosenSpecs = this.state.chosenSpecs
        if (chosenSpecs.length > 0) {
            // Check whether specifications were already chosen
            const index = chosenSpecs.findIndex(specObj => specObj.specDescription === specDescription)
            // If specifications are changed, remove specification and update information
            if (index !== -1) {
                    chosenSpecs.splice(index, 1)
                    chosenSpecs.splice(specIndex, 0, { specDescription, specName })
                    this.setState({
                        chosenSpecs
                })
            // If there's new specification, insert that at the specific index to the array
            } else {
                    chosenSpecs.splice(specIndex, 0, { specDescription, specName })
                    this.setState({
                        chosenSpecs
                })
            }
        // if no specifications are chosen yet, insert new specification at the specific index
        } else {
            chosenSpecs.splice(specIndex, 0, { specDescription, specName })
                this.setState({
                    chosenSpecs
                })
        }
    }
    
    // Set default specifications of the product
    setDefaultSpecs = (product) => {
        for (let attribute of product.attributes) {
            if (product.attributes.length > 0) {
                const specDescription = `${attribute.name}:`
                const specName = attribute.items[0].value[0] === "#" ? ` ${attribute.items[0].displayValue}` : ` ${attribute.items[0].value}`
                const indexOfSpecDescription = product.attributes.findIndex(attr => `${attr.name}:` === specDescription)
                this.setSpecs( specDescription, specName, indexOfSpecDescription)
            } else { }
        }
    }
    
    // Set needed parameters of the product to be added to cart
    setProductParams = (brand, name, price, img, id, priceAmount) => {
        const cartContent = this.state.cartContent
        // Cart item information
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
        // Check if there are items in cart
        if (cartContent.length > 0 && this.state.chosenSpecs.length > 0) {
            // Check cart for duplicates
            index = cartContent.findIndex(item => (item.specs.every((spec, i) => spec.specName === this.state.chosenSpecs[i].specName)))
            // If duplicates were found, increase item counter
            if (index !== -1) {
                this.increaseItemCounter(cartContent[index].price[1], index)
            // Otherwise add item to cart as new one 
            } else {
                cartContent.push(cartItem)
                this.addItemToCartContent(cartContent, cartItem)
            }
        // If the cart is empty, add new item
        } else {
            cartContent.push(cartItem)
            this.addItemToCartContent(cartContent, cartItem)
        }
        // Clear chosen specifications as item was added to cart
        this.setState({
            chosenSpecs: []
        })
        }
    
    // Decrease item counter 
    decreaseItemCounter = (priceToAdjust, indexOfItemToRemove) => {
        const cartContent = this.state.cartContent
        cartContent[indexOfItemToRemove].itemCounter -= 1
        if (cartContent[indexOfItemToRemove].itemCounter === 0) {
            cartContent.splice(indexOfItemToRemove, 1)
            // If there's no items in the bag, return user to the main paige
            if (this.state.componentToRender === "bag" && this.state.cartContent.length === 0) {
                this.setComponentToRender("products", this.props.productInfo)
            }   
        }
        this.setState({
            cartContent,
            totalPriceOfCart: this.state.totalPriceOfCart - priceToAdjust
        })
    }
    
    // Increase item counter 
    increaseItemCounter = (priceToAdd, indexOfItemToUpdate) => {
        const cartContent = this.state.cartContent
        cartContent[indexOfItemToUpdate].itemCounter += 1
        this.setState({
            cartContent,
            totalPriceOfCart: this.state.totalPriceOfCart + priceToAdd
        })
    }

    // Update cart with new item
    addItemToCartContent = (updatedCartContent, newItem) => {
        this.setState({
            cartContent: updatedCartContent,
            totalPriceOfCart: this.state.totalPriceOfCart + newItem.price[1]
        })
    }

    // Update information about the cart visibility
    setIsCartOpened = () => {
        this.setState({
            isCartOpened: !this.state.isCartOpened,
            areCurrenciesOpened: false
        })
    }
    
    // Set page to be displayed
    setComponentToRender = (toRender, productInfo) => {
        this.setState({
            componentToRender: toRender,
            productInfo: productInfo,
            isCartOpened: false
        })
    }
    
    // Update prices of items in cart if another currency was chosen
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

    // Get price of item to be shown to user
    getProductPriceToDisplay = (product) => {
        let amount = 0
        for (let price of product.prices) {
            if (price.currency.symbol === this.state.chosenCurrency) {
                amount = price.amount
            }
        }
        const price = this.state.chosenCurrency + amount.toFixed(0)
        return price
    }
    
    // Get price amount to use in calculations
    getProductPriceAmount = (product) => {
        let amount = 0
        for (let price of product.prices) {
            if (price.currency.symbol === this.state.chosenCurrency) {
                amount = price.amount
            }
        }
        const price = amount.toFixed(0)
        return parseInt(price)
    }


    // Indicate if the cart is empty, and show items if cart contains at least one
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
                        productInfo={this.state.productInfo} />
            }
        } else {
            return ""
        }    
    }

    // Set visibility of currencies window
    setAreCurrenciesOpened = () => {
        this.getCurrenciesData()
        this.setState({
            areCurrenciesOpened: !this.state.areCurrenciesOpened,
            isCartOpened: false
        })
    }

    // Set currently chosen currency
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
    
    // Get all the available currencies from the server
    getCurrenciesData = () => {
        client
            .query({ query: gql`${GET_CURRENCIES}` })
            .then(result => this.setState({
                allCurrencies: result.data.currencies
                })
        )
    }
    
    // Render page according to the currently set component to render
    renderMainPageComponent = (componentToRender) => {
        const {chosenCategory, productsByCategory, chosenCurrency, cartContent, productInfo, chosenSpecs} = this.state
        if (componentToRender === "products") {
            return (
            <MainPageContainer>
                <CategoryContainer>
                    <CategoryName>{chosenCategory}</CategoryName>
                </CategoryContainer>
                <Products
                    products={productsByCategory}
                    currency={chosenCurrency}
                    setComponentToRender={this.setComponentToRender}
                    componentToRender={componentToRender}
                    getProductPriceToDisplay={this.getProductPriceToDisplay}
                    getProductPriceAmount={this.getProductPriceAmount}
                    setProductParams={this.setProductParams}
                    setSpecs={this.setSpecs}
                    setDefaultSpecs={this.setDefaultSpecs}/>
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
                    chosenSpecs={chosenSpecs}
                />)
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