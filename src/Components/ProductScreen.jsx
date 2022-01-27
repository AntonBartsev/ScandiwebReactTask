import React, { Component } from "react";
import { Container, AddToCart, Imgs, MainImg, Specs, Spec, ChosenSpec, ColoredSpec, Brand, Name, SubName, Price, OrderContainer, SubImg, ProductDescription } from "../Style/ProductScreen";

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

    setChosenImage = (img) => {
        const gallery = this.props.productInfo.gallery
        this.setState({
            chosenImage: gallery.indexOf(img)
        })
    }
    
    displaySpecs = (item, attribute, attributeIndex) => {
        const itemInSpecs = this.props.chosenSpecs.findIndex(
            spec => spec.specName === ` ${item.value}` && spec.specDescription === `${attribute.name}:`
        )
        if (itemInSpecs !== -1) {
                return <ChosenSpec onClick={() => this.props.setSpecs(`${attribute.name}:`, ` ${item.value}`, attributeIndex)} key={item.value}>{item.value}</ChosenSpec>
        } else {
            if (item.value[0] === "#") {
                return <ColoredSpec
                    color={item.value}
                    onClick={() => this.props.setSpecs(`${attribute.name}:`, ` ${item.displayValue}`, attributeIndex)} key={item.value} />           
            } else {
                return <Spec onClick={() => this.props.setSpecs(`${attribute.name}:`, ` ${item.value}`, attributeIndex)} key={item.value}>
                            {item.value}
                        </Spec>
                }
            }
    }
    
    render() {
        const product = this.props.productInfo
        const priceToDisplay = this.props.getProductPriceToDisplay(product)
        const priceAmount = this.props.getProductPriceAmount(product)
        const { gallery, brand, name, attributes, inStock, id } = product
        const description = this.getDescription()
        return (
            <Container>
                <Imgs>
                    {gallery.map((img, index) =>
                        <SubImg onClick={() => this.setChosenImage(img)}
                            key={index} src={img} />)}
                </Imgs>
                <MainImg src={gallery[this.state.chosenImage]} />
                <OrderContainer>
                    <Brand>{brand}</Brand>
                    <Name>{name}</Name>
                    {attributes.length > 0 ? attributes.map((attr, attrIndex) => 
                    <div key={attr.name}>
                            <SubName>{`${attr.name}:`}</SubName>
                            <Specs>
                                {attr.items.map(item => 
                                    this.displaySpecs(item, attr, attrIndex)
                                )}
                            </Specs>
                        </div>)
                        : ''} 
                    <SubName>PRICE:</SubName>
                    <Price>{priceToDisplay}</Price>
                    {inStock ? 
                    <AddToCart
                        onClick={ () => this.props.setProductParams(brand, name, priceToDisplay, gallery, id, priceAmount)}> 
                        ADD TO CART
                    </AddToCart>
                        :
                    <AddToCart>ITEM IS OUT OF STOCK</AddToCart>
                    }
                    <ProductDescription>{description.map(el => `${el.textContent}`)}</ProductDescription>
                </OrderContainer>
            </Container>
        )
    }
}
