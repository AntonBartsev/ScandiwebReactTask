import React, { Component } from 'react'
import LeftArrow from '../Images/LeftArrow.svg'
import RightArrow from '../Images/RightArrow.svg'
import {CartHeading, BagContainer, ContentPlacement, Img, ArrowsImg, ImgAndArrows } from '../Style/BagStyle'




export default class Bag extends Component {

    state = {
        indexOfDisplayedImg: 0,
        indexOfItem: null
    }


    arrowsOnclick = (direction, item) => {
        let index = this.state.indexOfDisplayedImg
        const content = this.props.content
        if (direction === "left") {
            index = index > 0 ? index - 1 : item.img.length - 1

        }
        if (direction === "right") {
            index = index < item.img.length - 1 ? index + 1 : 0
        }
        this.setState({
            indexOfDisplayedImg: index,
            indexOfItem: content.indexOf(item),
        })
    }
    



    render() {
        const content = this.props.content
        return (
            <BagContainer>
                <CartHeading>CART</CartHeading>
                {content.map(item =>
                    <ContentPlacement key={content.indexOf(item)}>
                        <div>
                            <p>{item.brand}</p>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.size}</p>
                            {Array.from(item.specs).map(spec => <p key={spec}>{spec}</p>)}
                        </div>
                        <p>{item.itemCounter}</p>
                        {item.img.length > 1 ?
                            <ImgAndArrows>
                                <ArrowsImg onClick={() => this.arrowsOnclick("left", item)} src={LeftArrow} />
                                <Img
                                    src={item.img
                                    [this.state.indexOfItem === content.indexOf(item)
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