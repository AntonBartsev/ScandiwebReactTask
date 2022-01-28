import React, { Component } from "react";
import { Container, AddToCart, Imgs, MainImg, Specs, Spec, ChosenSpec, ColoredSpec, Brand, Name, SubName, Price, OrderContainer, SubImg, ProductDescription, ChosenColoredSpec, AddToCartNotAvailable } from "../Style/ProductScreen";

// Personal screen for each product
export default class ProductScreen extends Component {
    state = {
        chosenImage: 0
    }

    // get item's description
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
    
    // set image that was chosen by user 
    setChosenImage = (img) => {
        const gallery = this.props.productInfo.gallery
        this.setState({
            chosenImage: gallery.indexOf(img)
        })
    }
    
    // display specifications of the product
    displaySpecs = (item, attribute, attrIndex) => {
        const specs = this.props.chosenSpecs
        // check what specification was chosen
        const itemInSpecs = specs.findIndex(spec => spec.specName === ` ${item.value}` && spec.specDescription === `${attribute.name}:`
            || spec.specName === ` ${item.displayValue}` && spec.specDescription === `${attribute.name}:`)
        // if certain specification was chosen, display specification with appropriate style 
        if (itemInSpecs !== -1) {
            if (item.value[0] === "#") {
                return <ChosenColoredSpec color={item.value} onClick={() => this.props.setSpecs(`${attribute.name}:`, ` ${item.value}`, attrIndex)} key={item.value}/>
            } else {
                return <ChosenSpec onClick={() => this.props.setSpecs(`${attribute.name}:`, ` ${item.value}`, attrIndex)} key={item.value}>{item.value}</ChosenSpec>
            }
        // otherwise use style for inactive specifications
        } else {
            if (item.value[0] === "#") {
                return <ColoredSpec
                    color={item.value}
                    onClick={() => this.props.setSpecs(`${attribute.name}:`, ` ${item.displayValue}`, attrIndex)} key={item.value} />           
            } else {
                return  <Spec onClick={() => this.props.setSpecs(`${attribute.name}:`, ` ${item.value}`, attrIndex)} key={item.value}>
                            {item.value}
                        </Spec>
                }
            }
    }
    // display "Add to Cart" button
    displayAddToCartButton = (brand, name, priceToDisplay, gallery, id, priceAmount) => {
        const product = this.props.productInfo
        // if not all specifications were chosen, display unavailable button
        if (product.attributes.length > this.props.chosenSpecs.length) {
            return <AddToCartNotAvailable>ADD TO CART</AddToCartNotAvailable>
        // otherwise display available button
        } else {
            return  <AddToCart
                        onClick={ () => this.props.setProductParams(brand, name, priceToDisplay, gallery, id, priceAmount)}> 
                        ADD TO CART
                    </AddToCart>
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
                    {attributes.length > 0
                        ?
                        attributes.map((attr, attrIndex) => 
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
                    {inStock ? this.displayAddToCartButton(brand, name, priceToDisplay, gallery, id, priceAmount)
                             : <AddToCartNotAvailable>ITEM IS OUT OF STOCK</AddToCartNotAvailable>
                    }
                    <ProductDescription>{description.map(el => ` ${el.textContent}`)}</ProductDescription>
                </OrderContainer>
            </Container>
        )}
}
