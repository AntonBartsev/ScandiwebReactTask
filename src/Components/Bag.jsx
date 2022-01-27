import React, { Component } from "react";
import LeftArrow from "../Images/LeftArrow.svg";
import RightArrow from "../Images/RightArrow.svg";
import { CartHeading, BagContainer, ContentPlacement, Img, ArrowsImg, ImgAndArrows, Brand, Name, Price, CounterContainer, CounterBtn, InfoContainer, ArrowsContainer } from "../Style/BagStyle";

export default class Bag extends Component {

    state = {
        indexOfDisplayedImg: 0,
        indexOfItem: null
    }

    arrowsOnclick = (direction, item) => {
        let index = this.state.indexOfDisplayedImg
        const cartContent = this.props.cartContent
        if (direction === "left") {
            index = index > 0 ? index - 1 : item.img.length - 1

        }
        if (direction === "right") {
            index = index < item.img.length - 1 ? index + 1 : 0
        }
        item.lastChosenImgIndex = index
        this.setState({
            indexOfDisplayedImg: index,
            indexOfItem: cartContent.indexOf(item)
        })
    }
    
    render() {
        const cartContent = this.props.cartContent
        return (
            <BagContainer>
                <CartHeading>CART</CartHeading>
                {cartContent.map((item, index) =>
                    <ContentPlacement key={index}>
                        <InfoContainer>
                            <Brand>{item.brand}</Brand>
                            <Name>{item.name}</Name>
                            <Price>{item.price[0]}</Price>
                            {item.specs.map(spec => <p key={spec}>{spec.specDescription + spec.specName}</p>)}
                        </InfoContainer>
                        <CounterContainer>
                            <CounterBtn onClick={() => this.props.increaseItemCounter(item.price[1], index)}>+</CounterBtn>
                            <p>{item.itemCounter}</p>
                            <CounterBtn onClick={() => this.props.decreaseItemCounter(item.price[1], index)}>-</CounterBtn>
                        </CounterContainer>

                        {item.img.length > 1
                            ?
                            <ImgAndArrows>
                                
                                <Img
                                    src={item.img
                                    [this.state.indexOfItem === index
                                            ? this.state.indexOfDisplayedImg : item.lastChosenImgIndex]} />
                                <ArrowsContainer>
                                    <ArrowsImg onClick={() => this.arrowsOnclick("left", item)} src={LeftArrow} />
                                    <ArrowsImg onClick={() => this.arrowsOnclick("right", item)} src={RightArrow} />                               
                                </ArrowsContainer>

                            </ImgAndArrows>
                            :
                            <Img src={item.img[0]} />
                        }
                    </ContentPlacement>
                )}
            </BagContainer>
        )
    }
}