import React, { Component } from "react";
import { CurrenciesContainer, Currency } from "../Style/CurrenciesStyle";

export default class Currencies extends Component {
  render () {
    return (
          <CurrenciesContainer>
              {this.props.allCurrencies.map(
                (cur, index) => <Currency
                      onClick={() => this.props.setChosenCurrency(cur.symbol)}
                      key={index}>
                      {cur.symbol} {cur.label}
                  </Currency>
              )}
          </CurrenciesContainer>
    );
  }
}
