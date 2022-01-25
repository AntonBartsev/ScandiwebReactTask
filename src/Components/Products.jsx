import React, { Component } from "react";
import { Container, ProductContainer, ProductContainerOutOfStock, Name, Price, Img, TextOutOfStock } from "../Style/ProductsStyle";
import GreenCartIcon from "../Images/GreenCartIcon.svg";
import { productInfoRequest } from "../GraphQL/Queries";
import { client } from "../App";
import { gql } from "@apollo/client";
// const mediaQuery = window.matchMedia('(max-width: 991px)')


// @media screen and (max-width: 991px)
//justify-content: space-between;
//flex-wrap: wrap;
//align-content: space-between

export default class Products extends Component {

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
        return (
            <Container>
                {this.props.products.map(prod => {
                    const prodPrice = this.props.setProductPrice(prod, this.props.currency)
                    if (prod.inStock) {
                        return <ProductContainer
                                    onClick={() => this.getProductInfo(prod.id)} key={prod.id}>
                                    <Img src={prod.gallery[0]} />
                                    <Name>
                                        {prod.name}
                                    </Name>
                                    <Price> 
                                        {prodPrice[0]}
                                    </Price>
                                    <img onClick={ () => this.props.setProductParams(prod.brand, prod.name, prodPrice[0], prod.gallery, prod.id, prodPrice[1])}src={GreenCartIcon} />
                                </ProductContainer>
                    } else {
                        
                        return <ProductContainerOutOfStock key={prod.id} onClick={() => this.getProductInfo(prod.id)}>
                            <Img src={prod.gallery[0]} />
                            <TextOutOfStock>OUT OF STOCK</TextOutOfStock>
                            <Name>
                                {prod.name}
                            </Name>
                            <Price>
                                {prodPrice[0]}
                            </Price>
                        </ProductContainerOutOfStock>
                    }
                })}
            </Container>
        )

    }

}
