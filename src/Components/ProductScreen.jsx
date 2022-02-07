import React, { PureComponent } from "react";
import { Container, AddToCart, Imgs, MainImg, Specs, Spec, ChosenSpec, ColoredSpec, Brand, Name, SubName, Price, OrderContainer, SubImg, ProductDescription, ChosenColoredSpec, AddToCartNotAvailable } from "../Style/ProductScreen";

// Personal screen for each product
export default class ProductScreen extends PureComponent {
    state = {
        chosenImage: 0
    }

    // get item's description
    getDescription = () => {
        let result = []
        const description = this.props.productInfo.description
        const parser = new DOMParser()
        const descriptionAsHTML = parser.parseFromString(description, 'text/html').getElementsByTagName("body")
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
    displaySpecs = ({value, displayValue = {}}, attribute, attrIndex) => {
        const {chosenSpecs, setSpecs} = this.props
        // check what specification was chosen
        const itemInSpecs = chosenSpecs.findIndex(({specName, specDescription}) => (specName === ` ${value}` && specDescription === `${attribute.name}:`)
            || (specName === ` ${displayValue}` && specDescription === `${attribute.name}:`))
        // if certain specification was chosen, display specification with appropriate style 
        if (itemInSpecs !== -1) {
            if (value[0] === "#") {
                return <ChosenColoredSpec color={value} onClick={() => setSpecs(`${attribute.name}:`, ` ${value}`, attrIndex)} key={value}/>
            } else {
                return <ChosenSpec onClick={() => setSpecs(`${attribute.name}:`, ` ${value}`, attrIndex)} key={value}>{value}</ChosenSpec>
            }
        // otherwise use style for inactive specifications
        } else {
            if (value[0] === "#") {
                return <ColoredSpec
                    color={value}
                    onClick={() => setSpecs(`${attribute.name}:`, ` ${displayValue}`, attrIndex)} key={value} />           
            } else {
                return  <Spec onClick={() => setSpecs(`${attribute.name}:`, ` ${value}`, attrIndex)} key={value}>
                            {value}
                        </Spec>
                }
            }
    }
    // display "Add to Cart" button
    displayAddToCartButton = (brand, name, priceToDisplay, gallery, id, priceAmount) => {
        const {productInfo, chosenSpecs, setProductParams} = this.props
        // if not all specifications were chosen, display unavailable button
        if (productInfo.attributes.length > chosenSpecs.length) {
            return <AddToCartNotAvailable>ADD TO CART</AddToCartNotAvailable>
        // otherwise display available button
        } else {
            return  <AddToCart
                onClick={() => setProductParams(brand, name, priceToDisplay, gallery, id, priceAmount, chosenSpecs)}> 
                        ADD TO CART
                    </AddToCart>
        }
    }
    
    
    render() {
        const {productInfo, getProductPriceToDisplay, getProductPriceAmount} = this.props
        const priceToDisplay = getProductPriceToDisplay(productInfo)
        const priceAmount = getProductPriceAmount(productInfo)
        const { gallery, brand, name, attributes, inStock, id } = productInfo
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
