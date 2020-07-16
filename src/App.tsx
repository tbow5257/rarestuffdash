import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
  ApolloProvider
} from "@apollo/client";

import AlbumsTable from './AlbumsTable';
import StyleList from './StyleList';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://127.0.0.1:8000/graphql",
    credentials: "same-origin",
  }),
});


function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <StyleList />
        <AlbumsTable />
      </div>
    </ApolloProvider>
  );
}

export default App;
