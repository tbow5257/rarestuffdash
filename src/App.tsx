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

import Wut from './Wut';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://127.0.0.1:8000/graphql",
    credentials: "same-origin",
  }),
});

const ALL_ALBUMS = gql`
  query {
    allAlbums {
      edges {
        node {
          name
          releaseId
          price
          style
          have
          want
        }
      }
    }
  }
`;

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Wut />
      </div>
    </ApolloProvider>
  );
}

export default App;
