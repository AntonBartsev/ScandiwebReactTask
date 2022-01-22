import React, { Component } from 'react'
import {Container, AddToCart,Imgs, MainImg, Specs, Spec, Brand, Name, SubName, Price, OrderContainer } from '../Style/ProductScreen'

export default class ProductScreen extends Component {
    state = {
        chosenSpecs: new Set(),
        chosenImage: 0
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

    setSpecs = (spec, specDescr) => {
        this.state.chosenSpecs.add(`${specDescr}:` + ` ${spec}`)
        this.setState({
            chosenSpecs: this.state.chosenSpecs
        })
    }

    setProductParams = (brand, name, price, img) => {
        const itemsInCart = this.props.cartContent
        const cartItem = {
            itemCounter: 1,
            specs: this.state.chosenSpecs,
            brand: brand,
            name: name,
            price: price,
            img: img
        }
        
        let index = null
        if (itemsInCart.length > 0) {
            for (let i = 0; i < itemsInCart.length; i++) {
                if (itemsInCart[i].name === name && itemsInCart[i].specs === this.state.chosenSpecs) {
                    index = i
                    break
                }
            }
           index === null ? this.props.setCartContent(cartItem, null) : this.props.setCartContent(cartItem, index)
            
        } else {
            this.props.setCartContent(cartItem, null)
        }
    }

    displayChosenImage = (img) => {
        const gallery = this.props.productInfo.gallery
        this.setState({
            chosenImage: gallery.indexOf(img)
        })
    }


    render() {
        const { gallery, brand, name, attributes, inStock } = this.props.productInfo
        const description = this.getDescription()
    //    attributes.map(attr => attr.items.map(item => console.log(item.displayValue))) 
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
                    {attributes.length > 0 ? attributes.map(attr => 
                    <div key={attr.name}>
                            <SubName>{`${attr.name}:`}</SubName>
                            
                            <Specs>
                                {attr.items.map(item =>  <Spec onClick={()=>this.setSpecs(item.value, attr.name)} key={item.id}>{item.displayValue}</Spec> )}
                            </Specs >
                        </div>)
                        : ''} 
    
                    <SubName>PRICE:</SubName>
                    <Price>{this.props.price}</Price>
                    {inStock ? 
                    <AddToCart
                        onClick={ () => this.setProductParams(brand, name, this.props.price, gallery)}> 
                        ADD TO CART
                    </AddToCart>
                        :
                    <AddToCart>ITEM IS OUT OF STOCK</AddToCart>
                    }
                    
                    <div>{description.map(el => `${el.textContent}`)}</div>
                </OrderContainer>
            </Container>
        )
    }
}
