import React, { PureComponent } from "react";
import ImgArrow from "../Images/ImgArrow.svg";
import PropTypes from "prop-types";
import { CartHeading, BagContainer, ContentPlacement, Img, ArrowsImgLeft, ArrowsImgRight, ImgContainer, Brand, Name, Price, CounterContainer, CounterBtn, InfoContainer, ArrowsContainer } from "../Style/BagStyle";

// Bag of the shop
export default class Bag extends PureComponent {
    state = {
      // index of image of certain product in the bag to be displayed
      indexOfDisplayedImg: 0,
      // index of the product which image is to be changed
      indexOfItem: null
   }
    
   static propTypes = {
    cartContent: PropTypes.array,
    increaseItemCounter: PropTypes.func,
    decreaseItemCounter: PropTypes.func
   }
    
    // function handles image change
    arrowsOnclick = (direction, item) => {
        let index = this.state.indexOfDisplayedImg
        const cartContent = this.props.cartContent
        if (direction === "left") {
            // set index: if index is 0, start from the end of the image array
            index = index > 0 ? index - 1 : item.img.length - 1
        }
        if (direction === "right") {
            // set index: if index is the last in an array, show image from the start of an array
            index = index < item.img.length - 1 ? index + 1 : 0
        }
        // set last chosen image index of the certain item
        item.lastChosenImgIndex = index
        this.setState({
            indexOfDisplayedImg: index,
            indexOfItem: cartContent.indexOf(item)
        })
    }
    
    render() {
        const {cartContent, increaseItemCounter, decreaseItemCounter} = this.props
        const {indexOfItem, indexOfDisplayedImg} = this.state
        return (
            <BagContainer>
                <CartHeading>CART</CartHeading>
                {cartContent.map((item, index) =>
                    <ContentPlacement key={index}>
                        <InfoContainer>
                            <Brand>{item.brand}</Brand>
                            <Name>{item.name}</Name>
                            <Price>{item.price[0]}</Price>
                            {item.specs[0] !== "No Specs" ?
                                item.specs.map(({specDescription, specName}) => <p key={specDescription}>{specDescription + specName}</p>) : ''}
                        </InfoContainer>
                        <CounterContainer>
                            <CounterBtn onClick={() => increaseItemCounter(item.price[1], index)}>+</CounterBtn>
                            <p>{item.itemCounter}</p>
                            <CounterBtn onClick={() => decreaseItemCounter(item.price[1], index)}>-</CounterBtn>
                        </CounterContainer>
                        {item.img.length > 1
                            ?
                            <ImgContainer>
                                <Img
                                    src={item.img
                                    [indexOfItem === index
                                            ? indexOfDisplayedImg : item.lastChosenImgIndex]} />
                                <ArrowsContainer>
                                    <ArrowsImgLeft onClick={() => this.arrowsOnclick("left", item)} src={ImgArrow} />
                                    <ArrowsImgRight onClick={() => this.arrowsOnclick("right", item)} src={ImgArrow} />                               
                                </ArrowsContainer>
                            </ImgContainer>
                            :
                            <ImgContainer><Img src={item.img[0]} /></ImgContainer>
                        }
                    </ContentPlacement>
                )}
            </BagContainer>
        )
    }
}