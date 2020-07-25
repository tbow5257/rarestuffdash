import React from "react";
import "./App.css";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

import StyleList from './StyleList';

console.log(process.env)
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_REMOTE_API,
  }),
});

type SetStyle = string;

function App() {
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <StyleList />
      </div>
    </ApolloProvider>
  );
}

export default App;
