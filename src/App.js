import React, { Component } from 'react'
import Shop from './Pages/Shop';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from '@apollo/client/link/error'
import styled from 'styled-components';


const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`Graphql error ${message}`)
    })
  }
})


const link = from([
  errorLink,
  new HttpLink({
    uri: "http://localhost:4000/"
  })
])


export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export const Container = styled.div`
    width: 1440px;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
`
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Shop />
        </Container>
      </ApolloProvider>

    );
  }
}

export default App;
