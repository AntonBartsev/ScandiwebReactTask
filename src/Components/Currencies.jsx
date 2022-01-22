import React, { Component } from 'react'
import {CurrenciesContainer, Currency} from '../Style/CurrenciesStyle'




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
