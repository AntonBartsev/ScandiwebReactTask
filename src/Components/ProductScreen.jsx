import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
max-width: 100%;
`


const AddToCart = styled.div`
background: rgba(94, 206, 123, 1);
text-align: center;
height: 52px;
width: 292px;
left: 929px;
top: 478px;
border-radius: 0px;
padding: 16px, 32px, 16px, 32px;
font-family: Raleway;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 19px;
letter-spacing: 0em;
cursor: pointer;
`

const Imgs = styled.div`
display: flex;
flex-direction: column;
padding: 20px 20px 20px 20px;
justify-content: space-between;
width: 20%;
height: 50px;
object-fit: cover;
cursor: pointer;
`
const MainImg = styled.img`

`

const Sizes = styled.div`
display: flex;
justify-content: space-between;
align-items: center
`
const Size = styled.button`
width: 63px;
height: 45px;
background-color: white;
border: 1px solid #333;
font-family: Source Sans Pro;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 18px;
letter-spacing: 0.05em;
text-align: center;
padding: 20px 20px 20px 20px;
cursor: pointer
`
const Brand = styled.p`
font-family: Raleway;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: 27px;
letter-spacing: 0em;
text-align: left;
padding: 20px 20px 20px 20px;
`
const Name = styled.p`
font-family: Raleway;
font-size: 30px;
font-style: normal;
font-weight: 400;
line-height: 27px;
letter-spacing: 0em;
text-align: left;
padding: 20px 20px 20px 20px;
`

const SubName = styled.p`
font-family: Roboto Condensed;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 18px;
letter-spacing: 0em;
text-align: center;
padding: 20px 20px 20px 20px;
`

const Price = styled.div`
font-family: Raleway;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
padding: 20px 20px 20px 20px;
`

const OrderContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`


export default class ProductScreen extends Component {
    state = {
        chosenSize: '',
        chosenImage: 0
    }


    displaySizes = () => {
        const attributes = this.props.productInfo.attributes
        if (attributes.length > 0) {
            return <Sizes>
                {attributes[0].items.map(item =>
                    <Size
                        onClick={() => this.setSize(item.value)}
                        key={item.value}>
                        {item.value}
                    </Size>)}
            </Sizes >
        }
        else return ''
    }

    getDescription = () => {
        let result = []
        const description = this.props.productInfo.description
        const parser = new DOMParser();
        const descriptionAsHTML = parser.parseFromString(description, 'text/html').getElementsByTagName("body");
        for (let child of descriptionAsHTML[0].children) {
            result.push(child)
        }
        return result
    }

    setSize = (size) => {
        this.setState({
            chosenSize: size
        })
    }

    setProductParams = (brand, name, price, img) => {
        const cartContent = {
            size: this.state.chosenSize,
            brand: brand,
            name: name,
            price: price,
            img: img
        }
        this.props.setCartContent(cartContent)
    }

    displayChosenImage = (img) => {
        const gallery = this.props.productInfo.gallery
        this.setState({
            chosenImage: gallery.indexOf(img)
        })
    }


    render() {
        const { gallery, brand, name, attributes } = this.props.productInfo
        const description = this.getDescription()
        return (
            <Container>
                <Imgs>
                    {gallery.map(img =>
                        <img onClick={() => this.displayChosenImage(img)}
                            key={gallery.indexOf(img)} src={img} />)}
                </Imgs>
                <MainImg src={gallery[this.state.chosenImage]} />
                <OrderContainer>
                    <Brand>{brand}</Brand>
                    <Name>{name}</Name>
                    {attributes.length > 0 ? <SubName>SIZE:</SubName> : ''}
                    {this.displaySizes()}
                    <SubName>PRICE:</SubName>
                    <Price>{this.props.price}</Price>
                    <AddToCart
                        onClick={() => this.setProductParams(brand, name, this.props.price, gallery)}>
                        ADD TO CART
                    </AddToCart>
                    <div>{description.map(el => `${el.textContent}`)}</div>
                </OrderContainer>
            </Container>
        )
    }
}
