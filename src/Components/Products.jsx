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
        const priceToDisplay = this.props.getProductPriceToDisplay(prod)
        const priceAmount = this.props.getProductPriceAmount(prod)
        for (let attribute of prod.attributes) {
            if (prod.attributes.length > 0) {
                const specDescription = `${attribute.name}:`
                const specName = attribute.items[0].value[0] === "#" ? ` ${attribute.items[0].displayValue}` : ` ${attribute.items[0].value}`
                const indexOfSpecDescription = prod.attributes.findIndex(attr => `${attr.name}:` === specDescription)
                this.props.setSpecs(specDescription, specName, indexOfSpecDescription)
                
            } else { }
        }
     this.props.setProductParams(prod.brand, prod.name, priceToDisplay, prod.gallery, prod.id, priceAmount)
    }
    
    
    render() {
        return (
            <Container>
                {this.props.products.map(prod => {
                    const priceToDisplay = this.props.getProductPriceToDisplay(prod)
                    if (prod.inStock) {
                        return <ProductContainer
                            onClick={() => this.getProductInfo(prod.id)}
                            key={prod.id}>
                                <Img src={prod.gallery[0]} />
                                <CartIcon onClick={ () => this.setItemSpecsAndParams(prod) } src={GreenCartIcon} />
                                    <Name>
                                        {prod.name}
                                    </Name>
                                    <Price> 
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
        )

    }
}
