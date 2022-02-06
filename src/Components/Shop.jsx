import React, { PureComponent } from "react";
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
class Shop extends PureComponent {
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
        // All products available in the shop
        allProducts: [],
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
                    productsByCategory: result.data.categories[indexOfCategory].products,
                    allProducts: result.data.categories[0].products
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
        const chosenSpecs = [...this.state.chosenSpecs]
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
    
    // Set default specifications of the product and add it to the cart
    addItemWithDefaultSpecs = (product) => {
        const defaultSpecs = []
        if (product.attributes.length > 0) {
            for (let attribute of product.attributes) {
                const specDescription = `${attribute.name}:`
                const specName = attribute.items[0].value[0] === "#" ? ` ${attribute.items[0].displayValue}` : ` ${attribute.items[0].value}`
                defaultSpecs.push({specDescription, specName})
            } 
        } else { }
        // get item price to display on page
        const priceToDisplay = this.getProductPriceToDisplay(product)
        // get item price amount for calculations
        const priceAmount = this.getProductPriceAmount(product)
        // set default specifications of product when adding product to cart from the main page
        this.setProductParams(product.brand, product.name, priceToDisplay, product.gallery, product.id, priceAmount, defaultSpecs)
    }

    
    
    // Set needed parameters of the product to be added to cart
    setProductParams = (brand, name, priceToDisplay, img, id, priceAmount, specs) => {
        const {increaseItemCounter, addItemToCartContent} = this
        const cartContent  = [...this.state.cartContent]
        // Cart item information
        const cartItem = {
            id,
            itemCounter: 1,
            // Set information if the item has no specs
            specs: specs.length > 0 ? specs : ["No Specs"],
            brand,
            name,
            price: [priceToDisplay, priceAmount],
            lastChosenImgIndex: 0,
            img
        } 
        let index = null
        if (cartItem.specs[0] !== "No Specs") {
            // Check if there are items in cart
            if (cartContent.length > 0) {
                // Check cart for duplicates
                index = cartContent.findIndex(item => (item.specs.every((spec, i) => spec.specName === specs[i].specName)))
                // If duplicates were found, increase item counter
                if (index !== -1) {
                    increaseItemCounter(cartContent[index].price[1], index)
                // Otherwise add item to cart as new one 
                } else {
                    cartContent.push(cartItem)
                    addItemToCartContent(cartContent, cartItem)
                }
            // If the cart is empty, add new item
            } else {
                cartContent.push(cartItem)
                addItemToCartContent(cartContent, cartItem)
            }
        } else {
            if (cartContent.length > 0) {
                const duplIndx = cartContent.findIndex(item => item.id === id) 
                if (duplIndx !== -1) {
                    increaseItemCounter(cartContent[duplIndx].price[1], duplIndx)
                } else {
                    cartContent.push(cartItem)
                    addItemToCartContent(cartContent, cartItem)
                }
            } else {
                cartContent.push(cartItem)
                addItemToCartContent(cartContent, cartItem)  
            }   
        }
        // Clear chosen specifications as item was added to cart
        this.setState({
            chosenSpecs: []
        })
        }
    
    // Decrease item counter 
    decreaseItemCounter = (priceToAdjust, indexOfItemToRemove) => {
        const {componentToRender, totalPriceOfCart} = this.state
        const cartContent = [...this.state.cartContent]
        cartContent[indexOfItemToRemove].itemCounter -= 1
        if (cartContent[indexOfItemToRemove].itemCounter === 0) {
            cartContent.splice(indexOfItemToRemove, 1)
            // If there's no items in the bag, return user to the main paige
            if (componentToRender === "bag" && cartContent.length === 0) {
                this.setComponentToRender("products", this.props.productInfo)
            }   
        }
        this.setState({
            cartContent,
            totalPriceOfCart: totalPriceOfCart - priceToAdjust
        })
    }
    
    // Increase item counter 
    increaseItemCounter = (priceToAdd, indexOfItemToUpdate) => {
        const {totalPriceOfCart} = this.state
        const cartContent = [...this.state.cartContent]
        cartContent[indexOfItemToUpdate].itemCounter += 1
        this.setState({
            cartContent,
            totalPriceOfCart: totalPriceOfCart + priceToAdd
        })
    }

    // Update cart with new item
    addItemToCartContent = (updatedCartContent, newItem) => {
        const newTotalPriceOfCart = this.state.totalPriceOfCart + newItem.price[1]
        this.setState({
            cartContent: updatedCartContent,
            totalPriceOfCart: newTotalPriceOfCart
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
            isCartOpened: false,
            chosenSpecs: []
        })
    }
    
    // Update prices of items in cart if another currency was chosen
    updateCartPricesByCurrency = (currency) => {
        const {cartContent, allProducts} = this.state
        let amount = 0
        for (let cartItem of cartContent) {
            const product = allProducts.find(itemInProducts => itemInProducts.id === cartItem.id)    
            for (let price of product.prices) {
                if (price.currency.symbol === currency) {
                    amount = price.amount.toFixed(2)
                }
            } 
            cartItem.price[0] = currency + amount
            cartItem.price[1] = parseFloat(amount)       
        }
        this.setState({
            cartContent
        })
    }

    // Get price of item to be shown to user
    getProductPriceToDisplay = (product) => {
        const chosenCurrency = this.state.chosenCurrency
        let amount = 0
        for (let price of product.prices) {
            if (price.currency.symbol === chosenCurrency) {
                amount = price.amount.toFixed(2)
            } 
        }
        const price = chosenCurrency + amount
        return price
    }
    
    // Get price amount to use in calculations
    getProductPriceAmount = (product) => {
        let amount = 0
        for (let price of product.prices) {
            if (price.currency.symbol === this.state.chosenCurrency) {
                amount = price.amount.toFixed(2)
            }
        }
        return parseFloat(amount)
    }


    // Indicate if the cart is empty, and show items if cart contains at least one
    displayCart = (content, isCartOpened) => {
        const {cartContent, totalPriceOfCart, chosenCurrency, productInfo} = this.state
        const {setComponentToRender, decreaseItemCounter, increaseItemCounter, getProductPriceToDisplay, getProductPriceAmount} = this
        if (isCartOpened) {
            if (content.length === 0) {
                return <CartContainer>NO ITEMS FOUND IN CART</CartContainer>
            } else {
                return <Cart
                        cartContent={cartContent}
                        setComponentToRender={setComponentToRender}
                        totalPriceOfCart={totalPriceOfCart}
                        decreaseItemCounter={decreaseItemCounter}
                        increaseItemCounter={increaseItemCounter}
                        currency={chosenCurrency}
                        getProductPriceToDisplay={getProductPriceToDisplay}
                        getProductPriceAmount={getProductPriceAmount}
                        productInfo={productInfo} />
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
        const {cartContent, areCurrenciesOpened} = this.state
        const {updateCartPricesByCurrency, updateTotalPriceOfCart} = this
        if (cartContent.length > 0) {
            updateCartPricesByCurrency(currency)
            updateTotalPriceOfCart(cartContent)

        }
        this.setState({
            chosenCurrency: currency,
            areCurrenciesOpened: !areCurrenciesOpened,
            cartContent
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
        const {setComponentToRender, addItemToCartContent, setProductParams, 
            addItemWithDefaultSpecs, setSpecs, decreaseItemCounter, increaseItemCounter, getProductPriceToDisplay, getProductPriceAmount} = this
        if (componentToRender === "products") {
            return (
            <MainPageContainer>
                <CategoryContainer>
                    <CategoryName>{chosenCategory}</CategoryName>
                </CategoryContainer>
                <Products
                    products={productsByCategory}
                    currency={chosenCurrency}
                    setComponentToRender={setComponentToRender}
                    componentToRender={componentToRender}
                    getProductPriceToDisplay={getProductPriceToDisplay}
                    getProductPriceAmount={getProductPriceAmount}
                    setProductParams={setProductParams}
                    setSpecs={setSpecs}
                    addItemWithDefaultSpecs={addItemWithDefaultSpecs}
                    />
            </MainPageContainer>)
        } else if (componentToRender === "bag") {
            return <Bag
                cartContent={cartContent}
                productInfo={productInfo}
                getProductPriceToDisplay={getProductPriceToDisplay}
                getProductPriceAmount={getProductPriceAmount}
                decreaseItemCounter={decreaseItemCounter}
                increaseItemCounter={increaseItemCounter}
                currency={chosenCurrency} />
            
        } else {
            return (
                <ProductScreen
                    currency={chosenCurrency}
                    setCartContent={addItemToCartContent}
                    cartContent={cartContent}
                    increaseItemCounter={increaseItemCounter}
                    getProductPriceToDisplay={getProductPriceToDisplay}
                    getProductPriceAmount={getProductPriceAmount}
                    productInfo={productInfo}
                    setSpecs={setSpecs}
                    setProductParams={setProductParams}
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
        const {setComponentToRender, getCurrenciesData, setChosenCurrency, setAreCurrenciesOpened, setIsCartOpened, setChosenCategory, displayCart, renderMainPageComponent} = this
        return (
            <>
                <Navbar
                    setChosenCategory={setChosenCategory}
                    setComponentToRender={setComponentToRender}
                    getCurrenciesData={getCurrenciesData}
                    setAreCurrenciesOpened={setAreCurrenciesOpened}
                    setIsCartOpened={setIsCartOpened}
                    currency={chosenCurrency}
                    productInfo={productInfo}
                    areCurrenciesOpened={areCurrenciesOpened}
                    allCurrencies={allCurrencies}
                    setChosenCurrency={setChosenCurrency}
                    cartContent={cartContent}
                    chosenCategory={chosenCategory}
                    
                />
                {displayCart(cartContent, isCartOpened)}
                
                {renderMainPageComponent(componentToRender)} 
            </>
        )
    }
}

export default Shop