import React, { Component } from 'react'
import styled from 'styled-components'


const CurrenciesContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 114px;
height: auto;
border: 1px solid #333;
background-color: white;
`

const Currency = styled.p`
padding: 10px 5px;
font-family: Raleway;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 29px;
letter-spacing: 0em;
text-align: right;
cursor: pointer;
`

export default class Currencies extends Component {
    render() {
    return (
        <CurrenciesContainer>
            {this.props.allCurrencies.map(
                cur => 
                    <Currency
                        onClick={() => this.props.setCurrency(cur.symbol)}
                        key={this.props.allCurrencies.indexOf(cur)}>
                        {cur.symbol} {cur.label}
                    </Currency>
            )}
            </CurrenciesContainer>
    )
    }
}
