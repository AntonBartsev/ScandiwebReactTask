import React, { Component } from "react";
import { Container, AddToCart, Imgs, MainImg, Specs, Spec, Brand, Name, SubName, Price, OrderContainer } from "../Style/ProductScreen";
import styled from "styled-components";



const ColoredSpec = styled(Spec)`
background: ${props => props.color};
` 


export default class ProductScreen extends Component {
    state = {
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



    displayChosenImage = (img) => {
        const gallery = this.props.productInfo.gallery
        this.setState({
            chosenImage: gallery.indexOf(img)
        })
    }
    
    render() {
        const priceOfProduct = this.props.setProductPrice(this.props.productInfo, this.props.currency)
        const { gallery, brand, name, attributes, inStock, id } = this.props.productInfo
        const description = this.getDescription()
        return (
            <Container>
                <Imgs>
                    {gallery.map((img, index) =>
                        <img onClick={() => this.displayChosenImage(img)}
                            key={index} src={img} />)}
                </Imgs>
                <MainImg src={gallery[this.state.chosenImage]} />
                <OrderContainer>
                    <Brand>{brand}</Brand>
                    <Name>{name}</Name>
                    {attributes.length > 0 ? attributes.map(attr => 
                    <div key={attr.name}>
                            <SubName>{`${attr.name}:`}</SubName>
                            
                            <Specs>
                                {attr.items.map(item => item.value[0] === "#"
                                    ?
                                    <ColoredSpec color={item.value} onClick={() => this.props.setSpecs(`${attr.name}:`, ` ${item.displayValue}`)} key={item.id} /> 
                                    :
                                    <Spec onClick={() => this.props.setSpecs(`${attr.name}:`, ` ${item.value}`)} key={item.id}>
                                        {item.value}
                                    </Spec>)}
                            </Specs>
                        </div>)
                        : ''} 
    
                    <SubName>PRICE:</SubName>
                    <Price>{priceOfProduct[0]}</Price>
                    {inStock ? 
                    <AddToCart
                        onClick={ () => this.props.setProductParams(brand, name, priceOfProduct[0], gallery, id, priceOfProduct[1])}> 
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
