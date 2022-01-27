import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query {
    categories {
        products {
             attributes{
    name
  items{
      displayValue,
      value,
      id
    }
  }
            id,
            name,
            inStock,
            gallery,
            category,
            brand,
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
`;

export const GET_CURRENCIES = gql`
query {
currencies{
  label,
  symbol
          }
       }
`;

export const productInfoRequest = (id) => {
  return gql`
query{
product(id: "${id}"){
  id,
  name,
  inStock,
  gallery,
  description,
  attributes{
    name,
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
`;
};

export const getProductPricesById = (id) => {
  return gql`
query{
product(id: "${id}"){
  prices{
    currency{
      symbol
    },
    amount 
}
}
}`;
};
