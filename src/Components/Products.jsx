import React, { PureComponent } from "react";
import { Container, ProductContainer, ProductContainerOutOfStock, Name, Price, Img, TextOutOfStock, CartIcon } from "../Style/ProductsStyle";
import GreenCartIcon from "../Images/GreenCartIcon.svg";
import { productInfoRequest } from "../GraphQL/Queries";
import { client } from "../App";
import { gql } from "@apollo/client";

// Main page with products
export default class Products extends PureComponent {
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
    
    
    render() {  
        const {products, getProductPriceToDisplay, addItemWithDefaultSpecs} = this.props
        return (
            <Container>
                {products.map(prod => {
                    const priceToDisplay = getProductPriceToDisplay(prod)
                    if (prod.inStock) {
                        return <ProductContainer
                            key={prod.id}>
                                <Img onClick={() => this.getProductInfo(prod.id)} src={prod.gallery[0]} />
                                <CartIcon onClick={() => addItemWithDefaultSpecs(prod)} src={GreenCartIcon} />
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
