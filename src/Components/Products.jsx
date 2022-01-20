import React, { Component } from 'react'
import styled from 'styled-components'
import GreenCartIcon from '../Images/GreenCartIcon.svg'
import { productInfoRequest } from '../GraphQL/Queries'
import { client } from '../App'
import { gql } from '@apollo/client'
// const mediaQuery = window.matchMedia('(max-width: 991px)')

const Container = styled.div`
display: grid;
grid-auto-columns: 1fr;
grid-row-gap: 87.62px;
grid-column-gap: 41.25px;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: auto;
`



const ProductContainer = styled.div`
position: relative;
display: block;
width: 100%;
height: auto;
cursor: pointer;
`

const ProductContainerOutOfStock = styled.div`
position: relative;
display: block;
width: 100%;
height: auto;
cursor: pointer;
opacity: 0.3;
`
//flex-direction: column;
//justify-content: flex-end;


const Name = styled.div`
display: flex;
position: relative;
flex-direction: column;
justify-content: flex-end;
background-color: white;
font-weight: 300;
font-style: light;
font-size: 18px;
cursor: pointer;
`

const Price = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
font-weight: bold;
background-color: white;
font-weight: 500;
font-style: medium;
font-size: 18px;
cursor: pointer;
`

const Img = styled.img`
display: flex;
justify-content: space-between;
width: 100%;
height: 338px;
object-fit: cover;
cursor: pointer;
`
const TextOutOfStock = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Raleway;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0px;
  text-align: left;
`

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

    // setNumOfColumns = () => {
    //     if (mediaQuery.matches) {
    //     return '1fr 1fr'
    //     } else {return '1fr 1fr 1fr '}
    // }

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
                        <ProductContainerOutOfStock key={prod.id}>
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
