import React, { PureComponent } from "react";
import { CurrenciesContainer, Currency } from "../Style/CurrenciesStyle";

// Currencies available in the shop as window (chosen currency affects prices throughout the shop)
export default class Currencies extends PureComponent {
  render () {
    const {allCurrencies, setChosenCurrency} = this.props
    return (
          <CurrenciesContainer>
              {allCurrencies.map(
                (cur, index) => <Currency
                      onClick={() => setChosenCurrency(cur.symbol)}
                      key={index}>
                      {cur.symbol} {cur.label}
                  </Currency>
              )}
          </CurrenciesContainer>
    )}
}


