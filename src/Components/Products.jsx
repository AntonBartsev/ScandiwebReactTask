import React, { Component } from 'react'
import {Container, ProductContainer, ProductContainerOutOfStock, Name, Price, Img, TextOutOfStock } from '../Style/ProductsStyle'
import GreenCartIcon from '../Images/GreenCartIcon.svg'
import { productInfoRequest } from '../GraphQL/Queries'
import { client } from '../App'
import { gql } from '@apollo/client'
// const mediaQuery = window.matchMedia('(max-width: 991px)')


// @media screen and (max-width: 991px)
//justify-content: space-between;
//flex-wrap: wrap;
//align-content: space-between

export default class Products extends Component {
    state = {
        productInfo: []
    }

    setProductPrice = (product) => {
        let amount
        for (let price of product.prices) {
            if (price.currency.symbol === this.props.currency) {
                amount = price.amount
            }
        }
        const price = this.props.currency + amount;
        return price
    }


    getProductInfo = (id) => {
        if (id !== "") {
            client.query({ query: gql`${productInfoRequest(id)}` })
                .then(result => {
                    this.setState({
                        productInfo: result.data.product
                    })
                    const priceOfProduct = this.setProductPrice(result.data.product)
                    this.props.setComponentToRender("productScreen", id, result.data.product, priceOfProduct)
                })
        } else
            return
    }


    render() {
        return (

            <Container>
                {this.props.products.map(prod =>
                    prod.inStock ?
                        <ProductContainer
                            onClick={() => this.getProductInfo(prod.id)} key={prod.id}>
                            <Img src={prod.gallery[0]} />
                            <Name>
                                {prod.name}
                            </Name>
                            <Price>
                                {this.setProductPrice(prod)}
                            </Price>
                            <img src={GreenCartIcon} />

                        </ProductContainer>
                        :
                        <ProductContainerOutOfStock key={prod.id} onClick={() => this.getProductInfo(prod.id)}>
                            <Img src={prod.gallery[0]} />
                             <TextOutOfStock>OUT OF STOCK</TextOutOfStock>
                            <Name>
                                {prod.name}
                            </Name>
                            <Price>
                                {this.setProductPrice(prod)}
                            </Price>
                            <img src={GreenCartIcon} />
                        </ProductContainerOutOfStock>
                )}
            </Container>
        )

    }

}
