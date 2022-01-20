import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
query {
    categories {
        products {
            id,
            name,
            inStock,
            gallery,
            category,
            prices {
                currency {
                    label,
                    symbol
                         },
            amount
                    }
                   }
                 }
        }
`

export const GET_CURRENCIES = gql`
query {
currencies{
  label,
  symbol
          }
       }
`

export const productInfoRequest = (id) => {
    return gql`
query{
product(id: "${id}"){
  id,
  name,
  gallery,
  description,
  attributes{
  	items{
      displayValue,
      value,
      id
    }
  },
  prices{
    currency{
      label,
      symbol
    },
    amount
  },
  brand
}
}

`

}
