import React, { useState, Dispatch } from "react";
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
    uri: "https://secret-bastion-33730.herokuapp.com/graphql",
  }),
});

type SetStyle = string;

function App() {
  const [searchStyle, setSearchStyle] = useState<SetStyle>('');
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <StyleList setSearchStyle={setSearchStyle} />
        <AlbumsTable searchStyle={searchStyle} />
      </div>
    </ApolloProvider>
  );
}

export default App;
