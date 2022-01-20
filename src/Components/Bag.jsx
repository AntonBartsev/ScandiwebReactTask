import React, { Component } from 'react'
import styled from 'styled-components'
import LeftArrow from '../Images/LeftArrow.svg'
import RightArrow from '../Images/RightArrow.svg'

const CartHeading = styled.h1`
font-family: Raleway;
font-size: 32px;
font-style: normal;
font-weight: 700;
line-height: 40px;
letter-spacing: 0em;
text-align: left;
`

const BagContainer = styled.div`
display: flex;
flex-direction: column;
padding: 100px 100px 100px 100px;
justify-content: space-between
`
const ContentPlacement = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center
`
const Img = styled.img`
max-height: 185px;
`
const ArrowsImg = styled.img`
position: absolute;
cursor: pointer;
`
const ImgAndArrows = styled.div`
max-width : 100px
`



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
                        </div>

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