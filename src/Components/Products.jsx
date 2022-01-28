import React, { Component } from "react";
import { Container, ProductContainer, ProductContainerOutOfStock, Name, Price, Img, TextOutOfStock, CartIcon } from "../Style/ProductsStyle";
import GreenCartIcon from "../Images/GreenCartIcon.svg";
import { productInfoRequest } from "../GraphQL/Queries";
import { client } from "../App";
import { gql } from "@apollo/client";

// Main page with products
export default class Products extends Component {
    // Get products information by product's id
    getProductInfo = (id) => {
        if (id !== "") {
            client.query({ query: gql`${productInfoRequest(id)}` })
                .then(result => {
                    this.props.setComponentToRender("productScreen", result.data.product)
                })
        } else
            return
    }
    // Set item's specifications when adding to cart from the main page
    setItemSpecsAndParams = (prod) => {
        // get item price to display on page
        const priceToDisplay = this.props.getProductPriceToDisplay(prod)
        // get item price amount for calculations
        const priceAmount = this.props.getProductPriceAmount(prod)
        // set default specifications of product when adding product to cart from the main page
        this.props.setDefaultSpecs(prod)
        this.props.setProductParams(prod.brand, prod.name, priceToDisplay, prod.gallery, prod.id, priceAmount)
    }
    
    
    render() {
        return (
            <Container>
                {this.props.products.map(prod => {
                    const priceToDisplay = this.props.getProductPriceToDisplay(prod)
                    if (prod.inStock) {
                        return <ProductContainer
                            key={prod.id}>
                                <Img onClick={() => this.getProductInfo(prod.id)} src={prod.gallery[0]} />
                                <CartIcon onClick={ () => this.setItemSpecsAndParams(prod) } src={GreenCartIcon} />
                                    <Name onClick={() => this.getProductInfo(prod.id)}>
                                        {prod.name}
                                    </Name>
                                    <Price onClick={() => this.getProductInfo(prod.id)}> 
                                        {priceToDisplay}
                                    </Price>
                                </ProductContainer>
                    } else {
                        return <ProductContainerOutOfStock key={prod.id} onClick={() => this.getProductInfo(prod.id)}>
                            <Img src={prod.gallery[0]} />
                            <TextOutOfStock>OUT OF STOCK</TextOutOfStock>
                            <Name>
                                {prod.name}
                            </Name>
                            <Price>
                                {priceToDisplay}
                            </Price>
                        </ProductContainerOutOfStock>
                    }
                })}
            </Container>
        )}
}
