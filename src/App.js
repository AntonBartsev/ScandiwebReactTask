import React, { PureComponent } from "react";
import { Container } from "./Style/AppStyle";
import Shop from "./Components/Shop";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      return alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: "http://localhost:4000/"
  })
]);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

class App extends PureComponent {
  render () {
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
