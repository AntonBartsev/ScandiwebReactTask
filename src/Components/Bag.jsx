import React, { Component } from "react";
import LeftArrow from "../Images/LeftArrow.svg";
import RightArrow from "../Images/RightArrow.svg";
import {CartHeading, BagContainer, ContentPlacement, Img, ArrowsImg, ImgAndArrows } from "../Style/BagStyle"

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
        this.setState({
            indexOfDisplayedImg: index,
            indexOfItem: cartContent.indexOf(item),
        })
    }
    
    render() {
        const cartContent = this.props.cartContent
        const newNumPrice = this.props.setProductPrice(this.props.productInfo, this.props.currency)[1]
        return (
            <BagContainer>
                <CartHeading>CART</CartHeading>
                {cartContent.map((item, index) =>
                    <ContentPlacement key={index}>
                        <div>
                            <p>{item.brand}</p>
                            <p>{item.name}</p>
                            <p>{this.props.setProductPrice(this.props.productInfo, this.props.currency)[0]}</p>
                            {item.specs.map(spec => <p key={spec}>{spec.specDescription + spec.specName}</p>)}
                        </div>
                        <button onClick={() => this.props.increaseItemCounter(newNumPrice, index)}>+</button>
                        <p>{item.itemCounter}</p>
                        <button onClick={() => this.props.decreaseItemCounter(newNumPrice, index)}>-</button>
                        {item.img.length > 1
                            ?
                            <ImgAndArrows>
                                <ArrowsImg onClick={() => this.arrowsOnclick("left", item)} src={LeftArrow} />
                                <Img
                                    src={item.img
                                    [this.state.indexOfItem === index
                                            ? this.state.indexOfDisplayedImg : 0]} />
                                <ArrowsImg onClick={() => this.arrowsOnclick("right", item)} src={RightArrow} />
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