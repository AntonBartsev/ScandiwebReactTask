import React, { PureComponent } from "react";
import { CurrenciesContainer, Currency } from "../Style/CurrenciesStyle";
import PropTypes from "prop-types";

// Currencies available in the shop as window (chosen currency affects prices throughout the shop)
export default class Currencies extends PureComponent {

  static propTypes = {
    allCurrencies: PropTypes.array,
    setChosenCurrency: PropTypes.func
  }

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



 
